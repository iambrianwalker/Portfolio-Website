import { randomUUID } from "crypto";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { dynamodbClient, getAwsConfig } from "@/lib/aws";
import { analyticsSchema } from "@/lib/validation";
import type { AnalyticsEventPayload, AnalyticsRecord } from "@/types/analytics";

export async function recordAnalyticsEvent(payload: AnalyticsEventPayload, source = "server") {
  const parsed = analyticsSchema.safeParse(payload);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Analytics payload is invalid.");
  }

  const { analyticsTableName } = getAwsConfig();
  const id = randomUUID();
  const createdAt = new Date().toISOString();

  const record: AnalyticsRecord = {
    id,
    eventType: parsed.data.eventType,
    resourceId: parsed.data.resourceId,
    metadata: parsed.data.metadata ? JSON.stringify(parsed.data.metadata) : undefined,
    createdAt,
    source,
  };

  await dynamodbClient.send(
    new PutItemCommand({
      TableName: analyticsTableName,
      Item: {
        id: { S: record.id },
        eventType: { S: record.eventType },
        resourceId: record.resourceId ? { S: record.resourceId } : { NULL: true },
        metadata: record.metadata ? { S: record.metadata } : { NULL: true },
        createdAt: { S: record.createdAt },
        source: { S: record.source },
      },
    }),
  );

  return record;
}
