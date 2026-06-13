"use client";

import { useEffect } from "react";

interface AnalyticsTrackerProps {
  eventType: "resume_download" | "project_view";
  resourceId?: string;
  metadata?: Record<string, string | number | boolean | null | undefined>;
}

export function AnalyticsTracker({ eventType, resourceId, metadata }: AnalyticsTrackerProps) {
  useEffect(() => {
    const send = async () => {
      try {
        await fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventType, resourceId, metadata }),
        });
      } catch {
        // Ignore analytics failures so the page experience is unaffected.
      }
    };

    void send();
  }, [eventType, resourceId, metadata]);

  return null;
}
