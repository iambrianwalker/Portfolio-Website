import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AdminPathProvider } from "@/components/admin-path-provider";
import {
  getAdminBasePath,
  getAdminDashboardPath,
  getAdminLoginPath,
} from "@/lib/admin-path";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site-url";
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
  metadataBase: new URL(SITE_URL),
  title: "Brian Walker | Software Engineer",
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "Brian Walker | Software Engineer",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Brian Walker Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian Walker | Software Engineer",
    description: SITE_DESCRIPTION,
  },
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
        <AdminPathProvider
          basePath={getAdminBasePath()}
          loginPath={getAdminLoginPath()}
          dashboardPath={getAdminDashboardPath()}
        >
          {children}
        </AdminPathProvider>
      </body>
    </html>
  );
}
