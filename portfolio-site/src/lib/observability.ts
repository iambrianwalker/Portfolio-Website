interface LogContext {
  requestId?: string;
  path?: string;
  status?: number;
  error?: string;
  [key: string]: unknown;
}

export function createStructuredLog(context: LogContext) {
  return JSON.stringify({
    timestamp: new Date().toISOString(),
    ...context,
  });
}
