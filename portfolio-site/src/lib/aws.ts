import { CloudWatchLogsClient } from "@aws-sdk/client-cloudwatch-logs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { SESClient } from "@aws-sdk/client-ses";

const region = process.env.AWS_REGION || "us-east-1";

export const dynamodbClient = new DynamoDBClient({ region });
export const sesClient = new SESClient({ region });
export const cloudWatchLogsClient = new CloudWatchLogsClient({ region });

export function getAwsConfig() {
  return {
    region,
    tableName: process.env.CONTACT_TABLE_NAME || "contact-submissions",
    analyticsTableName: process.env.ANALYTICS_TABLE_NAME || "portfolio-analytics",
    fromEmail: process.env.CONTACT_FROM_EMAIL,
    toEmail: process.env.CONTACT_TO_EMAIL,
  };
}
