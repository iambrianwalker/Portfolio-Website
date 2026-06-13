import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminDashboardData } from "@/services/adminService";

export const dynamic = "force-dynamic";

function isAuthorized(requestHeaders: Headers) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  const authHeader = requestHeaders.get("authorization") ?? "";

  if (!username || !password) {
    return false;
  }

  const expected = Buffer.from(`${username}:${password}`).toString("base64");
  return authHeader === `Basic ${expected}`;
}

export default async function AdminPage() {
  const requestHeaders = await headers();
  if (!isAuthorized(requestHeaders)) {
    redirect("/contact");
  }

  const data = await getAdminDashboardData();

  return (
    <main className="flex-1 bg-slate-950 p-8 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-400">Admin</p>
            <h1 className="mt-2 text-3xl font-semibold">Operational dashboard</h1>
          </div>
          <Link href="/" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300">Back home</Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Contact submissions</h2>
            <p className="mt-2 text-sm text-slate-400">{data.contactCount} recent records available</p>
            <ul className="mt-4 space-y-3">
              {data.recentContacts.map((contact) => (
                <li key={contact.id} className="rounded-2xl border border-white/10 bg-slate-900/70 p-3">
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-slate-400">{contact.subject}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Analytics activity</h2>
            <p className="mt-2 text-sm text-slate-400">{data.analyticsCount} recent events recorded</p>
            <ul className="mt-4 space-y-3">
              {data.recentAnalytics.map((event) => (
                <li key={event.id} className="rounded-2xl border border-white/10 bg-slate-900/70 p-3">
                  <p className="font-medium">{event.eventType}</p>
                  <p className="text-sm text-slate-400">{event.resourceId ?? "General event"}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
