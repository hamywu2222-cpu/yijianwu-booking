import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const CANONICAL_HOST = 'onehouse.asia';

/** 舊 Vercel 預設網域與 www 子網域 → 正式網域 301 */
const LEGACY_HOSTS = new Set([
  'yijianwu-booking.vercel.app',
  'yijianwu-website.vercel.app',
  'www.onehouse.asia',
]);

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0] ?? '';

  if (!LEGACY_HOSTS.has(host)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.protocol = 'https';
  url.host = CANONICAL_HOST;
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: '/:path*',
};