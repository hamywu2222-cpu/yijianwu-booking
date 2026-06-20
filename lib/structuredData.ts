import { absoluteUrl } from '@/lib/site';

export const SITE_NAME = '一間屋・駅前宿';
export const SITE_DESCRIPTION =
  '福隆車站旁 30 秒即抵！一間屋·駅前宿提供日式雅房與家庭房，2026年全新裝潢，環境乾淨舒適。適合單車族、家庭或情侶入住，歡迎線上預訂。';

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=%E6%96%B0%E5%8C%97%E5%B8%82%E8%B2%A2%E5%AF%AE%E5%8D%80%E7%A6%8F%E9%9A%86%E8%A1%972%E5%B7%B71-2%E8%99%9F';

const AMENITIES = [
  '免費 WiFi',
  '單車停放',
  '獨立冷氣',
  '公共衛浴',
  '日式木質裝潢',
] as const;

/** Schema.org LodgingBusiness JSON-LD（民宿結構化資料） */
export function getLodgingBusinessJsonLd() {
  const siteUrl = absoluteUrl('/');

  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${siteUrl}#lodging`,
    name: SITE_NAME,
    alternateName: ['一間屋', '駅前宿', '一間屋 福隆', '福隆駅前宿'],
    description: SITE_DESCRIPTION,
    url: siteUrl,
    telephone: '+886-912-362-533',
    image: [
      absoluteUrl('/images/hero.jpg'),
      absoluteUrl('/images/scenery/fulong-station.jpg'),
      absoluteUrl('/images/station_exterior.jpg'),
    ],
    logo: absoluteUrl('/images/hero.jpg'),
    priceRange: 'NT$1600+',
    checkinTime: '15:00',
    checkoutTime: '11:00',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '福隆街2巷1-2號',
      addressLocality: '貢寮區',
      addressRegion: '新北市',
      postalCode: '228',
      addressCountry: 'TW',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.0209,
      longitude: 121.9445,
    },
    hasMap: GOOGLE_MAPS_URL,
    amenityFeature: AMENITIES.map((name) => ({
      '@type': 'LocationFeatureSpecification',
      name,
      value: true,
    })),
    knowsAbout: ['福隆民宿', '福隆車站住宿', '日式民宿', '單車友善住宿'],
    sameAs: ['https://line.me/ti/p/@811mszbh', GOOGLE_MAPS_URL],
  };
}