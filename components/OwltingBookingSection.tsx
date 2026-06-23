'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { BOOKING_CTA, BUSINESS_LINE, OWLNEST_BOOKING } from '@/lib/business';
import { buildOwlNestBookingUrl } from '@/lib/owlnest';

function formatLocalDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function todayString() {
  return formatLocalDate(new Date());
}

function addDays(dateStr: string, days: number) {
  const date = new Date(`${dateStr}T12:00:00`);
  date.setDate(date.getDate() + days);
  return formatLocalDate(date);
}

const inputClass =
  'w-full border border-[#D1C9BE] rounded-2xl px-4 py-3 text-sm text-[#3F3A36] bg-white';
const labelClass = 'block text-xs font-medium tracking-widest text-[#8B7355] mb-1.5';
const bookingButtonClass =
  'flex w-full items-center justify-center rounded-2xl bg-[#3F3A36] px-8 py-4 text-sm font-medium tracking-[2px] text-white hover:bg-[#2C2926] active:scale-[0.99] transition-all disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#3F3A36]';

function OwlNestAvailabilityTips() {
  return (
    <div className="rounded-2xl border border-[#E8DFD2] bg-[#FFFCF8] px-5 py-4 text-sm text-[#6B665F] leading-relaxed">
      <p className="text-xs font-medium tracking-widest text-[#8B7355] mb-2">訂房小提醒</p>
      <ul className="space-y-2">
        {OWLNEST_BOOKING.tips.map((tip) => (
          <li key={tip} className="flex gap-2">
            <span className="text-[#8B7355] shrink-0">·</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function OwltingBookingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showMobileSticky, setShowMobileSticky] = useState(false);
  const minCheckIn = todayString();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState('2');
  const minCheckOut = checkIn ? addDays(checkIn, 1) : addDays(minCheckIn, 1);

  const isReady = Boolean(checkIn && checkOut && checkOut > checkIn);

  const buildCurrentBookingUrl = useCallback(
    () =>
      buildOwlNestBookingUrl({
        checkIn,
        checkOut,
        adults: Number(adults) || 1,
        children: 0,
        infants: 0,
      }),
    [adults, checkIn, checkOut],
  );

  const searchSummary = useMemo(() => {
    if (!isReady) return '';
    return `${checkIn} 入住 → ${checkOut} 退房，${Number(adults) || 1} 人`;
  }, [adults, checkIn, checkOut, isReady]);

  const openBooking = useCallback(() => {
    if (!isReady) return;
    const url = buildCurrentBookingUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [buildCurrentBookingUrl, isReady]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowMobileSticky(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="space-y-4 md:space-y-6 pb-24 md:pb-0">
      <OwlNestAvailabilityTips />

      <div className="rounded-3xl border border-[#EDE8E0] bg-white p-5 md:p-8 shadow-sm">
        <p className="text-sm text-[#6B665F] leading-relaxed mb-4 md:mb-6 text-center">
          {BOOKING_CTA.intro}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
          <div>
            <label htmlFor="owlnest-check-in" className={labelClass}>
              入住日期
            </label>
            <input
              id="owlnest-check-in"
              type="date"
              value={checkIn}
              min={minCheckIn}
              onChange={(e) => {
                const value = e.target.value;
                setCheckIn(value);
                if (!value) {
                  setCheckOut('');
                  return;
                }
                if (!checkOut || checkOut <= value) {
                  setCheckOut(addDays(value, 1));
                }
              }}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="owlnest-check-out" className={labelClass}>
              退房日期
            </label>
            <input
              id="owlnest-check-out"
              type="date"
              value={checkOut}
              min={minCheckOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="owlnest-adults" className={labelClass}>
              大人
            </label>
            <input
              id="owlnest-adults"
              type="number"
              min={1}
              max={20}
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {isReady ? (
          <p className="mb-4 rounded-2xl border border-[#E8DFD2] bg-[#F8F5F1] px-4 py-3 text-center text-xs text-[#6B665F]">
            將帶入奧丁丁訂房頁：<span className="font-medium text-[#3F3A36]">{searchSummary}</span>
          </p>
        ) : (
          <p className="mb-4 text-center text-xs text-[#8B7355]">請先選擇入住與退房日期</p>
        )}

        <button
          type="button"
          onClick={openBooking}
          disabled={!isReady}
          className={bookingButtonClass}
        >
          {BOOKING_CTA.action} →
        </button>

        <p className="mt-4 text-center text-xs text-[#8B7355]">
          {isReady ? '已帶入日期與人數，點擊後在新分頁完成訂房與刷卡' : BOOKING_CTA.note}
        </p>
      </div>

      <div className="rounded-2xl border border-[#EDE8E0] bg-[#F8F5F1] px-5 py-4 text-center text-sm text-[#6B665F]">
        <p>
          訂房完成後，請加入 LINE 官方{' '}
          <a
            href={BUSINESS_LINE.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#00C300] hover:underline"
          >
            {BUSINESS_LINE.id}
          </a>
          ，入住前將收到門禁密碼與入住資訊。
        </p>
      </div>

      {showMobileSticky && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/95 backdrop-blur-md border-t border-[#EDE8E0] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">
          <button
            type="button"
            onClick={openBooking}
            disabled={!isReady}
            className={bookingButtonClass}
          >
            {BOOKING_CTA.action} →
          </button>
        </div>
      )}
    </div>
  );
}