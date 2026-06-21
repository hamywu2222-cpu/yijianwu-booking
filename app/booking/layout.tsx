import type { Metadata } from 'next';
import { SITE_OG_IMAGE, SITE_OG_IMAGE_ALT } from '@/lib/business';
import { SITE_NAME } from '@/lib/structuredData';

const BOOKING_TITLE = '訂房詢問 | 福隆車站步行30秒 · 一間屋 · 駅前宿';
const BOOKING_DESCRIPTION =
  '填寫訂房詢問表單，加入 LINE 官方 @811mszbh 並回傳訂單後 4 碼即可完成確認。福隆車站步行 30 秒。';

export const metadata: Metadata = {
  title: BOOKING_TITLE,
  description: BOOKING_DESCRIPTION,
  alternates: {
    canonical: '/booking',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: '/booking',
    siteName: SITE_NAME,
    title: BOOKING_TITLE,
    description: BOOKING_DESCRIPTION,
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: BOOKING_TITLE,
    description: BOOKING_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return children;
}