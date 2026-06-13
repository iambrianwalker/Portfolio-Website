import { CloudWatchLogsClient, CreateLogStreamCommand, PutLogEventsCommand } from "@aws-sdk/client-cloudwatch-logs";
import { cloudWatchLogsClient } from "@/lib/aws";

const logGroupName = process.env.CLOUDWATCH_LOG_GROUP || "/aws/amplify/portfolio-site";

export async function logEvent(message: string, details?: Record<string, unknown>) {
  try {
    const client = cloudWatchLogsClient as CloudWatchLogsClient;
    const streamName = new Date().toISOString().slice(0, 10);
    const timestamp = Date.now();
    const payload = JSON.stringify({ message, details, timestamp });

    await client.send(new CreateLogStreamCommand({ logGroupName, logStreamName: streamName }));
    await client.send(new PutLogEventsCommand({ logGroupName, logStreamName: streamName, logEvents: [{ timestamp, message: payload }] }));
  } catch {
    // Fail closed for logging to avoid breaking the request path.
  }
}
