"use client";

import Link from "next/link";
import { Download } from "lucide-react";

interface ResumeDownloadLinkProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
}

export function ResumeDownloadLink({ href, className, children }: ResumeDownloadLinkProps) {
  const handleClick = async () => {
    try {
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventType: "resume_download" }),
      });
    } catch {
      // Ignore analytics failures.
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
