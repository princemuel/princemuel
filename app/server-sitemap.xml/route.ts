import type { ISitemapField } from 'next-sitemap';
import { getServerSideSitemap } from 'next-sitemap';
import { getArticlesMetadata } from '../content';

const SITE_URL = new URL('/', process.env.SITE_URL);

export async function GET() {
  const articles = await getArticlesMetadata();

  const fields: ISitemapField[] = [
    ...articles.map(
      (article) =>
        ({
          loc: `${SITE_URL}/articles/${article.id}`,
          lastmod: new Date(article.date).toISOString(),
          changefreq: 'daily',
          priority: 0.7,
        } satisfies ISitemapField)
    ),
  ];

  return getServerSideSitemap([...fields]);
}

function tagsAndCategories(resources: IArticleMeta[]) {
  const tags = new Set<string>();
  const categories = new Set<string>();

  for (const resource of resources) {
    for (const tag of resource.tags) {
      tags.add(
        tag
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .trim()
      );
    }
    for (const category of resource.categories) {
    }
  }

  return [tags, categories];
}
