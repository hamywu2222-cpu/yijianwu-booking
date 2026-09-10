'use client';

import { useCallback, useMemo, useState } from 'react';

import {
  AIRBNB_BOOKING,
  BOOKING_CTA,
  BUSINESS_LINE,
  OWLNEST_BOOKING,
  PACKAGE_ADULTS_FIELD_NOTE,
  PACKAGE_BOOKING,
} from '@/lib/business';
import { trackOpenOwlnest } from '@/lib/analytics';
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
          <ol className="mt-2 space-y-1.5 pl-4 list-decimal text-sm font-medium leading-relaxed text-[#3F3A36] marker:text-[#8B7355]">
            {availabilityHighlight.steps.map((step) => (
              <li key={step} className="pl-1">
                {step}
              </li>
            ))}
          </ol>
          <p
            className="mt-3 rounded-xl border-2 border-[#C4A77D] bg-[#F5E8C7]/70 px-3 py-2.5 text-sm md:text-base font-semibold leading-snug text-[#3F3A36]"
            role="note"
          >
            <span className="mr-1.5 inline-block text-[#8B7355]" aria-hidden>
              ⚠
            </span>
            {availabilityHighlight.note}
          </p>
        </div>
      </div>
    </div>
  );
}

type OwltingBookingSectionProps = {
  /**
   * 追蹤來源。官網主入口是首頁 #booking（home）。
   * /booking 獨立頁較少人到，僅作次要入口。
   */
  source?: "home" | "booking_page";
};

export default function OwltingBookingSection({
  source = "home",
}: OwltingBookingSectionProps) {
  const minCheckIn = todayString();
  const [checkIn, setCheckIn] = useState(minCheckIn);
  const [checkOut, setCheckOut] = useState(addDays(minCheckIn, 1));
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

  const openBooking = useCallback(
    (slot: 'booking_form') => {
      if (!isReady) return;
      // 主路徑：點擊後立刻送 open_owlnest（beacon），新分頁直接開奧丁丁，不再經中轉頁
      const destination = buildCurrentBookingUrl();
      trackOpenOwlnest({
        location: `${source}_${slot}`,
        destination,
        checkIn,
        checkOut,
        adults: Number(adults) || 1,
      });
      // 不可把 noopener 寫進 window.open 第三參數：Chrome/Edge 成功開分頁仍回傳 null，
      // 會被誤判擋彈窗，原分頁再跳一次 → 出現兩個奧丁丁。
      const opened = window.open(destination, '_blank');
      if (opened) {
        opened.opener = null;
      } else {
        window.location.assign(destination);
      }
    },
    [adults, buildCurrentBookingUrl, checkIn, checkOut, isReady, source],
  );

  return (
    <div
      data-ga-booking-tracked
      className="min-w-0 space-y-3 md:space-y-4"
    >
      <AvailabilityHighlight />

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
              max={PACKAGE_BOOKING.maxPeople}
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              className={inputClass}
            />
            {Number(adults) >= PACKAGE_BOOKING.comfortMin ? (
              <p className="mt-1.5 text-[10px] text-[#8B7355] leading-relaxed">
                {PACKAGE_ADULTS_FIELD_NOTE}
              </p>
            ) : (
              <p className="mt-1.5 text-[10px] text-[#8B7355] leading-relaxed">包房 12 人以上會顯示下單說明</p>
            )}
          </div>
        </div>

        {isReady ? (
          <p className="mb-3 rounded-2xl border border-[#E8DFD2] bg-[#F8F5F1] px-4 py-2.5 text-center text-xs text-[#6B665F]">
            將帶入訂房頁：<span className="font-medium text-[#3F3A36]">{searchSummary}</span>
          </p>
        ) : (
          <p className="mb-3 text-center text-xs text-[#8B7355]">請先選擇入住與退房日期</p>
        )}

        <button
          type="button"
          onClick={() => openBooking('booking_form')}
          disabled={!isReady}
          className={bookingButtonClass}
        >
          <span aria-hidden className="text-[13px] opacity-90">
            ✦
          </span>
          <span>{BOOKING_CTA.action}</span>
          <span aria-hidden>→</span>
        </button>

        <p className="mt-2.5 text-center text-xs text-[#8B7355]">
          {isReady ? '已帶入日期與人數，新分頁完成訂房與刷卡' : BOOKING_CTA.note}
        </p>

        <div className="mt-4 pt-4 border-t border-[#EDE8E0]">
          <p className="mb-2 text-center text-[11px] tracking-wide text-[#8B7355]">亦可透過</p>
          <div className="grid grid-cols-2 gap-2">
            <a
              href={AIRBNB_BOOKING.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="在 Airbnb 預訂一間屋民宿"
              className="airbnb-btn inline-flex min-h-[2.75rem] items-center justify-center rounded-[8px] px-3 py-2 text-sm transition-all active:scale-[0.98]"
            >
              <AirbnbClassicMark />
            </a>
            <a
              href={BUSINESS_LINE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-[8px] border border-[#00C300] bg-white px-3 py-2 text-sm font-medium text-[#00A300] transition-all hover:bg-[#00C300] hover:text-white active:scale-[0.98]"
            >
              {BUSINESS_LINE.inquireLabel}
            </a>
          </div>
          <p className="mt-2 text-center text-[11px] leading-relaxed text-[#8B7355]">
            Airbnb 為備選；包房、特殊需求請走 LINE
          </p>
        </div>
      </div>

      <p className="px-1 text-center text-xs leading-relaxed text-[#6B665F]">
        訂房完成後，請點{' '}
        <a
          href={BUSINESS_LINE.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#00C300] hover:underline"
        >
          LINE 取入住門禁密碼 @811mszbh
        </a>
        {' '}加入官方 LINE，自助取得入住密碼。
      </p>

    </div>
  );
}