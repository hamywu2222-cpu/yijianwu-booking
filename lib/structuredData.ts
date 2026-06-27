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
import { HOME_PAGE_DESCRIPTION } from '@/lib/seo';
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
    seller: { '@id': `${siteUrl()}#organization` },
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

/** 全站 JSON-LD（LocalBusiness + Hotel + Room + Offer + TouristAttraction + FAQ） */
export function getStructuredDataJsonLd() {
  const url = siteUrl();
  const orgId = `${url}#organization`;
  const hotelId = `${url}#hotel`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${url}#website`,
        url,
        name: BUSINESS_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: 'zh-TW',
        publisher: { '@id': orgId },
      },
      {
        '@type': ['LocalBusiness', 'LodgingBusiness', 'Hotel'],
        '@id': orgId,
        name: BUSINESS_NAME,
        legalName: '一間屋民宿',
        alternateName: [
          '一間屋駅前宿',
          '福隆民宿',
          '福隆車站民宿',
          '福隆一間屋背包客棧',
        ],
        description: SITE_DESCRIPTION,
        url,
        telephone: BUSINESS_PHONE.mobileE164,
        image: [
          absoluteUrl(SITE_OG_IMAGE),
          absoluteUrl('/images/scenery/fulong-station.jpg'),
        ],
        logo: absoluteUrl(SITE_OG_IMAGE),
        priceRange: 'NT$1500+',
        numberOfRooms: BUSINESS_ROOM_COUNT,
        checkinTime: BUSINESS_HOURS.checkIn,
        checkoutTime: BUSINESS_HOURS.checkOut,
        currenciesAccepted: 'TWD',
        paymentAccepted: 'Cash, Bank Transfer',
        identifier: {
          '@type': 'PropertyValue',
          name: '合法民宿登記',
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
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
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
        sameAs: [
          BUSINESS_LINE.url,
          BUSINESS_FACEBOOK.url,
          BUSINESS_URLS.googleMapsBusiness,
        ],
        makesOffer: ROOM_TYPES.map((room) => ({ '@id': `${absoluteUrl(room.path)}#offer` })),
        containsPlace: { '@id': hotelId },
      },
      {
        '@type': 'Hotel',
        '@id': hotelId,
        name: BUSINESS_NAME,
        description: '福隆駅前合法民宿，5 間客房含和鳴雙人房與和風家庭房。',
        url,
        telephone: BUSINESS_PHONE.mobileE164,
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
        containsPlace: ROOM_TYPES.map((room) => ({ '@id': `${absoluteUrl(room.path)}#room` })),
        nearbyAttraction: touristAttractions.map((a) => ({ '@id': a['@id'] })),
        parentOrganization: { '@id': orgId },
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