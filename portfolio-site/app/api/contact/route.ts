import { NextResponse } from "next/server";
import { z } from "zod";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { dynamo } from "@/lib/dynamodb";
import { randomUUID } from "crypto";
import { SendEmailCommand } from "@aws-sdk/client-sesv2";
import { ses } from "@/lib/ses";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    console.log("ENV TABLE:", process.env.CONTACT_TABLE_NAME);
    const body = await request.json();
    const data = schema.parse(body);

    const item = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      subject: data.subject || "",
      message: data.message,
      createdAt: new Date().toISOString(),
    };

    await dynamo.send(
      new PutCommand({
        TableName: process.env.CONTACT_TABLE_NAME!,
        Item: item,
      })
    );

    await ses.send(
      new SendEmailCommand({
        FromEmailAddress: process.env.CONTACT_FROM_EMAIL!,
        Destination: {
          ToAddresses: [process.env.CONTACT_TO_EMAIL!],
        },
        Content: {
          Simple: {
            Subject: {
              Data: `Portfolio Contact: ${data.subject || "No Subject"}`,
            },
            Body: {
              Text: {
                Data: `
    Name: ${data.name}
    Email: ${data.email}

    Message:
    ${data.message}
                `,
              },
            },
          },
        },
      })
    );

    return NextResponse.json({
      success: true,
      message: "Message saved to DynamoDB",
    });
  } catch (error: any) {
    console.error("CONTACT API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to save message",
      },
      { status: 500 }
    );
  }
}