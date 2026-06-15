"use client";

import Link from "next/link";
import { useState } from "react";
import { useAdminPaths } from "@/components/admin-path-provider";

type AdminHeaderProps = {
  dashboardPath: string;
  loginPath: string;
};

export function AdminHeader({ dashboardPath, loginPath }: AdminHeaderProps) {
  const { loginPath: clientLoginPath } = useAdminPaths();
  const resolvedLoginPath = loginPath || clientLoginPath;
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      window.location.assign(
        typeof data.redirectTo === "string" ? data.redirectTo : resolvedLoginPath
      );
    } catch {
      setLoading(false);
    }
  }

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Portfolio admin
          </p>
          <p className="mt-1 text-sm text-zinc-400">Secure dashboard for submissions and analytics</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            prefetch
            className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:border-cyan-400/40 hover:text-cyan-300"
          >
            View site
          </Link>
          <Link
            href={dashboardPath}
            className="rounded-full border border-cyan-400/30 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/10"
          >
            Dashboard
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="rounded-full bg-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </div>
    </header>
  );
}
