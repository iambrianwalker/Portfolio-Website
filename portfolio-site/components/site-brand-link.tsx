"use client";

import Link from "next/link";
import { useAdminPaths } from "@/components/admin-path-provider";

export function SiteBrandLink() {
  const { loginPath } = useAdminPaths();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (event.shiftKey) {
      event.preventDefault();
      window.location.assign(loginPath);
    }
  }

  return (
    <Link
      href="/"
      onClick={handleClick}
      className="cursor-pointer text-sm font-semibold uppercase tracking-[0.24em] text-zinc-100 transition hover:text-cyan-300"
      title="Shift+click for admin login"
    >
      Brian Walker
    </Link>
  );
}
