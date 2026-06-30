'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { AIRBNB_BOOKING, BOOKING_CTA, BUSINESS_LINE, OWLNEST_BOOKING } from '@/lib/business';
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
  'w-full min-w-0 max-w-full box-border border border-[#D1C9BE] rounded-2xl px-4 py-3 text-sm text-[#3F3A36] bg-white';
const dateInputClass =
  'booking-date-input w-full min-w-0 max-w-full box-border border border-[#D1C9BE] rounded-2xl px-3 sm:px-4 py-3 text-sm text-[#3F3A36] bg-white';
const labelClass = 'block text-xs font-medium tracking-widest text-[#8B7355] mb-1.5';
const bookingButtonClass =
  'primary-booking-btn flex w-full items-center justify-center gap-2 rounded-2xl px-8 py-3.5 text-[15px] tracking-[1.5px]';

function AirbnbClassicMark() {
  return (
    <span className="airbnb-wordmark w-full text-center text-[18px] font-bold leading-none tracking-[-0.06em]">
      Airbnb
    </span>
  );
}

function OwlNestTipList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((tip) => (
        <li key={tip} className="flex gap-2">
          <span className="text-[#8B7355] shrink-0">·</span>
          <span>{tip}</span>
        </li>
      ))}
    </ul>
  );
}

function AvailabilityHighlight() {
  const { availabilityHighlight } = OWLNEST_BOOKING.sections.booking;

  return (
    <div className="rounded-2xl border-2 border-[#8B7355]/35 bg-white px-4 py-3.5 shadow-sm">
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F5E8C7] text-base"
          aria-hidden
        >
          ✓
        </span>
        <div className="min-w-0 text-left">
          <p className="text-sm font-semibold text-[#3F3A36]">{availabilityHighlight.title}</p>
          <p className="mt-1.5 text-sm font-medium leading-relaxed text-[#3F3A36]">
            {availabilityHighlight.body}
          </p>
          <p className="mt-2 text-xs text-[#8B7355]">{availabilityHighlight.note}</p>
        </div>
      </div>
    </div>
  );
}

function OwlNestAvailabilityTips() {
  const { guest, booking } = OWLNEST_BOOKING.sections;
  const sectionTitleClass = 'text-xs font-medium tracking-widest text-[#8B7355] mb-2';

  return (
    <div className="rounded-2xl border border-[#E8DFD2] bg-[#FFFCF8] px-4 py-3 text-sm text-[#6B665F] leading-relaxed space-y-3">
      <AvailabilityHighlight />
      <div>
        <p className={sectionTitleClass}>{guest.title}</p>
        <OwlNestTipList items={guest.lines} />
      </div>
      <div className="border-t border-[#E8DFD2] pt-3">
        <p className={sectionTitleClass}>{booking.title}</p>
        <OwlNestTipList items={booking.lines} />
        <p className="mt-2 text-sm font-medium text-[#3F3A36]">{booking.stepsTitle}</p>
        <ol className="mt-1.5 space-y-1.5 pl-5 list-decimal marker:text-[#8B7355]">
          {booking.steps.map((step) => (
            <li key={step} className="pl-1">
              {step}
            </li>
          ))}
        </ol>
      </div>
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
    <div ref={sectionRef} className="min-w-0 space-y-3 md:space-y-4 pb-20 md:pb-0">
      <OwlNestAvailabilityTips />

      <div className="overflow-hidden rounded-3xl border border-[#EDE8E0] bg-white p-4 md:p-5 shadow-sm">
        <p className="text-sm text-[#6B665F] leading-relaxed mb-3 md:mb-4 text-center">
          {BOOKING_CTA.intro}
        </p>

        <div className="grid min-w-0 grid-cols-2 sm:grid-cols-3 gap-2.5 md:gap-3 mb-3 md:mb-4">
          <div className="min-w-0">
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
              className={dateInputClass}
            />
          </div>
          <div className="min-w-0">
            <label htmlFor="owlnest-check-out" className={labelClass}>
              退房日期
            </label>
            <input
              id="owlnest-check-out"
              type="date"
              value={checkOut}
              min={minCheckOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className={dateInputClass}
            />
          </div>
          <div className="col-span-2 min-w-0 sm:col-span-1">
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
            <p className="mt-1.5 text-[10px] text-[#8B7355] leading-relaxed">
              包房超過 14 人：請填 14 人下單，並於奧丁丁備註寫實際人數（超出每人 +600，最多 19 人）
            </p>
          </div>
        </div>

        {isReady ? (
          <p className="mb-3 rounded-2xl border border-[#E8DFD2] bg-[#F8F5F1] px-4 py-2.5 text-center text-xs text-[#6B665F]">
            將帶入奧丁丁訂房頁：<span className="font-medium text-[#3F3A36]">{searchSummary}</span>
          </p>
        ) : (
          <p className="mb-3 text-center text-xs text-[#8B7355]">請先選擇入住與退房日期</p>
        )}

        <button
          type="button"
          onClick={openBooking}
          disabled={!isReady}
          className={bookingButtonClass}
        >
          <span aria-hidden className="text-[13px] opacity-90">
            ✦
          </span>
          <span>{BOOKING_CTA.action}</span>
          <span aria-hidden>→</span>
        </button>

        <p className="mt-3 text-center text-xs text-[#8B7355]">
          {isReady ? '已帶入日期與人數，點擊後在新分頁完成訂房與刷卡' : BOOKING_CTA.note}
        </p>

        <div className="mt-4 pt-4 border-t border-[#EDE8E0] text-center">
          <p className="text-xs text-[#8B7355] mb-2">或透過 Airbnb 預訂</p>
          <a
            href={AIRBNB_BOOKING.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="在 Airbnb 預訂一間屋民宿"
            className="airbnb-btn inline-flex w-full sm:w-auto min-w-[200px] items-center justify-center gap-2 rounded-[8px] px-6 py-3 text-sm transition-all active:scale-[0.98]"
          >
            <AirbnbClassicMark />
          </a>
          <p className="mt-2 text-xs text-[#8B7355] leading-relaxed">{AIRBNB_BOOKING.note}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#EDE8E0] bg-[#F8F5F1] px-4 py-3 text-center text-sm text-[#6B665F]">
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