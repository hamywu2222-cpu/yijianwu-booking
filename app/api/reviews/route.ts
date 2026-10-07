import { NextResponse } from 'next/server';
import { fetchGoogleReviews } from '@/lib/googleReviews';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const data = await fetchGoogleReviews();
  const maxAge = data.source === 'live' ? 21600 : 60;

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': `public, s-maxage=${maxAge}, stale-while-revalidate=60`,
    },
  });
}