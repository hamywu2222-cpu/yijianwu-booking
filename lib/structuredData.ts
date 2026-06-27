import {
  BUSINESS_ADDRESS,
  BUSINESS_FACEBOOK,
  BUSINESS_GEO,
  BUSINESS_HOURS,
  BUSINESS_LINE,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  BUSINESS_REGISTRATION,
  BUSINESS_ROOM_COUNT,
  BUSINESS_URLS,
  FULONG_ATTRACTIONS,
  PACKAGE_BOOKING,
  ROOM_TYPES,
  SITE_OG_IMAGE,
} from '@/lib/business';
import { HOME_PAGE_DESCRIPTION, TOP5_REGIONAL_KEYWORDS } from '@/lib/seo';
import { SITE_FAQ } from '@/lib/seoPages';
import { absoluteUrl } from '@/lib/site';

export const SITE_NAME = BUSINESS_NAME;
export const SITE_DESCRIPTION = HOME_PAGE_DESCRIPTION;

const AMENITIES = [
  '免費 WiFi',
  '單車停放',
  '單車清洗區',
  '行李寄放',
  '獨立冷氣',
  '公共衛浴',
  '日式木質裝潢',
] as const;

function siteUrl() {
  return absoluteUrl('/');
}

function roomOffer(room: (typeof ROOM_TYPES)[number]) {
  return {
    '@type': 'Offer',
    '@id': `${absoluteUrl(room.path)}#offer`,
    url: absoluteUrl(room.path),
    priceCurrency: 'TWD',
    price: room.weekdayPrice,
    availability: 'https://schema.org/InStock',
    validFrom: '2026-01-01',
    priceSpecification: [
      {
        '@type': 'UnitPriceSpecification',
        price: room.weekdayPrice,
        priceCurrency: 'TWD',
        name: '平日',
      },
      {
        '@type': 'UnitPriceSpecification',
        price: room.weekendPrice,
        priceCurrency: 'TWD',
        name: '假日',
      },
    ],
    seller: { '@id': `${siteUrl()}#localbusiness` },
  };
}

function hotelRoomSchema(
  room: (typeof ROOM_TYPES)[number],
  bedType: string,
  occupancy: number,
) {
  return {
    '@type': 'HotelRoom',
    '@id': `${absoluteUrl(room.path)}#room`,
    name: room.name,
    description: room.description,
    bed: { '@type': 'BedDetails', typeOfBed: bedType },
    occupancy: {
      '@type': 'QuantitativeValue',
      maxValue: occupancy,
      unitText: '人',
    },
    offers: { '@id': `${absoluteUrl(room.path)}#offer` },
    containedInPlace: { '@id': `${siteUrl()}#hotel` },
  };
}

const touristAttractions = FULONG_ATTRACTIONS.map((spot) => ({
  '@type': 'TouristAttraction',
  '@id': `${absoluteUrl('/fulong')}#${spot.id}`,
  name: spot.name,
  description: spot.description,
  url: spot.url,
  touristType: 'OutdoorActivityLover',
  isAccessibleForFree: spot.id === 'fulong-beach',
}));

const postalAddress = {
  '@type': 'PostalAddress' as const,
  streetAddress: BUSINESS_ADDRESS.street,
  addressLocality: BUSINESS_ADDRESS.locality,
  addressRegion: BUSINESS_ADDRESS.region,
  postalCode: BUSINESS_ADDRESS.postalCode,
  addressCountry: BUSINESS_ADDRESS.country,
};

const geoCoordinates = {
  '@type': 'GeoCoordinates' as const,
  latitude: BUSINESS_GEO.latitude,
  longitude: BUSINESS_GEO.longitude,
};

export function getWebSiteJsonLd() {
  const url = siteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}#website`,
    url,
    name: BUSINESS_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: 'zh-TW',
    publisher: { '@id': `${url}#localbusiness` },
  };
}

/** 獨立 LocalBusiness + LodgingBusiness（本地搜尋 / Google 地圖 rich results） */
export function getLocalBusinessJsonLd() {
  const url = siteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'LodgingBusiness', 'BedAndBreakfast'],
    '@id': `${url}#localbusiness`,
    name: BUSINESS_NAME,
    legalName: '一間屋民宿',
    alternateName: [
      '一間屋駅前宿',
      ...TOP5_REGIONAL_KEYWORDS,
      '福隆一間屋背包客棧',
      '新北民宿',
    ],
    slogan: '福隆車站出站30秒・新北海邊日式住宿',
    description: SITE_DESCRIPTION,
    url,
    telephone: BUSINESS_PHONE.mobileE164,
    image: [
      absoluteUrl(SITE_OG_IMAGE),
      absoluteUrl('/images/scenery/fulong-station.jpg'),
      absoluteUrl('/images/scenery/fulong-beach-aerial.jpg'),
    ],
    logo: absoluteUrl(SITE_OG_IMAGE),
    priceRange: 'NT$1500+',
    numberOfRooms: BUSINESS_ROOM_COUNT,
    checkinTime: BUSINESS_HOURS.checkIn,
    checkoutTime: BUSINESS_HOURS.checkOut,
    currenciesAccepted: 'TWD',
    paymentAccepted: 'Cash, Bank Transfer, Credit Card',
    identifier: {
      '@type': 'PropertyValue',
      name: '合法民宿登記',
      value: BUSINESS_REGISTRATION,
    },
    address: postalAddress,
    geo: geoCoordinates,
    hasMap: BUSINESS_URLS.googleMapsBusiness,
    areaServed: [
      { '@type': 'City', name: '貢寮區', containedInPlace: { '@type': 'State', name: '新北市' } },
      { '@type': 'State', name: '新北市', containedInPlace: { '@type': 'Country', name: '台灣' } },
    ],
    knowsAbout: [...TOP5_REGIONAL_KEYWORDS, '舊草嶺隧道', '草嶺古道', '單車友善住宿'],
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
    ],
    amenityFeature: AMENITIES.map((name) => ({
      '@type': 'LocationFeatureSpecification',
      name,
      value: true,
    })),
    sameAs: [BUSINESS_LINE.url, BUSINESS_FACEBOOK.url, BUSINESS_URLS.googleMapsBusiness],
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: absoluteUrl('/booking'),
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
      result: {
        '@type': 'LodgingReservation',
        name: '一間屋・駅前宿訂房',
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '一間屋房型與價格',
      itemListElement: ROOM_TYPES.map((room, index) => ({
        '@type': 'Offer',
        position: index + 1,
        name: room.name,
        price: room.weekdayPrice,
        priceCurrency: 'TWD',
        url: absoluteUrl(room.path),
      })),
    },
  };
}

/** 獨立 Hotel + HotelRoom + Offer + 周邊景點（住宿 rich results） */
export function getHotelJsonLd() {
  const url = siteUrl();
  const hotelId = `${url}#hotel`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Hotel',
        '@id': hotelId,
        name: BUSINESS_NAME,
        description:
          '新北海邊福隆民宿，福隆車站出站30秒。5間日式客房，近福隆海水浴場，東北角旅遊住宿首選。',
        url,
        telephone: BUSINESS_PHONE.mobileE164,
        image: absoluteUrl(SITE_OG_IMAGE),
        logo: absoluteUrl(SITE_OG_IMAGE),
        priceRange: 'NT$1500+',
        checkinTime: BUSINESS_HOURS.checkIn,
        checkoutTime: BUSINESS_HOURS.checkOut,
        address: postalAddress,
        geo: geoCoordinates,
        hasMap: BUSINESS_URLS.googleMapsBusiness,
        parentOrganization: { '@id': `${url}#localbusiness` },
        containsPlace: ROOM_TYPES.map((room) => ({ '@id': `${absoluteUrl(room.path)}#room` })),
        nearbyAttraction: touristAttractions.map((a) => ({ '@id': a['@id'] })),
        makesOffer: ROOM_TYPES.map((room) => ({ '@id': `${absoluteUrl(room.path)}#offer` })),
      },
      hotelRoomSchema(ROOM_TYPES[0], 'Twin', 3),
      roomOffer(ROOM_TYPES[0]),
      hotelRoomSchema(ROOM_TYPES[1], 'Queen', 6),
      roomOffer(ROOM_TYPES[1]),
      {
        '@type': 'HotelRoom',
        '@id': `${absoluteUrl(ROOM_TYPES[2].path)}#room`,
        name: ROOM_TYPES[2].name,
        description: ROOM_TYPES[2].description,
        occupancy: {
          '@type': 'QuantitativeValue',
          minValue: PACKAGE_BOOKING.comfortMin,
          maxValue: PACKAGE_BOOKING.maxPeople,
          unitText: '人',
        },
        numberOfRooms: BUSINESS_ROOM_COUNT,
        offers: { '@id': `${absoluteUrl(ROOM_TYPES[2].path)}#offer` },
        containedInPlace: { '@id': hotelId },
      },
      roomOffer(ROOM_TYPES[2]),
      ...touristAttractions,
    ],
  };
}

/** @deprecated 請改用 getWebSiteJsonLd / getLocalBusinessJsonLd / getHotelJsonLd */
export function getStructuredDataJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [getWebSiteJsonLd(), getLocalBusinessJsonLd(), getHotelJsonLd()],
  };
}

export function getBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function getFulongGuideStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...FULONG_ATTRACTIONS.map((spot) => ({
        '@type': 'TouristAttraction',
        '@id': `${absoluteUrl('/fulong')}#${spot.id}`,
        name: spot.name,
        description: spot.description,
        url: spot.url,
      })),
      {
        '@type': 'ItemList',
        name: '福隆周邊景點',
        itemListElement: FULONG_ATTRACTIONS.map((spot, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: { '@id': `${absoluteUrl('/fulong')}#${spot.id}` },
        })),
      },
    ],
  };
}

export function getFaqStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SITE_FAQ.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function getRoomStructuredData(slug: 'double' | 'family' | 'package') {
  const room = ROOM_TYPES.find((item) => item.slug === slug)!;
  const bedType = slug === 'double' ? 'Twin' : slug === 'family' ? 'Queen' : undefined;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HotelRoom',
        '@id': `${absoluteUrl(room.path)}#room`,
        name: room.name,
        description: room.description,
        url: absoluteUrl(room.path),
        image: absoluteUrl(SITE_OG_IMAGE),
        ...(bedType
          ? { bed: { '@type': 'BedDetails', typeOfBed: bedType } }
          : {
              numberOfRooms: BUSINESS_ROOM_COUNT,
              occupancy: {
                '@type': 'QuantitativeValue',
                minValue: PACKAGE_BOOKING.comfortMin,
                maxValue: PACKAGE_BOOKING.maxPeople,
                unitText: '人',
              },
            }),
        containedInPlace: {
          '@type': 'Hotel',
          name: BUSINESS_NAME,
          url: siteUrl(),
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'TWD',
          price: room.weekdayPrice,
          url: absoluteUrl('/booking'),
          priceSpecification: [
            {
              '@type': 'UnitPriceSpecification',
              price: room.weekdayPrice,
              priceCurrency: 'TWD',
              name: '平日',
            },
            {
              '@type': 'UnitPriceSpecification',
              price: room.weekendPrice,
              priceCurrency: 'TWD',
              name: '假日',
            },
          ],
        },
      },
    ],
  };
}