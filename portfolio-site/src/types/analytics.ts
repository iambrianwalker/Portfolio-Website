export type AnalyticsEventType = "resume_download" | "project_view" | "contact_submit";

export interface AnalyticsEventPayload {
  eventType: AnalyticsEventType;
  resourceId?: string;
  metadata?: Record<string, string | number | boolean | null | undefined>;
}

export interface AnalyticsRecord {
  id: string;
  eventType: AnalyticsEventType;
  resourceId?: string;
  metadata?: string;
  createdAt: string;
  source: string;
}
