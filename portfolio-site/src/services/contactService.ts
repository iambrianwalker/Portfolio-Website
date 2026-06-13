import { randomUUID } from "crypto";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { SendEmailCommand } from "@aws-sdk/client-ses";
import { dynamodbClient, getAwsConfig, sesClient } from "@/lib/aws";

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContactMessage(payload: ContactPayload) {
  const { name, email, subject, message } = payload;
  const { tableName, fromEmail, toEmail } = getAwsConfig();

  if (!fromEmail || !toEmail) {
    return {
      success: true,
      message: "Contact request received. Configure the sender and recipient email addresses in Amplify to enable email delivery.",
    };
  }

  const id = randomUUID();
  const submittedAt = new Date().toISOString();

  await dynamodbClient.send(
    new PutItemCommand({
      TableName: tableName,
      Item: {
        id: { S: id },
        name: { S: name },
        email: { S: email },
        subject: { S: subject },
        message: { S: message },
        createdAt: { S: submittedAt },
      },
    }),
  );

  await sesClient.send(
    new SendEmailCommand({
      Source: fromEmail,
      Destination: { ToAddresses: [toEmail] },
      Message: {
        Subject: { Data: `New contact form submission: ${subject}` },
        Body: {
          Text: {
            Data: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
          },
        },
      },
    }),
  );

  return {
    success: true,
    message: "Your message was delivered successfully.",
  };
}
