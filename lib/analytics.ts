/**
 * GA4 / Google Ads 追蹤
 *
 * GA4 主要事件：
 *   open_owlnest — 經 /go/owlnest 前往奧丁丁（分析用）
 *
 * Google Ads 轉換（專員提供，點擊事件）：
 *   訂房：button.primary-booking-btn → AW-…/qJ5hCKHt-twcEO-Hxb1D
 *   電話：a[href*="tel:"] → AW-…/oqIACKvc-twcEO-Hxb1D
 *
 * 訂房 Ads 轉換只在「主訂房按鈕」送一次，不在 /go/owlnest 再送，
 * 避免同一操作被算兩次。
 */

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-VYEJNN6EQF";

/** Google Ads 帳戶 ID（公開值，可出現在前端） */
export const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() || "AW-18114233327";

/**
 * 訂房按鈕轉換標籤（button.primary-booking-btn）
 * send_to = AW-…/qJ5hCKHt-twcEO-Hxb1D
 */
export const GOOGLE_ADS_BOOKING_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_BOOKING_CONVERSION_LABEL?.trim() ||
  "qJ5hCKHt-twcEO-Hxb1D";

/**
 * 電話連結轉換標籤（a[href*="tel:"]）
 * send_to = AW-…/oqIACKvc-twcEO-Hxb1D
 */
export const GOOGLE_ADS_PHONE_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_CONVERSION_LABEL?.trim() ||
  "oqIACKvc-twcEO-Hxb1D";

/** @deprecated 舊名：請改用 GOOGLE_ADS_BOOKING_CONVERSION_LABEL */
export const GOOGLE_ADS_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL?.trim() ||
  GOOGLE_ADS_BOOKING_CONVERSION_LABEL;

export const GOOGLE_ADS_BOOKING_SEND_TO =
  GOOGLE_ADS_ID && GOOGLE_ADS_BOOKING_CONVERSION_LABEL
    ? `${GOOGLE_ADS_ID}/${GOOGLE_ADS_BOOKING_CONVERSION_LABEL}`
    : "";

export const GOOGLE_ADS_PHONE_SEND_TO =
  GOOGLE_ADS_ID && GOOGLE_ADS_PHONE_CONVERSION_LABEL
    ? `${GOOGLE_ADS_ID}/${GOOGLE_ADS_PHONE_CONVERSION_LABEL}`
    : "";

/** 相容舊程式：等同訂房 send_to */
export const GOOGLE_ADS_SEND_TO = GOOGLE_ADS_BOOKING_SEND_TO;

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js" | "set" | "consent",
      targetId: string | Date,
      config?: Record<string, string | number | boolean | undefined | (() => void)>,
    ) => void;
    dataLayer?: unknown[];
  }
}

function canTrack() {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

/** 等 gtag 腳本就緒（中轉頁導向前用） */
export function waitForGtag(timeoutMs = 3000): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (typeof window.gtag === "function") return Promise.resolve(true);

  return new Promise((resolve) => {
    const start = Date.now();
    const id = window.setInterval(() => {
      if (typeof window.gtag === "function") {
        window.clearInterval(id);
        resolve(true);
      } else if (Date.now() - start >= timeoutMs) {
        window.clearInterval(id);
        resolve(false);
      }
    }, 50);
  });
}

export function trackPageView(url: string) {
  if (!GA_MEASUREMENT_ID || !canTrack()) return;

  window.gtag!("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

export type BookingClickParams = {
  action: "open_owlnest" | "cta_click";
  location: string;
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
};

function buildBookingParams(params: BookingClickParams) {
  const eventParams: Record<string, string | number | boolean> = {
    booking_action: params.action,
    button_location: params.location,
    transport_type: "beacon",
  };

  if (params.destination) eventParams.link_url = params.destination;
  if (params.checkIn) eventParams.check_in = params.checkIn;
  if (params.checkOut) eventParams.check_out = params.checkOut;
  if (params.adults !== undefined) eventParams.adults = params.adults;

  return eventParams;
}

/** 官網內訂房 CTA（非跳轉奧丁丁；GA4 分析用） */
export function trackBookingClick(params: BookingClickParams) {
  if (!GA_MEASUREMENT_ID || !canTrack()) return;

  window.gtag!("event", "booking_click", buildBookingParams(params));
}

/**
 * Google Ads：訂房按鈕轉換（對應專員 button.primary-booking-btn 腳本）
 */
export function trackAdsBookingConversion() {
  if (!canTrack() || !GOOGLE_ADS_BOOKING_SEND_TO) return;

  window.gtag!("event", "conversion", {
    send_to: GOOGLE_ADS_BOOKING_SEND_TO,
    transport_type: "beacon",
  });
}

/**
 * Google Ads：電話連結轉換（對應專員 a[href*="tel:"] 腳本）
 */
export function trackAdsPhoneConversion() {
  if (!canTrack() || !GOOGLE_ADS_PHONE_SEND_TO) return;

  window.gtag!("event", "conversion", {
    send_to: GOOGLE_ADS_PHONE_SEND_TO,
    transport_type: "beacon",
  });
}

export type TrackOpenOwlnestOptions = Omit<BookingClickParams, "action"> & {
  destination: string;
  /** 事件送出後呼叫（導向奧丁丁前）；失敗也會在 timeout 後呼叫 */
  onReady?: () => void;
  /** 等待 gtag callback 的最長時間（ms） */
  timeoutMs?: number;
};

/**
 * GA4：open_owlnest（中轉頁）
 * 不在此送 Google Ads 訂房 conversion，避免與主訂房按鈕重複計算。
 */
export function trackOpenOwlnest(params: TrackOpenOwlnestOptions) {
  const { onReady, timeoutMs = 800, ...tracking } = params;
  let finished = false;

  const done = () => {
    if (finished) return;
    finished = true;
    onReady?.();
  };

  if (!canTrack() || !GA_MEASUREMENT_ID) {
    done();
    return;
  }

  const detail = buildBookingParams({
    ...tracking,
    action: "open_owlnest",
  });

  const timer = window.setTimeout(done, timeoutMs);

  window.gtag!("event", "open_owlnest", {
    ...detail,
    event_category: "booking",
    event_label: "owlnest",
    outbound: true,
    event_callback: () => {
      window.clearTimeout(timer);
      done();
    },
  });
}
