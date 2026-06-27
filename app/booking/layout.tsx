import type { Metadata } from 'next';
import { BOOKING_PAGE_DESCRIPTION, BOOKING_PAGE_TITLE, SITE_SEO_KEYWORDS } from '@/lib/seo';
import { buildPageMetadata } from '@/lib/seoMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: BOOKING_PAGE_TITLE,
  description: BOOKING_PAGE_DESCRIPTION,
  path: '/booking',
  keywords: SITE_SEO_KEYWORDS,
});

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return children;
}