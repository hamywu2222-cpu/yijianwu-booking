"use client";

import { useEffect } from "react";
import { trackBookingClick } from "@/lib/analytics";

function isBookingCta(element: HTMLElement): HTMLElement | null {
  const trigger = element.closest<HTMLElement>("a, button");
  if (!trigger) return null;

  if (trigger.closest("[data-ga-booking-tracked]")) return null;

  if (trigger.classList.contains("primary-booking-btn")) return trigger;

  if (trigger instanceof HTMLAnchorElement) {
    const href = trigger.getAttribute("href") ?? "";
    if (
      href === "#booking" ||
      href === "/booking" ||
      href.endsWith("/booking") ||
      href.includes("#booking")
    ) {
      return trigger;
    }
  }

  return null;
}

function resolveBookingLocation(target: HTMLElement): string {
  const marked = target.closest<HTMLElement>("[data-ga-booking-location]");
  if (marked?.dataset.gaBookingLocation) {
    return marked.dataset.gaBookingLocation;
  }

  if (target.closest(".site-nav-mobile-links")) return "nav_mobile";
  if (target.closest(".site-nav")) return "nav";
  if (target.closest("#rooms")) return "rooms_section";
  if (target.closest("#location")) return "location_section";
  if (target.closest("#renovation")) return "renovation_section";
  if (target.closest(".fixed.bottom-6")) return "mobile_fixed";
  if (target.closest("header") && !target.closest(".site-nav")) {
    return "subpage_header";
  }

  const section = target.closest("section");
  if (section?.querySelector("h1")) return "hero";

  return "other";
}

export default function BookingClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      const trigger = isBookingCta(target);
      if (!trigger) return;

      const destination =
        trigger instanceof HTMLAnchorElement
          ? trigger.getAttribute("href") ?? undefined
          : undefined;

      trackBookingClick({
        action: "cta_click",
        location: resolveBookingLocation(trigger),
        destination,
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}