import { NextResponse } from 'next/server';
import { fetchGoogleReviews } from '@/lib/googleReviews';

export const revalidate = 21600;

export async function GET() {
  const data = await fetchGoogleReviews();

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=3600',
    },
  });
}