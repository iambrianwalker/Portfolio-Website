import type { Metadata } from "next";
import { headers } from "next/headers";
import { ReactNode } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { getAdminLoginPath, isPublicAdminPath } from "@/lib/admin-path";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const isLogin =
    pathname === getAdminLoginPath() ||
    pathname === "/admin/login" ||
    (isPublicAdminPath(pathname) && pathname.endsWith("/login"));

  if (isLogin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-12 text-zinc-100">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <AdminHeader />
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
