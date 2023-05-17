import { Player } from '@/components';
import { compileMDX } from 'next-mdx-remote/rsc';
import { cache } from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib';
import rehypeHighlight from 'rehype-highlight/lib';
import rehypeSlug from 'rehype-slug';
import 'server-only';
import { REPO_PATH } from './constants';
import { getRepoFiletree } from './filetree';

export const preload = (fileName: string) => {
  void getPostByName(fileName);
};

export const getPostByName = cache(
  async (fileName: string): Promise<IPost | undefined> => {
    const res = await fetch(
      `https://raw.githubusercontent.com/${REPO_PATH}/main/posts/${fileName}`,
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

    const { frontmatter, content } = await compileMDX<IPostMeta>({
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

    const id = fileName.replace(/\.mdx$/, '');
    return {
      meta: {
        id,
        title: frontmatter.title,
        date: frontmatter.date,
        tags: frontmatter.tags,
      },
      content,
    } satisfies IPost;
  }
);

export async function getPostsMetadata() {
  const filetrees = await getRepoFiletree();
  if (!filetrees) return undefined;

  const files = filetrees.tree
    .map((obj) => obj.path)
    .filter((path) => {
      return path.includes('posts') && path.endsWith('.mdx');
    });

  const metadata: IPostMeta[] = [];

  for (const file of files) {
    const post = await getPostByName(file);
    if (post) {
      const { meta } = post;
      metadata.push(meta);
    }
  }

  return metadata.sort((a, b) => (a.date < b.date ? 1 : -1));
}