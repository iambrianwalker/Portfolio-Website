import { randomUUID } from "crypto";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { dynamo } from "@/lib/dynamodb";
import { logAppEvent } from "@/lib/cloudwatch";
import type {
  AnalyticsChartData,
  AnalyticsDailyPoint,
  AnalyticsEvent,
  AnalyticsEventType,
  AnalyticsSummary,
  AnalyticsTypeBreakdown,
} from "@/types/admin";
import {
  ANALYTICS_EVENT_COLORS,
  ANALYTICS_EVENT_LABELS,
} from "@/types/admin";

const ANALYTICS_TABLE =
  process.env.ANALYTICS_TABLE_NAME || "portfolio-analytics";

const EVENT_TYPES: AnalyticsEventType[] = [
  "page-view",
  "resume-download",
  "project-click",
  "contact-form-submission",
];

function getAnalyticsTableName() {
  return ANALYTICS_TABLE;
}

function getEventDate(event: AnalyticsEvent) {
  return event.createdAt || event.timestamp;
}

async function fetchAnalyticsEvents(): Promise<AnalyticsEvent[]> {
  const result = await dynamo.send(
    new ScanCommand({
      TableName: getAnalyticsTableName(),
    })
  );

  return (result.Items ?? []) as AnalyticsEvent[];
}

function buildDailySeries(events: AnalyticsEvent[], days = 30): AnalyticsDailyPoint[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const buckets = new Map<string, AnalyticsDailyPoint>();

  for (let index = days - 1; index >= 0; index -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - index);
    const key = date.toISOString().slice(0, 10);

    buckets.set(key, {
      date: key,
      label: date.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      total: 0,
      pageView: 0,
      resumeDownload: 0,
      projectClick: 0,
      contactForm: 0,
    });
  }

  for (const event of events) {
    const key = getEventDate(event).slice(0, 10);
    const bucket = buckets.get(key);

    if (!bucket) {
      continue;
    }

    bucket.total += 1;

    switch (event.eventType) {
      case "page-view":
        bucket.pageView += 1;
        break;
      case "resume-download":
        bucket.resumeDownload += 1;
        break;
      case "project-click":
        bucket.projectClick += 1;
        break;
      case "contact-form-submission":
        bucket.contactForm += 1;
        break;
      default:
        break;
    }
  }

  return Array.from(buckets.values());
}

function buildTypeBreakdown(events: AnalyticsEvent[]): AnalyticsTypeBreakdown[] {
  const counts = events.reduce<Record<string, number>>((accumulator, event) => {
    accumulator[event.eventType] = (accumulator[event.eventType] || 0) + 1;
    return accumulator;
  }, {});

  return EVENT_TYPES.map((eventType) => ({
    eventType,
    label: ANALYTICS_EVENT_LABELS[eventType],
    count: counts[eventType] || 0,
    color: ANALYTICS_EVENT_COLORS[eventType],
  }));
}

export async function recordAnalyticsEvent(
  eventType: AnalyticsEventType,
  metadata?: Record<string, unknown>
) {
  const id = randomUUID();
  const createdAt = new Date().toISOString();
  const item: AnalyticsEvent = {
    timestamp: `${createdAt}#${id}`,
    id,
    eventType,
    createdAt,
    metadata,
  };

  await dynamo.send(
    new PutCommand({
      TableName: getAnalyticsTableName(),
      Item: item,
    })
  );

  await logAppEvent("analytics-event", {
    eventType,
    metadata,
  });

  return item;
}

function getLatestEventDate(events: AnalyticsEvent[]) {
  if (!events.length) {
    return null;
  }

  const latest = [...events].sort(
    (a, b) => new Date(getEventDate(b)).getTime() - new Date(getEventDate(a)).getTime()
  )[0];

  return latest ? getEventDate(latest) : null;
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const events = await fetchAnalyticsEvents();
  const byType = events.reduce<Record<string, number>>((accumulator, event) => {
    accumulator[event.eventType] = (accumulator[event.eventType] || 0) + 1;
    return accumulator;
  }, {});

  return {
    totalEvents: events.length,
    byType,
    latestEventDate: getLatestEventDate(events),
  };
}

export async function getAnalyticsChartData(): Promise<AnalyticsChartData> {
  const events = await fetchAnalyticsEvents();
  const summary = await getAnalyticsSummaryFromEvents(events);

  return {
    summary,
    typeBreakdown: buildTypeBreakdown(events),
    dailySeries: buildDailySeries(events),
  };
}

async function getAnalyticsSummaryFromEvents(
  events: AnalyticsEvent[]
): Promise<AnalyticsSummary> {
  const byType = events.reduce<Record<string, number>>((accumulator, event) => {
    accumulator[event.eventType] = (accumulator[event.eventType] || 0) + 1;
    return accumulator;
  }, {});

  return {
    totalEvents: events.length,
    byType,
    latestEventDate: getLatestEventDate(events),
  };
}
