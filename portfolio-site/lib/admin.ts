import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { dynamo } from "@/lib/dynamodb";
import type { AdminStats, ContactSubmission } from "@/types/admin";

export async function getContactSubmissions(
  search?: string
): Promise<ContactSubmission[]> {
  const result = await dynamo.send(
    new ScanCommand({
      TableName: process.env.CONTACT_TABLE_NAME!,
    })
  );

  const submissions = (result.Items ?? []) as ContactSubmission[];
  const normalizedSearch = search?.trim().toLowerCase();

  const filtered = normalizedSearch
    ? submissions.filter((item) => {
        const haystack = [
          item.name,
          item.email,
          item.subject,
          item.message,
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalizedSearch);
      })
    : submissions;

  return filtered.sort((a, b) => {
    const left = new Date(a.createdAt).getTime();
    const right = new Date(b.createdAt).getTime();
    return right - left;
  });
}

export function getAdminStats(submissions: ContactSubmission[]): AdminStats {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const submissionsThisMonth = submissions.filter((item) => {
    const createdAt = new Date(item.createdAt);
    return (
      createdAt.getMonth() === currentMonth &&
      createdAt.getFullYear() === currentYear
    );
  }).length;

  const latestSubmissionDate = submissions.length
    ? submissions[0]?.createdAt ?? null
    : null;

  return {
    totalSubmissions: submissions.length,
    submissionsThisMonth,
    latestSubmissionDate,
  };
}
