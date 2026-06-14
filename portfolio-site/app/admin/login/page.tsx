"use client";

import Link from "next/link";
import { Suspense, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getClientAdminDashboardPath } from "@/lib/admin-path";

function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to sign in.");
        return;
      }

      router.push(getClientAdminDashboardPath());
      router.refresh();
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-zinc-900/80 p-8 shadow-2xl shadow-black/30">
      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Admin access
        </p>
        <Link
          href="/"
          className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-zinc-300 transition hover:border-cyan-400/40 hover:text-cyan-300"
        >
          Back to site
        </Link>
      </div>
      <h1 className="text-3xl font-semibold text-white">Sign in</h1>
      <p className="mt-3 text-sm leading-7 text-zinc-400">
        Sign in with your Cognito admin username and password.
        {process.env.NODE_ENV === "development"
          ? " In local development, you can also leave username blank and use ADMIN_PASSWORD from .env.local."
          : null}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block text-sm text-zinc-300">
          Username
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
            placeholder="admin"
            required={process.env.NODE_ENV === "production"}
          />
        </label>

        <label className="block text-sm text-zinc-300">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
            placeholder="Enter admin password"
            required
          />
        </label>

        {error ? <p className="text-sm text-rose-400">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-cyan-500 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Continue"}
        </button>
      </form>
    </div>
  );
}

function LoginFallback() {
  return (
    <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-zinc-900/80 p-8">
      <div className="h-8 w-40 animate-pulse rounded-full bg-zinc-800" />
      <div className="mt-6 h-10 w-56 animate-pulse rounded-full bg-zinc-800" />
      <div className="mt-8 space-y-4">
        <div className="h-16 animate-pulse rounded-2xl bg-zinc-800" />
        <div className="h-16 animate-pulse rounded-2xl bg-zinc-800" />
        <div className="h-12 animate-pulse rounded-full bg-zinc-800" />
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <AdminLoginForm />
    </Suspense>
  );
}
