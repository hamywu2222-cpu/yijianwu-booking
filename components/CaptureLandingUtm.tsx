"use client";

import { useEffect } from "react";
import { trackFromSkyart, waitForGtag } from "@/lib/analytics";

/** 進站當下先記住 UTM；靜態頁若把網址清乾淨，仍把來源還原給 GA */
export default function CaptureLandingUtm() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const landing = window.__landingPageLocation || window.location.href;
    window.__landingPageLocation = landing;

    try {
      const landed = new URL(landing, window.location.origin);
      if (landed.origin !== window.location.origin) return;

      if (landed.searchParams.get("utm_source") === "skyartvegan") {
        void waitForGtag(3000).then((ok) => {
          if (ok) trackFromSkyart(landed.searchParams.get("utm_content") || undefined);
        });
      }

      if (!landed.searchParams.get("utm_source")) return;
      if (window.location.search) return;

      const restored = `${landed.pathname}${landed.search}${landed.hash || window.location.hash}`;
      window.history.replaceState(window.history.state, "", restored);
    } catch {
      /* ignore */
    }
  }, []);

  return null;
}
