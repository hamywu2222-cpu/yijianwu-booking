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
      <Script id="capture-landing-url" strategy="beforeInteractive">
        {`window.__landingPageLocation=window.location.href;`}
      </Script>
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
            send_page_view: true,
            page_location: window.__landingPageLocation || window.location.href,
            page_referrer: document.referrer
          });
          window.__landingPageViewSent = true;
          try {
            var loc = window.__landingPageLocation || window.location.href;
            var u = new URL(loc, window.location.origin);
            if (u.searchParams.get('utm_source') === 'skyartvegan' && !window.__fromSkyartSent) {
              window.__fromSkyartSent = true;
              gtag('event', 'from_skyart', {
                event_category: 'referral',
                event_label: u.searchParams.get('utm_content') || '(not set)',
                transport_type: 'beacon'
              });
            }
          } catch (e) {}
          ${adsConfigLine}
        `}
      </Script>
    </>
  );
}
