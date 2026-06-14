"use client";

import { useRouter } from "next/navigation";
import { getClientAdminLoginPath } from "@/lib/admin-path";

export function SiteBrandLink() {
  const router = useRouter();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (event.shiftKey) {
      router.push(getClientAdminLoginPath());
      return;
    }

    router.push("/");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="cursor-pointer text-sm font-semibold uppercase tracking-[0.24em] text-zinc-100 transition hover:text-cyan-300"
    >
      Brian Walker
    </button>
  );
}
