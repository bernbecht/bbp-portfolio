/**
 * Canonical site origin for metadata, sitemap, and robots.
 * Prefer NEXT_PUBLIC_SITE_URL in production so URLs never point at localhost.
 */
export function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/+$/, '');
  }
  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    return `https://${vercelUrl.replace(/\/+$/, '')}`;
  }
  return 'http://localhost:3000';
}
