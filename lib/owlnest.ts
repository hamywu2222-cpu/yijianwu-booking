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

/** 組出奧丁丁訂房頁網址（官網嵌入與外連共用） */
export function buildOwlNestBookingUrl(overrides: OwlNestSearchParams = {}): string {
  const url = new URL(getBaseBookingUrl());

  if (overrides.checkIn) {
    url.searchParams.set('start', overrides.checkIn);
  }
  if (overrides.checkOut) {
    url.searchParams.set('end', overrides.checkOut);
  }
  if (overrides.adults !== undefined) {
    url.searchParams.set('adult', String(overrides.adults));
  }
  if (overrides.children !== undefined) {
    url.searchParams.set('child', String(overrides.children));
  }
  if (overrides.infants !== undefined) {
    url.searchParams.set('infant', String(overrides.infants));
  }

  if (!url.searchParams.has('lang')) {
    url.searchParams.set('lang', 'zh_TW');
  }

  return url.toString();
}