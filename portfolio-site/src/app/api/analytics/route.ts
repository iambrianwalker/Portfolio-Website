import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { logEvent } from "@/lib/logging";
import { createStructuredLog } from "@/lib/observability";
import { analyticsSchema } from "@/lib/validation";
import { recordAnalyticsEvent } from "@/services/analyticsService";
import type { AnalyticsEventPayload } from "@/types/analytics";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "local";
  if (!rateLimit(ip)) {
    return NextResponse.json({ success: false, message: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = analyticsSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: parsed.error.issues[0]?.message || "Invalid analytics payload" }, { status: 400 });
    }

    const analyticsPayload: AnalyticsEventPayload = {
      eventType: parsed.data.eventType,
      resourceId: parsed.data.resourceId,
      metadata: parsed.data.metadata as AnalyticsEventPayload["metadata"],
    };

    const result = await recordAnalyticsEvent(analyticsPayload, "client");
    const logPayload = createStructuredLog({ event: "analytics_event", eventType: result.eventType, resourceId: result.resourceId, status: 200 });
    await logEvent("analytics_event", { message: logPayload });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    const logPayload = createStructuredLog({ event: "analytics_error", error: error instanceof Error ? error.message : "Unknown analytics error", status: 500 });
    await logEvent("analytics_error", { message: logPayload });
    return NextResponse.json({ success: false, message: "Unable to record analytics event" }, { status: 500 });
  }
}
