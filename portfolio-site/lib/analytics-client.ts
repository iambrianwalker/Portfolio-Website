import type { AnalyticsEventType } from "@/types/admin";

export async function trackPortfolioEvent(
  eventType: AnalyticsEventType,
  metadata?: Record<string, unknown>
) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventType, metadata }),
    });
  } catch {
    // Ignore client-side tracking failures.
  }
}
