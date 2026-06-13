import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { dynamodbClient, getAwsConfig } from "@/lib/aws";
import type { AdminDashboardData } from "@/types/admin";

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  const { tableName, analyticsTableName } = getAwsConfig();

  const [contactsResponse, analyticsResponse] = await Promise.all([
    dynamodbClient.send(
      new ScanCommand({
        TableName: tableName,
        ProjectionExpression: "#id, #name, #email, #subject, #createdAt",
        ExpressionAttributeNames: {
          "#id": "id",
          "#name": "name",
          "#email": "email",
          "#subject": "subject",
          "#createdAt": "createdAt",
        },
        Limit: 10,
      }),
    ),
    dynamodbClient.send(
      new ScanCommand({
        TableName: analyticsTableName,
        ProjectionExpression: "#id, #eventType, #resourceId, #createdAt",
        ExpressionAttributeNames: {
          "#id": "id",
          "#eventType": "eventType",
          "#resourceId": "resourceId",
          "#createdAt": "createdAt",
        },
        Limit: 10,
      }),
    ),
  ]);

  return {
    contactCount: contactsResponse.Items?.length ?? 0,
    analyticsCount: analyticsResponse.Items?.length ?? 0,
    recentContacts: (contactsResponse.Items ?? []).map((item) => ({
      id: item.id?.S ?? "",
      name: item.name?.S ?? "",
      email: item.email?.S ?? "",
      subject: item.subject?.S ?? "",
      createdAt: item.createdAt?.S ?? "",
    })),
    recentAnalytics: (analyticsResponse.Items ?? []).map((item) => ({
      id: item.id?.S ?? "",
      eventType: item.eventType?.S ?? "",
      resourceId: item.resourceId?.S,
      createdAt: item.createdAt?.S ?? "",
    })),
  };
}
