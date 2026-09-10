"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackPageView } from "@/lib/analytics";

export default function GoogleAnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    trackPageView(url);
  }, [pathname, searchParams]);

  return null;
}