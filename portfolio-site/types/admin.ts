export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface AdminStats {
  totalSubmissions: number;
  submissionsThisMonth: number;
  latestSubmissionDate: string | null;
}

export type AnalyticsEventType =
  | "page-view"
  | "resume-download"
  | "project-click"
  | "contact-form-submission";

export interface AnalyticsEvent {
  timestamp: string;
  id: string;
  eventType: AnalyticsEventType;
  createdAt: string;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsSummary {
  totalEvents: number;
  byType: Record<string, number>;
  latestEventDate: string | null;
}

export interface AnalyticsTypeBreakdown {
  eventType: AnalyticsEventType;
  label: string;
  count: number;
  color: string;
}

export interface AnalyticsDailyPoint {
  date: string;
  label: string;
  total: number;
  pageView: number;
  resumeDownload: number;
  projectClick: number;
  contactForm: number;
}

export interface AnalyticsChartData {
  summary: AnalyticsSummary;
  typeBreakdown: AnalyticsTypeBreakdown[];
  dailySeries: AnalyticsDailyPoint[];
}

export interface ResumeMetadata {
  fileName: string;
  uploadedAt: string | null;
  sizeBytes: number;
  storage: "s3" | "local" | "none";
  downloadPath: string;
}

export const RESUME_DOWNLOAD_PATH = "/api/resume";
export const MAX_RESUME_BYTES = 5 * 1024 * 1024;

export const ANALYTICS_EVENT_LABELS: Record<AnalyticsEventType, string> = {
  "page-view": "Page views",
  "resume-download": "Resume downloads",
  "project-click": "Project clicks",
  "contact-form-submission": "Contact submissions",
};

export const ANALYTICS_EVENT_COLORS: Record<AnalyticsEventType, string> = {
  "page-view": "#22d3ee",
  "resume-download": "#34d399",
  "project-click": "#a78bfa",
  "contact-form-submission": "#fb7185",
};
