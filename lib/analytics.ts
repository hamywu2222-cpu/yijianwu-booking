/**
 * GA4 / Google Ads 追蹤
 *
 * 主要轉換（給 Ads「盡量爭取轉換」用）：
 *   事件名 open_owlnest — 使用者點訂房並跳轉奧丁丁訂房頁
 *
 * 次要行為（分析用，不要當主要轉換）：
 *   事件名 booking_click + booking_action=cta_click — 官網內「去訂房區」等 CTA
 *
 * 後台請在 GA4 將 open_owlnest 標為「主要事件／轉換」，再匯入 Google Ads。
 */

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-VYEJNN6EQF";

/** 選填：Google Ads 轉換 ID，例如 AW-123456789 */
export const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() || "";

/**
 * 選填：Google Ads「跳轉奧丁丁」轉換標籤（Conversion label）
 * 與 ID 組成 send_to：AW-xxx/label
 */
export const GOOGLE_ADS_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL?.trim() || "";

export const GOOGLE_ADS_SEND_TO =
  GOOGLE_ADS_ID && GOOGLE_ADS_CONVERSION_LABEL
    ? `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`
    : "";

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js" | "set" | "consent",
      targetId: string | Date,
      config?: Record<string, string | number | boolean | undefined>,
    ) => void;
    dataLayer?: unknown[];
  }
}

function canTrack() {
  return typeof window !== "undefined" && typeof window.gtag === "function";
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
    // 提高離開頁面前送達機率（新分頁開啟時仍建議保留）
    transport_type: "beacon",
  };

  if (params.destination) eventParams.link_url = params.destination;
  if (params.checkIn) eventParams.check_in = params.checkIn;
  if (params.checkOut) eventParams.check_out = params.checkOut;
  if (params.adults !== undefined) eventParams.adults = params.adults;

  return eventParams;
}

/** 官網內訂房相關點擊（含 CTA、跳轉奧丁丁明細） */
export function trackBookingClick(params: BookingClickParams) {
  if (!GA_MEASUREMENT_ID || !canTrack()) return;

  window.gtag!("event", "booking_click", buildBookingParams(params));
}

/**
 * 主要轉換：點擊後開啟奧丁丁訂房頁
 * - GA4 事件：open_owlnest（請標為主要事件）
 * - 同時保留 booking_click 明細
 * - 若有設定 AW 轉換，再送 Google Ads conversion
 */
export function trackOpenOwlnest(
  params: Omit<BookingClickParams, "action"> & {
    destination: string;
  },
) {
  if (!canTrack()) return;

  const detail = buildBookingParams({
    ...params,
    action: "open_owlnest",
  });

  if (GA_MEASUREMENT_ID) {
    // 給 GA4 / Ads 匯入用的主要事件（名稱固定，勿改）
    window.gtag!("event", "open_owlnest", {
      ...detail,
      event_category: "booking",
      event_label: "owlnest",
      // 方便在 GA4 報表篩選「完成跳轉訂房引擎」
      outbound: true,
    });

    // 明細事件（分析用）
    window.gtag!("event", "booking_click", detail);
  }

  // 選填：Google Ads 網站轉換標籤（後台建立轉換後把 ID/label 填進 env）
  if (GOOGLE_ADS_SEND_TO) {
    window.gtag!("event", "conversion", {
      send_to: GOOGLE_ADS_SEND_TO,
      transport_type: "beacon",
    });
  }
}
