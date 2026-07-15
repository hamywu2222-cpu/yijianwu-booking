import Script from "next/script";
import {
  GA_MEASUREMENT_ID,
  GOOGLE_ADS_ID,
} from "@/lib/analytics";

export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  // 有 Google Ads ID 時一併 config，才能送 AW conversion
  const adsConfigLine = GOOGLE_ADS_ID
    ? `gtag('config', '${GOOGLE_ADS_ID}');`
    : "";

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
          ${adsConfigLine}
        `}
      </Script>
    </>
  );
}
