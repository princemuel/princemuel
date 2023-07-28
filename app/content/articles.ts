import { cache } from 'react';
import 'server-only';
import { fetchResource, fetchResourceMeta, parse_mdx } from './lib';

export const preloadArticle = (slug: string) => {
  void getArticleBySlug(slug);
};

export const preloadArticlesMeta = () => {
  void getArticlesMetadata();
};

export const getArticleBySlug = cache(
  async (slug: string): Promise<IArticle | null> => {
    const response = await fetchResource('articles')(slug);
    if (!response) return null;

    return await parse_mdx<IArticle>({ data: response, slug });
  }
);

export const getArticlesMetadata = cache(async () => {
  return (await fetchResourceMeta('articles')) as IArticleMeta[];
});
