import type { Metadata } from 'next';
import {
  SITE_OG_IMAGE,
  SITE_OG_IMAGE_ALT,
  SITE_OG_IMAGE_HEIGHT,
  SITE_OG_IMAGE_WIDTH,
} from '@/lib/business';
import { SITE_NAME } from '@/lib/structuredData';

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
  ogImage?: string;
  ogImageAlt?: string;
};

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  ogImage = SITE_OG_IMAGE,
  ogImageAlt = SITE_OG_IMAGE_ALT,
}: PageMetadataOptions): Metadata {
  return {
    title: { absolute: title },
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'zh_TW',
      url: path,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: SITE_OG_IMAGE_WIDTH,
          height: SITE_OG_IMAGE_HEIGHT,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}