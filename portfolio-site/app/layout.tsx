import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { navigation } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brian Walker | Software Developer",
  description:
    "Personal portfolio site for Brian Walker, a developer and CS student focused on modern web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-zinc-950 text-zinc-100">
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
          <header className="sticky top-4 z-20 mb-4 rounded-full border border-white/10 bg-zinc-900/80 px-4 py-3 shadow-lg shadow-black/20 backdrop-blur">
            <nav className="flex flex-wrap items-center justify-between gap-3">
              <Link href="/" className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-100">
                Brian Walker
              </Link>
              <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-400">
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
      </body>
    </html>
  );
}
