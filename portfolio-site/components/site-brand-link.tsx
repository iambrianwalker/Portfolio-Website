"use client";

import { useRouter } from "next/navigation";

type SiteBrandLinkProps = {
  adminLoginPath: string;
};

export function SiteBrandLink({ adminLoginPath }: SiteBrandLinkProps) {
  const router = useRouter();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (event.shiftKey) {
      window.location.assign(adminLoginPath);
      return;
    }

    router.push("/");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="cursor-pointer text-sm font-semibold uppercase tracking-[0.24em] text-zinc-100 transition hover:text-cyan-300"
      title="Shift+click for admin login"
    >
      Brian Walker
    </button>
  );
}
