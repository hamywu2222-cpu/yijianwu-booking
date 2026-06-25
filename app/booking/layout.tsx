import type { Metadata } from 'next';
import {
  SITE_OG_IMAGE,
  SITE_OG_IMAGE_ALT,
  SITE_OG_IMAGE_HEIGHT,
  SITE_OG_IMAGE_WIDTH,
} from '@/lib/business';
import { SITE_NAME } from '@/lib/structuredData';

const BOOKING_TITLE = '線上訂房付款 | 福隆車站步行30秒 · 一間屋 · 駅前宿';
const BOOKING_DESCRIPTION =
  '一間屋線上訂房付款：選日期與人數，查空房、選房型並完成付款（含包房優惠方案，舒適建議人數 12–14）。加入 LINE 官方 @811mszbh 接收入住門禁密碼。福隆車站步行 30 秒。';

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
        width: SITE_OG_IMAGE_WIDTH,
        height: SITE_OG_IMAGE_HEIGHT,
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