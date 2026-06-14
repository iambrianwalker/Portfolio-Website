"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackPortfolioEvent } from "@/lib/analytics-client";

export function PageViewTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || pathname === lastTrackedPath.current) {
      return;
    }

    lastTrackedPath.current = pathname;
    void trackPortfolioEvent("page-view", { path: pathname });
  }, [pathname]);

  return null;
}
