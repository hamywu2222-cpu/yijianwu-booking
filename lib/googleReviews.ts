import {
  BUSINESS_ADDRESS,
  BUSINESS_GEO,
  BUSINESS_MAPS_NAME,
  GOOGLE_PLACE_ID,
  GOOGLE_TRAVEL_REVIEWS_URL,
  GOOGLE_WRITE_REVIEW_URL,
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
  source: 'live' | 'featured' | 'demo' | 'unavailable';
  fetchedAt: string;
};

const PLACES_BASE = 'https://places.googleapis.com/v1';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

let cachedPayload: { data: GoogleReviewsPayload; expiresAt: number } | null = null;
let resolvedPlaceId: string | null = null;

/** Google Travel 真實 5 星留言（6 則） */
const FEATURED_REVIEWS: GoogleReviewsPayload = {
  rating: 5,
  userRatingCount: 49,
  reviews: [
    {
      authorName: 'CICIA CHEN',
      rating: 5,
      text: '地點超級方便、房間乾淨整潔舒適、價格便宜，下次一定回來再住。',
      relativeTime: '1 個月前',
      profilePhotoUrl:
        'https://lh3.googleusercontent.com/a-/ALV-UjX6ICwS2bp3OvWU26V4LtipWctkExPrILwSfdjkLQhgg3lBBa2N=s80-c-rp-mo-br100',
    },
    {
      authorName: '張祐銘',
      rating: 5,
      text: '地理位置超方便，真的出車站30秒就抵達。老闆友善親切，房間也很乾淨，大推👍🏻',
      relativeTime: '2 個月前',
      profilePhotoUrl:
        'https://lh3.googleusercontent.com/a-/ALV-UjVwfwhkwYJ1YeQbJ55akgwsibgJNH8MOFlzFXXGHMPzVzhJo_X2=s80-c-rp-mo-ba12-br100',
    },
    {
      authorName: '李若溱',
      rating: 5,
      text: '老闆人很好很親切，地點很近蠻方便的，住宿好選擇👍🏻💗',
      relativeTime: '1 個月前',
      profilePhotoUrl:
        'https://lh3.googleusercontent.com/a/ACg8ocJcy2D2ETxZe2s2XABTZYHO43AGwq9qZ3G99FJbwpCTLObMkW0=s80-c-rp-mo-ba12-br100',
    },
    {
      authorName: 'Morton',
      rating: 5,
      text: '地點方便且房間舒適，服務也很親切，絕對想再來住的好地方',
      relativeTime: '',
      profilePhotoUrl:
        'https://lh3.googleusercontent.com/a-/ALV-UjWKEYivvKCqMzhNLjw2d3oX_eyCSY-EKMZAKZYVJXFg_IUNj0vq=s80-c-rp-br100',
    },
    {
      authorName: 'W EI',
      rating: 5,
      text: '出站30秒沒有唬爛的（親測）住宿環境對得起價位！物美價廉～ 大推👍',
      relativeTime: '',
      profilePhotoUrl:
        'https://lh3.googleusercontent.com/a-/ALV-UjX4vO0fjkJvMU3uMbMso8T9kHk4oCYFRbWJwMD0oFlGrcLi4kWu=s80-c-rp-br100',
    },
    {
      authorName: 'mo oh',
      rating: 5,
      text: '老闆很讚 離火車站超近也離免費沙灘走個路10分鐘就到了！',
      relativeTime: '',
      profilePhotoUrl:
        'https://lh3.googleusercontent.com/a-/ALV-UjViFuz4DpLDGBr6ISqlSM0Phgv_eGvg7-zJL9gn78zPIDMxl10Kjw=s80-c-rp-ba12-br100',
    },
  ],
  reviewsUri: GOOGLE_TRAVEL_REVIEWS_URL,
  writeReviewUri: GOOGLE_WRITE_REVIEW_URL,
  source: 'featured',
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

function featuredPayload(): GoogleReviewsPayload {
  return {
    ...FEATURED_REVIEWS,
    fetchedAt: new Date().toISOString(),
  };
}

function fallbackPayload(): GoogleReviewsPayload {
  return featuredPayload();
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
    signal: init?.signal ?? AbortSignal.timeout(4000),
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
    writeReviewUri: GOOGLE_WRITE_REVIEW_URL,
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
    const data = fallbackPayload();
    cachedPayload = { data, expiresAt: now + CACHE_TTL_MS };
    return data;
  }

  try {
    const placeId = await resolvePlaceId();
    const details = await placesFetch<PlacesDetails>(
      `/places/${placeId}?languageCode=zh-TW`,
      {
        headers: {
          'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
        },
      },
    );

    const payload = normalizeDetails(details);
    cachedPayload = { data: payload, expiresAt: now + CACHE_TTL_MS };
    return payload;
  } catch (error) {
    console.error('[googleReviews]', error);
    const data = fallbackPayload();
    cachedPayload = { data, expiresAt: now + CACHE_TTL_MS };
    return data;
  }
}