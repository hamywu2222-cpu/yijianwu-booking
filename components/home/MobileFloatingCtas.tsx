'use client';

import { useEffect, useState } from 'react';
import { BOOKING_CTA, BUSINESS_LINE } from '@/lib/business';

/**
 * 手機底欄：左訂房 FAB + 右 LINE 取得門禁密碼。
 * 桌機僅右下 LINE 取得門禁密碼。
 * 當 #booking 進入視野時隱藏左訂房 FAB，避免雙底欄遮擋。
 */
export default function MobileFloatingCtas() {
  const [hideBookingFab, setHideBookingFab] = useState(false);

  useEffect(() => {
    const booking = document.getElementById('booking');
    if (!booking) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideBookingFab(entry.isIntersecting);
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(booking);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {!hideBookingFab && (
        <a
          href="#booking"
          className="primary-booking-btn primary-booking-btn--fab md:hidden fixed bottom-6 left-4 z-50 inline-flex items-center justify-center rounded-full whitespace-nowrap"
        >
          {BOOKING_CTA.jumpShort}
        </a>
      )}

      {/* 右下懸浮：手機／桌機皆為 LINE 取得門禁密碼 */}
      <a
        href={BUSINESS_LINE.url}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-4 bottom-6 z-40 flex max-w-[calc(100vw-5.5rem)] items-center gap-1 rounded-full border border-[#D1C9BE] bg-white/95 px-2.5 py-2 text-[11px] font-medium leading-none text-[#6B665F] shadow-md transition-all active:scale-[0.98] hover:border-[#00C300] hover:text-[#00A300] min-[400px]:gap-1.5 min-[400px]:px-3 min-[400px]:text-[12px] md:right-6 md:max-w-none md:gap-2 md:px-4 md:py-3 md:text-sm"
        aria-label={BUSINESS_LINE.fabLabel}
      >
        <span className="whitespace-nowrap">{BUSINESS_LINE.fabLabel}</span>
      </a>
    </>
  );
}
