import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';

const SEO_PATHS = [
  { path: '/', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/booking', priority: 0.95, changeFrequency: 'weekly' as const },
  { path: '/fulong', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/faq', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/renovation', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/rooms/double', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/rooms/family', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/rooms/package', priority: 0.9, changeFrequency: 'monthly' as const },
] as const;

/** 靜態內容站：以建置時間作為 lastModified 基準 */
const SITE_LAST_MODIFIED = new Date('2026-06-27');

export default function sitemap(): MetadataRoute.Sitemap {
  return SEO_PATHS.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency,
    priority,
  }));
}