"use client";

import { useEffect } from "react";
import {
  trackAdsBookingConversion,
  trackAdsPhoneConversion,
} from "@/lib/analytics";

/**
 * Google Ads 點擊轉換（對應專員提供的兩段腳本）
 *
 * 電話：
 *   a[href*="tel:"] → AW-18114233327/oqIACKvc-twcEO-Hxb1D
 *
 * 訂房：
 *   button.primary-booking-btn → AW-18114233327/qJ5hCKHt-twcEO-Hxb1D
 *
 * 使用 document 事件委派（等同專員 script，但更適合 Next.js）：
 * - 不依賴 window.load 當下的 DOM 快照
 * - 涵蓋之後才出現的按鈕（手機 sticky 訂房列等）
 * - 導覽列 / 左下角的 <a class="primary-booking-btn"> 不算訂房轉換
 *   （那些只是捲到 #booking，真正意圖在表單 button）
 */
export default function AdsConversionTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const raw = event.target;
      const el =
        raw instanceof Element
          ? raw
          : raw instanceof Node
            ? raw.parentElement
            : null;
      if (!el) return;

      const phoneLink = el.closest<HTMLAnchorElement>('a[href*="tel:"]');
      if (phoneLink) {
        trackAdsPhoneConversion();
        return;
      }

      const bookingBtn = el.closest<HTMLButtonElement>(
        "button.primary-booking-btn",
      );
      if (bookingBtn && !bookingBtn.disabled) {
        trackAdsBookingConversion();
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
