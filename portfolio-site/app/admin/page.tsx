import Link from "next/link";
import { notFound } from "next/navigation";
import { AnalyticsCharts } from "@/components/admin/AnalyticsCharts";
import { MessagesTable } from "@/components/admin/MessagesTable";
import { ResumeUploadPanel } from "@/components/admin/ResumeUploadPanel";
import { LocalDateTime } from "@/components/admin/local-date-time";
import { StatCard } from "@/components/admin/StatCard";
import { getAdminStats, getContactSubmissions } from "@/lib/admin";
import { getAdminDashboardPath } from "@/lib/admin-path";
import { isAdminAuthenticated } from "@/lib/auth";
import { getAnalyticsChartData } from "@/lib/analytics";
import { logAppEvent } from "@/lib/cloudwatch";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    notFound();
  }

  const [submissions, analytics] = await Promise.all([
    getContactSubmissions(),
    getAnalyticsChartData(),
  ]);

  await logAppEvent("admin-dashboard-view", {
    submissionCount: submissions.length,
    analyticsEvents: analytics.summary.totalEvents,
  });

  const stats = getAdminStats(submissions);

  return (
    <main className="flex flex-col gap-8">
      <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.12),_transparent_30%),linear-gradient(135deg,_rgba(24,24,27,0.95),_rgba(9,9,11,0.98))] p-8 shadow-2xl shadow-cyan-950/20">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Admin dashboard
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
          Contact submissions & engagement
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
          Monitor incoming messages, review recent activity, and track portfolio engagement from one secure place.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total submissions"
          value={stats.totalSubmissions.toString()}
          description="All messages captured in DynamoDB"
        />
        <StatCard
          title="Submissions this month"
          value={stats.submissionsThisMonth.toString()}
          description="Activity over the current calendar month"
        />
        <StatCard
          title="Latest submission"
          value={
            <LocalDateTime
              value={stats.latestSubmissionDate}
              fallback="No submissions yet"
              options={{ dateStyle: "medium", timeStyle: "short" }}
            />
          }
          description="Most recent contact form entry"
        />
      </section>

      <ResumeUploadPanel />

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <MessagesTable submissions={submissions} />
        <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5 shadow-lg shadow-black/20">
          <h2 className="text-xl font-semibold text-white">Analytics overview</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Real-time charts powered by the portfolio-analytics table.
          </p>
          <div className="mt-6">
            <AnalyticsCharts data={analytics} />
          </div>
        </div>
      </section>

      <div className="rounded-2xl border border-white/10 bg-zinc-900/50 px-5 py-4 text-sm text-zinc-400">
        Need to refresh data after new activity?{" "}
        <Link href={getAdminDashboardPath()} className="font-medium text-cyan-300 hover:text-cyan-200">
          Reload the dashboard
        </Link>
        .
      </div>
    </main>
  );
}
