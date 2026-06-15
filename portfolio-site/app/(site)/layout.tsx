import Link from "next/link";
import { PageViewTracker } from "@/components/page-view-tracker";
import { SiteBrandLink } from "@/components/site-brand-link";
import { navigation } from "@/lib/content";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
      <PageViewTracker />
      <header className="sticky top-4 z-20 mb-4 rounded-full border border-white/10 bg-zinc-900/80 px-4 py-3 shadow-lg shadow-black/20 backdrop-blur">
        <nav className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex w-full justify-center sm:w-auto sm:justify-start">
            <SiteBrandLink />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-zinc-400 sm:justify-end">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-zinc-100"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      {children}
    </div>
  );
}
