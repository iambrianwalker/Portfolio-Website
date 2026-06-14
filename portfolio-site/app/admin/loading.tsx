export default function AdminLoading() {
  return (
    <main className="flex flex-col gap-6">
      <div className="h-40 animate-pulse rounded-[2rem] border border-white/10 bg-zinc-900/80" />
      <div className="grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="h-32 animate-pulse rounded-2xl border border-white/10 bg-zinc-900/80"
          />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="h-[28rem] animate-pulse rounded-2xl border border-white/10 bg-zinc-900/80" />
        <div className="h-[28rem] animate-pulse rounded-2xl border border-white/10 bg-zinc-900/80" />
      </div>
    </main>
  );
}
