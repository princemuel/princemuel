import { cache } from 'react';
import 'server-only';
import { fetchResource, fetchResourceMeta, parse_mdx } from './lib';

export const preloadProject = (slug: string) => {
  void getProjectBySlug(slug);
};

export const preloadProjectsMeta = () => {
  void getProjectsMetadata();
};

export const getProjectBySlug = cache(async (slug: string) => {
  const response = await fetchResource('projects')(slug);
  if (!response) return null;

  return await parse_mdx<IProject>(response, slug);
});

export const getProjectsMetadata = cache(async () => {
  return (await fetchResourceMeta('projects')) as IProjectMeta[];
});
