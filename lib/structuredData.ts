import {
  BUSINESS_ADDRESS,
  BUSINESS_FACEBOOK,
  BUSINESS_GEO,
  BUSINESS_HOURS,
  BUSINESS_LEGAL_NAME,
  BUSINESS_LINE,
  BUSINESS_MAPS_NAME,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  BUSINESS_REGISTRATION,
  BUSINESS_ROOM_COUNT,
  BUSINESS_URLS,
  LOCAL_SEO_KEYWORDS,
} from '@/lib/business';
import { absoluteUrl } from '@/lib/site';

export const SITE_NAME = BUSINESS_NAME;
export const SITE_DESCRIPTION =
  '福隆車站旁 30 秒即抵！一間屋·駅前宿是鄰近草嶺古道的福隆背包客棧與青年旅館，提供新北貢寮住宿、福隆包棟民宿與日式雅房，2026年全新裝潢，適合單車族、家庭或情侶入住。';

const AMENITIES = [
  '免費 WiFi',
  '單車停放',
  '獨立冷氣',
  '公共衛浴',
  '日式木質裝潢',
] as const;

/** Schema.org LodgingBusiness + BedAndBreakfast JSON-LD（民宿結構化資料） */
export function getLodgingBusinessJsonLd() {
  const siteUrl = absoluteUrl('/');

  return {
    '@context': 'https://schema.org',
    '@type': ['LodgingBusiness', 'BedAndBreakfast'],
    '@id': `${siteUrl}#lodging`,
    name: BUSINESS_NAME,
    legalName: BUSINESS_LEGAL_NAME,
    alternateName: [
      BUSINESS_MAPS_NAME,
      '一間屋',
      '駅前宿',
      '一間屋背包客棧',
      ...LOCAL_SEO_KEYWORDS,
    ],
    description: SITE_DESCRIPTION,
    url: siteUrl,
    telephone: BUSINESS_PHONE.mobileE164,
    image: [
      absoluteUrl('/images/hero.jpg'),
      absoluteUrl('/images/scenery/fulong-station.jpg'),
      absoluteUrl('/images/station_exterior.jpg'),
    ],
    logo: absoluteUrl('/images/hero.jpg'),
    priceRange: 'NT$1600+',
    numberOfRooms: BUSINESS_ROOM_COUNT,
    checkinTime: BUSINESS_HOURS.checkIn,
    checkoutTime: BUSINESS_HOURS.checkOut,
    identifier: {
      '@type': 'PropertyValue',
      name: '民宿登記證號',
      value: BUSINESS_REGISTRATION,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_ADDRESS.street,
      addressLocality: BUSINESS_ADDRESS.locality,
      addressRegion: BUSINESS_ADDRESS.region,
      postalCode: BUSINESS_ADDRESS.postalCode,
      addressCountry: BUSINESS_ADDRESS.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_GEO.latitude,
      longitude: BUSINESS_GEO.longitude,
    },
    hasMap: BUSINESS_URLS.googleMapsBusiness,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: BUSINESS_HOURS.contact.opens,
        closes: BUSINESS_HOURS.contact.closes,
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS_PHONE.mobileE164,
        contactType: 'reservations',
        availableLanguage: ['zh-TW', 'en', 'ja'],
        areaServed: 'TW',
      },
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS_PHONE.landlineE164,
        contactType: 'customer service',
        availableLanguage: ['zh-TW'],
        areaServed: 'TW',
      },
    ],
    amenityFeature: AMENITIES.map((name) => ({
      '@type': 'LocationFeatureSpecification',
      name,
      value: true,
    })),
    knowsAbout: [
      '福隆民宿',
      '福隆車站住宿',
      '日式民宿',
      '單車友善住宿',
      ...LOCAL_SEO_KEYWORDS,
    ],
    sameAs: [
      BUSINESS_LINE.url,
      BUSINESS_FACEBOOK.url,
      BUSINESS_URLS.googleMapsBusiness,
    ],
  };
}

/** Schema.org WebSite JSON-LD（供 Google 關聯官網與商家） */
export function getWebSiteJsonLd() {
  const siteUrl = absoluteUrl('/');

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}#website`,
    url: siteUrl,
    name: BUSINESS_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: 'zh-TW',
    publisher: {
      '@id': `${siteUrl}#lodging`,
    },
  };
}

export function getStructuredDataJsonLd() {
  return [getWebSiteJsonLd(), getLodgingBusinessJsonLd()];
}