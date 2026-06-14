import {
  CloudWatchLogsClient,
  CreateLogStreamCommand,
  PutLogEventsCommand,
  ResourceAlreadyExistsException,
} from "@aws-sdk/client-cloudwatch-logs";

const client = process.env.APP_REGION
  ? new CloudWatchLogsClient({ region: process.env.APP_REGION })
  : null;

async function ensureLogStream(logGroupName: string, logStreamName: string) {
  if (!client) {
    return;
  }

  try {
    await client.send(
      new CreateLogStreamCommand({
        logGroupName,
        logStreamName,
      })
    );
  } catch (error) {
    if (!(error instanceof ResourceAlreadyExistsException)) {
      throw error;
    }
  }
}

export async function logAppEvent(
  message: string,
  details?: Record<string, unknown>
) {
  if (!client || !process.env.CLOUDWATCH_LOG_GROUP_NAME) {
    return;
  }

  try {
    const logStreamName = `portfolio-${new Date().toISOString().slice(0, 10)}`;
    const payload = {
      message,
      timestamp: new Date().toISOString(),
      ...details,
    };

    await ensureLogStream(process.env.CLOUDWATCH_LOG_GROUP_NAME, logStreamName);

    await client.send(
      new PutLogEventsCommand({
        logGroupName: process.env.CLOUDWATCH_LOG_GROUP_NAME,
        logStreamName,
        logEvents: [
          {
            timestamp: Date.now(),
            message: JSON.stringify(payload),
          },
        ],
      })
    );
  } catch (error) {
    console.warn("CloudWatch logging failed", error);
  }
}
