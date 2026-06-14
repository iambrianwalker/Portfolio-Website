import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  getAnalyticsChartData,
  getAnalyticsSummary,
  recordAnalyticsEvent,
} from "@/lib/analytics";
import type { AnalyticsEventType } from "@/types/admin";

export const runtime = "nodejs";

const VALID_EVENT_TYPES: AnalyticsEventType[] = [
  "page-view",
  "resume-download",
  "project-click",
  "contact-form-submission",
];

function isAnalyticsEventType(value: unknown): value is AnalyticsEventType {
  return typeof value === "string" && VALID_EVENT_TYPES.includes(value as AnalyticsEventType);
}

export async function GET(request: Request) {
  try {
    const isAuthenticated = await isAdminAuthenticated();

    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const includeCharts = searchParams.get("charts") === "true";

    if (includeCharts) {
      const chartData = await getAnalyticsChartData();
      return NextResponse.json({ success: true, analytics: chartData });
    }

    const summary = await getAnalyticsSummary();
    return NextResponse.json({ success: true, analytics: summary });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load analytics";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const eventType = body?.eventType;

    if (!isAnalyticsEventType(eventType)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing eventType" },
        { status: 400 }
      );
    }

    const item = await recordAnalyticsEvent(eventType, body?.metadata);
    return NextResponse.json({ success: true, event: item });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to record analytics";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
