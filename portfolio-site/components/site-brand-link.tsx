"use client";

import Link from "next/link";
import { useAdminPaths } from "@/components/admin-path-provider";

export function SiteBrandLink() {
  const { loginPath } = useAdminPaths();

  function openAdminLogin(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    event.stopPropagation();
    window.location.assign(loginPath);
  }

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (event.shiftKey) {
      openAdminLogin(event);
    }
  }

  function handleMouseDown(event: React.MouseEvent<HTMLAnchorElement>) {
    if (event.shiftKey) {
      openAdminLogin(event);
    }
  }

  return (
    <Link
      href="/"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      className="cursor-pointer text-center text-sm font-semibold uppercase tracking-[0.16em] text-zinc-100 transition hover:text-cyan-300 sm:tracking-[0.24em]"
      title="Shift+click for admin login"
    >
      Brian Walker
    </Link>
  );
}
