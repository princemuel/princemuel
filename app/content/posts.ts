// import { YoutubePlayer } from '@/components';
// import { compileMDX } from 'next-mdx-remote/rsc';
// import { cache } from 'react';
// import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib';
// import rehypeHighlight from 'rehype-highlight/lib';
// import rehypeSlug from 'rehype-slug';
// // import 'server-only';
// import { REPO_PATH } from './constants';
// import { getRepoFiletree } from './filetree';

// export const preloadPost = (slug: string) => {
//   void getPostBySlug(slug);
// };

// export const preloadPostsMeta = () => {
//   void getPostsMetadata();
// };

// export const getPostBySlug = cache(
//   async (slug: string): Promise<IPost | null> => {
//     const res = await fetch(
//       `https://raw.githubusercontent.com/${REPO_PATH}/main/posts/${slug}`,
//       {
//         headers: {
//           Accept: 'application/vnd.github+json',
//           Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
//           'X-GitHub-Api-Version': '2022-11-28',
//         },
//       }
//     );

//     if (!res.ok) return null;

//     const data = await res.text();
//     if (data === '404: Not Found') return null;

//     const { frontmatter, content } = await compileMDX<IPostMeta>({
//       source: data,
//       components: {
//         YoutubePlayer,
//       },
//       options: {
//         parseFrontmatter: true,
//         mdxOptions: {
//           rehypePlugins: [
//             rehypeHighlight,
//             rehypeSlug,
//             [
//               rehypeAutolinkHeadings,
//               {
//                 behavior: 'wrap',
//               },
//             ],
//           ],
//         },
//       },
//     });

//     const id = slug.replace(/\.mdx$/, '');
//     return {
//       meta: {
//         id,
//         title: frontmatter.title,
//         date: frontmatter.date,
//         tags: frontmatter.tags,
//       },
//       content,
//     } satisfies IPost;
//   }
// );

// export const getPostsMetadata = cache(async () => {
//   const filetrees = await getRepoFiletree();
//   if (!filetrees) return null;

//   const files = filetrees.tree
//     .map((obj) => obj.path)
//     .filter((path) => {
//       return path.includes('posts') && path.endsWith('.mdx');
//     });

//   const metadata: IPostMeta[] = [];

//   for (const file of files) {
//     const post = await getPostBySlug(file);
//     if (post) {
//       const { meta } = post;
//       metadata.push(meta);
//     }
//   }

//   return metadata.sort((a, b) => (a.date < b.date ? 1 : -1));
// });

export {};
