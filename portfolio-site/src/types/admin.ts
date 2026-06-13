export interface ContactSummary {
  id: string;
  name: string;
  email: string;
  subject: string;
  createdAt: string;
}

export interface AnalyticsSummary {
  id: string;
  eventType: string;
  resourceId?: string;
  createdAt: string;
}

export interface AdminDashboardData {
  contactCount: number;
  analyticsCount: number;
  recentContacts: ContactSummary[];
  recentAnalytics: AnalyticsSummary[];
}
