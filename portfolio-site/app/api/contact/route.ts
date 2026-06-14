import { NextResponse } from "next/server";
import { z } from "zod";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { dynamo } from "@/lib/dynamodb";
import { randomUUID } from "crypto";
import { SendEmailCommand } from "@aws-sdk/client-sesv2";
import { ses } from "@/lib/ses";
import { recordAnalyticsEvent } from "@/lib/analytics";
import { logAppEvent } from "@/lib/cloudwatch";
import { enforceRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(1),
  company: z.string().optional(),
});

export async function POST(request: Request) {
  const rateLimitResponse = enforceRateLimit(request, "contact", 5, 15 * 60 * 1000);

  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const body = await request.json();
    const data = schema.parse(body);

    if (data.company?.trim()) {
      return NextResponse.json({
        success: true,
        message: "Your message has been received.",
      });
    }

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

    try {
      await recordAnalyticsEvent("contact-form-submission", {
        email: data.email,
        subject: data.subject || "",
      });
    } catch (analyticsError) {
      console.warn("Analytics tracking failed:", analyticsError);
    }

    try {
      await logAppEvent("contact-submission", {
        submissionId: item.id,
        email: data.email,
      });
    } catch (loggingError) {
      console.warn("CloudWatch logging failed:", loggingError);
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been received.",
    });
  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    let message = error instanceof Error ? error.message : "Failed to save message";

    if (
      error instanceof Error &&
      (error.name === "ResourceNotFoundException" || message.includes("Requested resource not found"))
    ) {
      message = `DynamoDB table "${process.env.CONTACT_TABLE_NAME ?? "unset"}" was not found. Set CONTACT_TABLE_NAME to contact-submission in Amplify and redeploy.`;
    }

    try {
      await logAppEvent("contact-submission-error", {
        message: error instanceof Error ? error.message : "Unknown error",
      });
    } catch {
      // Ignore logging failures.
    }

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
}
