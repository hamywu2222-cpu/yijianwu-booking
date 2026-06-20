const DEFAULT_SITE_URL = 'https://yijianwu-website.vercel.app';

/** 正規化網站根網址（無尾隨斜線），供 sitemap / robots / metadata 共用 */
export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : DEFAULT_SITE_URL);

  return raw.replace(/\/+$/, '');
}

/** 組出完整頁面網址；首頁固定以 / 結尾 */
export function absoluteUrl(path: string = '/'): string {
  const base = getSiteUrl();
  if (path === '/' || path === '') {
    return `${base}/`;
  }
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}