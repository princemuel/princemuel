import type { ISitemapField } from 'next-sitemap';
import { getServerSideSitemap } from 'next-sitemap';

const SITE_URL = new URL('/', process.env.SITE_URL);

export async function GET() {
  const fields = [
    {
      loc: `${SITE_URL}/projects`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.7,
    },
  ] satisfies ISitemapField[];

  return getServerSideSitemap([...fields]);
}
