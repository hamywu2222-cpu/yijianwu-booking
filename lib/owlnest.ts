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

export type OwlNestGoParams = OwlNestSearchParams & {
  /** 官網按鈕位置，僅追蹤用，不會轉給奧丁丁 */
  location?: string;
};

/**
 * 官網中轉路徑：先到 /go/owlnest 送出 1 次 open_owlnest，再導向奧丁丁。
 * 因 booking-owlnest.com 非本站，無法在對方頁面裝碼，以此代表「到達訂房引擎」。
 */
export function buildOwlNestGoPath(params: OwlNestGoParams = {}): string {
  const sp = new URLSearchParams();

  if (params.checkIn && isValidOwlNestDate(params.checkIn)) {
    sp.set('start', params.checkIn);
  }
  if (params.checkOut && isValidOwlNestDate(params.checkOut)) {
    sp.set('end', params.checkOut);
  }
  if (params.adults !== undefined) {
    sp.set('adult', String(Math.max(1, params.adults)));
  }
  if (params.children !== undefined) {
    sp.set('child', String(Math.max(0, params.children)));
  }
  if (params.infants !== undefined) {
    sp.set('infant', String(Math.max(0, params.infants)));
  }
  if (params.location) {
    sp.set('from', params.location);
  }

  const qs = sp.toString();
  return qs ? `/go/owlnest?${qs}` : '/go/owlnest';
}