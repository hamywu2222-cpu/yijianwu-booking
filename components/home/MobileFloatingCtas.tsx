'use client';

import { useEffect, useState } from 'react';
import { BOOKING_CTA, BUSINESS_LINE } from '@/lib/business';

/**
 * 手機底欄：左訂房 FAB + 右 LINE。
 * 當 #booking 進入視野（含訂房區 sticky）時隱藏左訂房 FAB，避免雙底欄遮擋。
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
          className="primary-booking-btn primary-booking-btn--compact md:hidden fixed bottom-6 left-4 z-50 inline-flex items-center justify-center rounded-full px-3.5 py-2.5 text-[11px] tracking-wide whitespace-nowrap"
        >
          {BOOKING_CTA.jumpShort}
        </a>
      )}

      <a
        href={BUSINESS_LINE.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed right-4 md:right-6 z-50 flex items-center gap-2 bg-[#00C300] text-white px-4 md:px-5 py-3 rounded-full shadow-lg hover:bg-[#00A000] transition-all font-medium text-xs md:text-sm ${
          hideBookingFab
            ? 'bottom-[calc(4.5rem+env(safe-area-inset-bottom))] md:bottom-6'
            : 'bottom-6'
        }`}
      >
        <span className="md:hidden">📱 LINE</span>
        <span className="hidden md:inline">📱 LINE 門禁密碼 {BUSINESS_LINE.id}</span>
      </a>
    </>
  );
}
