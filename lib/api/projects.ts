import { Player } from '@/components';
import { compileMDX } from 'next-mdx-remote/rsc';
import { cache } from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib';
import rehypeHighlight from 'rehype-highlight/lib';
import rehypeSlug from 'rehype-slug';
// import 'server-only';
import { REPO_PATH } from './constants';
import { getRepoFiletree } from './filetree';

export const preloadProject = (slug: string) => {
  void getProjectBySlug(slug);
};

export const preloadProjectsMeta = () => {
  void getProjectsMetadata();
};

export const getProjectBySlug = cache(
  async (slug: string): Promise<IProject | undefined> => {
    const res = await fetch(
      `https://raw.githubusercontent.com/${REPO_PATH}/main/projects/${slug}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    );

    if (!res.ok) return undefined;

    const data = await res.text();
    if (data === '404: Not Found') return undefined;

    const { frontmatter, content } = await compileMDX<IProjectMeta>({
      source: data,
      components: {
        Player,
      },
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

    const id = slug.replace(/\.mdx$/, '');
    return {
      meta: {
        id,
        title: frontmatter.title,
        date: frontmatter.date,
        tags: frontmatter.tags,
      },
      content,
    } satisfies IProject;
  }
);

export const getProjectsMetadata = cache(async () => {
  const filetrees = await getRepoFiletree();
  if (!filetrees) return undefined;

  const files = filetrees.tree
    .map((obj) => obj.path)
    .filter((path) => {
      return path.includes('projects') && path.endsWith('.mdx');
    });

  const metadata: IProjectMeta[] = [];

  for (const file of files) {
    const project = await getProjectBySlug(file);
    if (project) {
      const { meta } = project;
      metadata.push(meta);
    }
  }

  return metadata.sort((a, b) => (a.date < b.date ? 1 : -1));
});
