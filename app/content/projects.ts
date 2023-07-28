import { cache } from 'react';
import 'server-only';
import { fetchResource, fetchResourceMeta, parse_mdx } from './lib';

export const preloadProject = (slug: string) => {
  void getProjectBySlug(slug);
};

export const preloadProjectsMeta = () => {
  void getProjectsMetadata();
};

export const getProjectBySlug = cache(
  async (slug: string): Promise<IProject | null> => {
    const response = await fetchResource('projects')(slug);
    if (!response) return null;

    return await parse_mdx<IProject>({ data: response, slug });
  }
);

export const getProjectsMetadata = cache(async () => {
  return (await fetchResourceMeta('projects')) as IProjectMeta[];
});
