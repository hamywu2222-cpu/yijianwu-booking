/**
 * GA4 / Google Ads 追蹤
 *
 * 主要轉換（只送這 1 個事件）：
 *   open_owlnest — 使用者經 /go/owlnest 前往奧丁丁訂房頁
 *   （等同「到達奧丁丁訂房引擎」；對方網域無法直接裝碼）
 *
 * 次要（分析用，勿當主要轉換）：
 *   booking_click + cta_click — 官網內「去訂房區」等 CTA
 *
 * GA4：將 open_owlnest 標為主要事件 → 匯入 Google Ads。
 */

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-VYEJNN6EQF";

/** 選填：Google Ads 轉換 ID，例如 AW-123456789 */
export const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() || "";

/**
 * 選填：Google Ads「跳轉奧丁丁」轉換標籤
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

/** 官網內訂房 CTA（非跳轉奧丁丁） */
export function trackBookingClick(params: BookingClickParams) {
  if (!GA_MEASUREMENT_ID || !canTrack()) return;

  window.gtag!("event", "booking_click", buildBookingParams(params));
}

export type TrackOpenOwlnestOptions = Omit<BookingClickParams, "action"> & {
  destination: string;
  /** 事件送出後呼叫（導向奧丁丁前）；失敗也會在 timeout 後呼叫 */
  onReady?: () => void;
  /** 等待 gtag callback 的最長時間（ms） */
  timeoutMs?: number;
};

/**
 * 主要轉換：只送 1 次 open_owlnest（勿再疊 booking_click）
 * 在 /go/owlnest 中轉頁呼叫，再導向奧丁丁。
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

  // 保險：callback 沒回來也繼續導向
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

  // 若有設定 AW，與 GA4 分開系統；仍屬「同一轉換意圖」
  if (GOOGLE_ADS_SEND_TO) {
    window.gtag!("event", "conversion", {
      send_to: GOOGLE_ADS_SEND_TO,
      transport_type: "beacon",
    });
  }
}
