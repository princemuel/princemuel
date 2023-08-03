import { HEADING_LINK_ANCHOR } from '@/config';
import { compileMDX } from 'next-mdx-remote/rsc';
import { cache } from 'react';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
import 'server-only';
import { components } from './mdx';
import { codeBlockClasses, codeBlockOptions } from './plugins';

/**
 * =============================================================
 * Get The Metadata For A Particular Resource
 * =============================================================
 */
export const fetchResourceMeta = cache(
  async (resource: ResourceType, callback?: Callback<ResourceMeta>) => {
    const slugs = await fetchAllSlugs(resource);
    const metadata: ResourceMeta[] = [];

    const results = await Promise.allSettled(
      (slugs || []).map(async (slug) => {
        const data = await fetchResource(resource)(slug);
        if (!data) return null;
        return await parse_mdx(data, slug);
      })
    );

    for (const result of results) {
      if (result.status === 'fulfilled' && result?.value != null) {
        if (callback) callback(result?.value?.meta);
        else metadata.push(result?.value?.meta);
      }
    }

    return metadata.sort((resourceA, resourceB) =>
      resourceA.publishedAt < resourceB.publishedAt ? 1 : -1
    );
  }
);

/**
 * =============================================================
 * Get The File And Folder Contents Of A Github Repository
 * =============================================================
 */
export const fetchResource = cache((resource: ResourceType) =>
  cache(async (slug: string) => {
    const url = `https://raw.githubusercontent.com/${process.env.REPO_PATH}/main/${resource}/${slug}`;

    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': `${process.env.GITHUB_API_VERSION}`,
      },
    });
    if (!response.ok) return null;

    const content = await response.text();
    if (content === '404: Not Found') return null;

    return content;
  })
);

/**
 * =============================================================
 * Parse and Transform The Markdown Contents Received
 * =============================================================
 */
export const parse_mdx = async <T extends Resource>(
  data: string,
  slug: string
): Promise<T> => {
  const result = await compileMDX<ResourceMeta>({
    source: data,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [[remarkGfm], [remarkUnwrapImages]],
        rehypePlugins: [
          [rehypeSlug],
          [rehypePrettyCode, codeBlockOptions],
          [codeBlockClasses],
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
              properties: {
                className: [HEADING_LINK_ANCHOR],
              },
            },
          ],
        ],
      },
    },
  });

  return {
    meta: {
      ...result?.frontmatter,
      id: slug.replace(/\.mdx?$/, ''),
      readtime: Math.ceil(readingTime(data).minutes),
    },
    content: result?.content,
  } as T;
};

/**
 * =============================================================
 * Get All The Slugs For A Particular Resource
 * =============================================================
 */
export const fetchAllSlugs = cache(async (resource: ResourceType) => {
  const filetrees = await getRepoFiletree();
  if (!filetrees) return null;

  const path_regex = new RegExp(`${resource}/`);

  return filetrees.tree
    .map((obj) => obj.path)
    .filter((path) => {
      return path.includes(resource) && path.endsWith('.mdx');
    })
    .map((path) => path.replace(path_regex, ''));
});

/**
 * =============================================================
 * Get The File And Folder Contents Of A Github Repository
 * =============================================================
 */
export async function getRepoFiletree() {
  const response = await fetch(
    `https://api.github.com/repos/${process.env.REPO_PATH}/git/trees/main?recursive=1`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': `${process.env.GITHUB_API_VERSION}`,
      },
    }
  );
  if (!response.ok) return null;

  return (await response.json()) as RepoFiletree;
}
