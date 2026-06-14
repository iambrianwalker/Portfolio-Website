import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: ReactNode;
  description: string;
}

export function StatCard({ title, value, description }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5 shadow-lg shadow-black/20">
      <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-400">
        {title}
      </p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-zinc-400">{description}</p>
    </div>
  );
}
