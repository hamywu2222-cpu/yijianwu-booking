'use client';

import { useEffect, useState } from 'react';
import { BOOKING_CTA, BUSINESS_LINE } from '@/lib/business';

/**
 * 滑過 HERO 後：底部整列「點我立即訂房」+ 右下加 LINE。
 * 進入訂房區時收起訂房列，避免擋住表單。
 */
export default function MobileFloatingCtas() {
  const [showStickyBooking, setShowStickyBooking] = useState(false);
  const [hideLineOnHero, setHideLineOnHero] = useState(true);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById('hero');
      const booking = document.getElementById('booking');
      const heroBottom = hero?.getBoundingClientRect().bottom ?? 0;
      const bookingTop = booking?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      const pastHero = heroBottom < window.innerHeight * 0.55;
      const bookingInView = bookingTop < window.innerHeight - 64;
      setHideLineOnHero(!pastHero);
      setShowStickyBooking(pastHero && !bookingInView);
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      document.documentElement.classList.remove('has-sticky-booking');
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('has-sticky-booking', showStickyBooking);
  }, [showStickyBooking]);

  return (
    <>
      {showStickyBooking ? (
        <a href="#booking" className="booking-sticky-bar">
          {BOOKING_CTA.stickyBar}
        </a>
      ) : null}

      <a
        href={BUSINESS_LINE.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`line-lock-fab ${hideLineOnHero ? 'hidden' : ''} ${showStickyBooking ? 'line-lock-fab--raised' : ''}`}
        aria-label={BUSINESS_LINE.fabLabel}
      >
        <svg className="line-lock-fab-icon" viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M12 3.2c-4.85 0-8.8 3.28-8.8 7.32 0 3.62 3.2 6.68 7.54 7.24.29.06.7.2.8.45.09.23.06.58.03.81l-.13.8c-.04.22-.2 1.03.9.56 1.1-.47 5.9-3.48 8.05-5.96 1.46-1.62 2.16-3.26 2.16-4.9C22.55 6.48 18.7 3.2 12 3.2Z"
          />
        </svg>
        <span className="whitespace-nowrap">{BUSINESS_LINE.fabLabel}</span>
      </a>
    </>
  );
}
