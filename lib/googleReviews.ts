import {
  BUSINESS_ADDRESS,
  BUSINESS_GEO,
  BUSINESS_MAPS_NAME,
  GOOGLE_BUSINESS_PROFILE_URL,
  GOOGLE_PLACE_ID,
  GOOGLE_TRAVEL_REVIEWS_URL,
} from '@/lib/business';

export type GoogleReviewItem = {
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
  profilePhotoUrl?: string;
  authorUri?: string;
};

export type GoogleReviewsPayload = {
  rating: number;
  userRatingCount: number;
  reviews: GoogleReviewItem[];
  reviewsUri: string;
  writeReviewUri: string;
  source: 'live' | 'demo';
  fetchedAt: string;
};

const PLACES_BASE = 'https://places.googleapis.com/v1';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

let cachedPayload: { data: GoogleReviewsPayload; expiresAt: number } | null = null;
let resolvedPlaceId: string | null = null;

const DEMO_REVIEWS: GoogleReviewsPayload = {
  rating: 4.9,
  userRatingCount: 0,
  reviews: [
    {
      authorName: '旅人 A',
      rating: 5,
      text: '出站走 30 秒就到，晚上回來超方便。房間乾淨安靜，老闆很親切，福隆玩水住這裡很推薦。',
      relativeTime: '2 週前',
    },
    {
      authorName: '旅人 B',
      rating: 5,
      text: '和式房間很有質感，公共空間舒適。距離海水浴場很近，單車環島也很順。',
      relativeTime: '1 個月前',
    },
    {
      authorName: '旅人 C',
      rating: 5,
      text: '家庭房空間剛好，小孩睡得很舒服。入住前 LINE 就收到門禁說明，流程很清楚。',
      relativeTime: '1 個月前',
    },
  ],
  reviewsUri: GOOGLE_TRAVEL_REVIEWS_URL,
  writeReviewUri: GOOGLE_BUSINESS_PROFILE_URL,
  source: 'demo',
  fetchedAt: new Date().toISOString(),
};

type PlacesReview = {
  relativePublishTimeDescription?: string;
  rating?: number;
  text?: { text?: string };
  authorAttribution?: {
    displayName?: string;
    photoUri?: string;
    uri?: string;
  };
};

type PlacesDetails = {
  rating?: number;
  userRatingCount?: number;
  reviews?: PlacesReview[];
  googleMapsLinks?: {
    reviewsUri?: string;
    writeAReviewUri?: string;
  };
};

type TextSearchResponse = {
  places?: Array<{ id?: string }>;
};

function getApiKey(): string | undefined {
  return process.env.GOOGLE_PLACES_API_KEY?.trim();
}

function demoPayload(): GoogleReviewsPayload {
  return {
    ...DEMO_REVIEWS,
    fetchedAt: new Date().toISOString(),
  };
}

async function placesFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('GOOGLE_PLACES_API_KEY is not configured');
  }

  const response = await fetch(`${PLACES_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      ...(init?.headers ?? {}),
    },
    next: { revalidate: 21600 },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Places API ${response.status}: ${body.slice(0, 240)}`);
  }

  return response.json() as Promise<T>;
}

async function resolvePlaceId(): Promise<string> {
  if (resolvedPlaceId) return resolvedPlaceId;

  const configured = process.env.GOOGLE_PLACE_ID?.trim() || GOOGLE_PLACE_ID;
  if (configured) {
    resolvedPlaceId = configured;
    return configured;
  }

  const textQuery = `${BUSINESS_MAPS_NAME} ${BUSINESS_ADDRESS.full}`;
  const search = await placesFetch<TextSearchResponse>('/places:searchText', {
    method: 'POST',
    headers: {
      'X-Goog-FieldMask': 'places.id',
    },
    body: JSON.stringify({
      textQuery,
      languageCode: 'zh-TW',
      locationBias: {
        circle: {
          center: {
            latitude: BUSINESS_GEO.latitude,
            longitude: BUSINESS_GEO.longitude,
          },
          radius: 500,
        },
      },
    }),
  });

  const placeId = search.places?.[0]?.id;
  if (!placeId) {
    throw new Error(`Place ID not found for query: ${textQuery}`);
  }

  resolvedPlaceId = placeId;
  return placeId;
}

function normalizeReview(review: PlacesReview): GoogleReviewItem | null {
  const text = review.text?.text?.trim();
  if (!text) return null;

  return {
    authorName: review.authorAttribution?.displayName?.trim() || 'Google 旅客',
    rating: review.rating ?? 0,
    text,
    relativeTime: review.relativePublishTimeDescription?.trim() || '',
    profilePhotoUrl: review.authorAttribution?.photoUri,
    authorUri: review.authorAttribution?.uri,
  };
}

function normalizeDetails(details: PlacesDetails): GoogleReviewsPayload {
  const reviews = (details.reviews ?? [])
    .map(normalizeReview)
    .filter((item): item is GoogleReviewItem => item !== null)
    .filter((item) => item.rating === 5);

  return {
    rating: details.rating ?? 0,
    userRatingCount: details.userRatingCount ?? 0,
    reviews,
    reviewsUri: GOOGLE_TRAVEL_REVIEWS_URL,
    writeReviewUri:
      details.googleMapsLinks?.writeAReviewUri ?? GOOGLE_BUSINESS_PROFILE_URL,
    source: 'live',
    fetchedAt: new Date().toISOString(),
  };
}

export async function fetchGoogleReviews(): Promise<GoogleReviewsPayload> {
  const now = Date.now();
  if (cachedPayload && cachedPayload.expiresAt > now) {
    return cachedPayload.data;
  }

  if (!getApiKey()) {
    const demo = demoPayload();
    cachedPayload = { data: demo, expiresAt: now + CACHE_TTL_MS };
    return demo;
  }

  try {
    const placeId = await resolvePlaceId();
    const details = await placesFetch<PlacesDetails>(
      `/places/${placeId}?languageCode=zh-TW`,
      {
        headers: {
          'X-Goog-FieldMask': 'rating,userRatingCount,reviews,googleMapsLinks',
        },
      },
    );

    const payload = normalizeDetails(details);
    cachedPayload = { data: payload, expiresAt: now + CACHE_TTL_MS };
    return payload;
  } catch (error) {
    console.error('[googleReviews]', error);
    const demo = demoPayload();
    cachedPayload = { data: demo, expiresAt: now + 15 * 60 * 1000 };
    return demo;
  }
}