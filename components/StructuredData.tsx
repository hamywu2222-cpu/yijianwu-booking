import {
  getHotelJsonLd,
  getLocalBusinessJsonLd,
  getWebSiteJsonLd,
} from '@/lib/structuredData';

/** 分拆 JSON-LD，方便 Google Rich Results 辨識 LocalBusiness 與 Hotel */
export default function StructuredData() {
  const localBusiness = getLocalBusinessJsonLd();
  const hotel = getHotelJsonLd();
  const website = getWebSiteJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotel) }}
      />
    </>
  );
}