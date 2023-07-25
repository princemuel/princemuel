import { components } from '@/common';
import { compileMDX } from 'next-mdx-remote/rsc';
import { cache } from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib';
import rehypeHighlight from 'rehype-highlight/lib';
import rehypeSlug from 'rehype-slug';
import 'server-only';
import { CONTENT_REPO_PATH } from './constants';
import { getRepoFiletree } from './filetree';

export const preloadProject = (slug: string) => {
  void getProjectBySlug(slug);
};

export const preloadProjectsMeta = () => {
  void getProjectsMetadata();
};

export const getProjectBySlug = cache(
  async (slug: string): Promise<IProject | null> => {
    slug = slug.includes('.mdx');
    const response = await fetch(
      `https://raw.githubusercontent.com/${CONTENT_REPO_PATH}/main/projects/${slug}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    );

    if (!response.ok) return null;

    const data = await response.text();
    if (data === '404: Not Found') return null;

    const { frontmatter, content } = await compileMDX<IProjectMeta>({
      source: data,
      components,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          rehypePlugins: [
            rehypeHighlight,
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                behavior: 'wrap',
              },
            ],
          ],
        },
      },
    });

    const id = slug.replace(/\.mdx?$/, '');
    return {
      meta: {
        ...frontmatter,
        id,
      },
      content,
    } satisfies IProject;
  }
);

export const getProjectsMetadata = cache(async () => {
  const filetrees = await getRepoFiletree();
  if (!filetrees) return null;

  const slugs = filetrees.tree
    .map((obj) => obj.path)
    .filter((path) => {
      return path.includes('projects') && path.endsWith('.mdx');
    })
    //
    .map((path) => path.replace(/projects\//, ''));

  const metadata: IProjectMeta[] = [];

  Promise.allSettled(
    slugs.map(async (slug) => await getProjectBySlug(slug))
  ).then((results) => {
    results.forEach((result) => {
      if (result.status === 'fulfilled' && result.value) {
        const { meta } = result.value;
        metadata.push(meta);
      }
    });
  });

  // for (const slug of slugs) {
  //   const project = await getProjectBySlug(slug);
  //   if (project) {
  //     const { meta } = project;
  //     metadata.push(meta);
  //   }
  // }

  return metadata.sort((a, b) => (a.date < b.date ? 1 : -1));
});
