"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin dashboard error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">
        Dashboard error
      </p>
      <h1 className="text-3xl font-semibold text-white">Unable to load admin data</h1>
      <p className="max-w-xl text-sm leading-7 text-zinc-400">
        The dashboard could not retrieve submissions or analytics. Check your AWS credentials,
        DynamoDB table names, and Amplify environment variables, then try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400"
      >
        Retry
      </button>
    </main>
  );
}
