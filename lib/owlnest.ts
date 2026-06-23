import { OWLNEST_BOOKING } from '@/lib/business';

export type OwlNestSearchParams = {
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
  infants?: number;
};

function getBaseBookingUrl() {
  return process.env.NEXT_PUBLIC_OWLNEST_BOOKING_URL || OWLNEST_BOOKING.url;
}

/** 奧丁丁訂房頁接受的日期格式：YYYY-MM-DD（與 booking-owlnest Vue 路由 query 一致） */
export function isValidOwlNestDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

/** 組出奧丁丁訂房頁網址；start / end / adult 會帶入官網已選條件 */
export function buildOwlNestBookingUrl(overrides: OwlNestSearchParams = {}): string {
  const url = new URL(getBaseBookingUrl());

  if (overrides.checkIn && isValidOwlNestDate(overrides.checkIn)) {
    url.searchParams.set('start', overrides.checkIn);
  }
  if (overrides.checkOut && isValidOwlNestDate(overrides.checkOut)) {
    url.searchParams.set('end', overrides.checkOut);
  }
  if (overrides.adults !== undefined) {
    url.searchParams.set('adult', String(Math.max(1, overrides.adults)));
  }
  if (overrides.children !== undefined) {
    url.searchParams.set('child', String(Math.max(0, overrides.children)));
  }
  if (overrides.infants !== undefined) {
    url.searchParams.set('infant', String(Math.max(0, overrides.infants)));
  }

  if (!url.searchParams.has('lang')) {
    url.searchParams.set('lang', 'zh_TW');
  }

  return url.toString();
}