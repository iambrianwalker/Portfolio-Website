import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-center text-zinc-100">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">404</p>
      <h1 className="mt-4 text-4xl font-semibold">Page not found</h1>
      <p className="mt-4 max-w-md text-lg text-zinc-400">
        The page you were looking for does not exist, but you can return home.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-cyan-500 px-5 py-3 font-medium text-zinc-950 transition hover:bg-cyan-400"
      >
        Return home
      </Link>
    </main>
  );
}
