'use client';

import { useEffect, useState } from 'react';
import { BOOKING_CTA, BUSINESS_LINE } from '@/lib/business';

/**
 * 手機底欄：左訂房 FAB + 右 LINE 自助入住密碼取得。
 * 桌機僅右下 LINE 自助入住。
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

  const fabBottom = hideBookingFab
    ? 'bottom-[calc(4.5rem+env(safe-area-inset-bottom))] md:bottom-6'
    : 'bottom-6';

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

      {/* 右下懸浮：手機／桌機皆為 LINE 自助入住密碼取得 */}
      <a
        href={BUSINESS_LINE.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed right-4 z-50 flex max-w-[calc(100vw-5.5rem)] items-center gap-1 rounded-full bg-[#00C300] px-2.5 py-2 text-[11px] font-medium leading-none text-white shadow-lg transition-all active:scale-[0.98] hover:bg-[#00A000] min-[400px]:gap-1.5 min-[400px]:px-3.5 min-[400px]:text-[12px] md:right-6 md:max-w-none md:gap-2 md:px-4 md:py-3 md:text-sm ${fabBottom}`}
        aria-label={BUSINESS_LINE.fabLabel}
      >
        <span aria-hidden className="shrink-0">
          📱
        </span>
        <span className="whitespace-nowrap">{BUSINESS_LINE.fabLabel}</span>
      </a>
    </>
  );
}
