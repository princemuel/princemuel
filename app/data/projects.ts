import { ResponsiveVideo, Text } from '@/components';
import { compileMDX } from 'next-mdx-remote/rsc';
import { cache } from 'react';
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
  async (slug: string): Promise<IProject | null> => {
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

    if (!res.ok) return null;

    const data = await res.text();
    if (data === '404: Not Found') return null;

    const { frontmatter, content } = await compileMDX<IProjectMeta>({
      source: data,
      components: {
        ResponsiveVideo,
        Text,
      },
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          rehypePlugins: [rehypeHighlight, rehypeSlug],
        },
      },
    });

    const id = slug.replace(/\.mdx$/, '');
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

  for (const slug of slugs) {
    const project = await getProjectBySlug(slug);
    if (project) {
      const { meta } = project;
      metadata.push(meta);
    }
  }

  return metadata.sort((a, b) => (a.date < b.date ? 1 : -1));
});
