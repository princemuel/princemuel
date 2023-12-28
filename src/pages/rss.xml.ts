import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

type PostData = { data: { publishedAt: Date } };

const compareFnPosts = (a: PostData, b: PostData) =>
  Number(b.data.publishedAt) - Number(a.data.publishedAt);

const formatDate = (date: Date) => {
  date.setUTCHours(0);
  return date;
};

export const GET: APIRoute = async (context) => {
  // const posts = await getCollection("posts");

  return rss({
    title: "Prince Muel | Blog",
    description: "My journey learning Astro",
    site: new URL("/", context.site),
    items: [],
    // items: posts.map((item) => ({
    //   title: item.data.title,
    //   description: item.data.description,
    //   link: `/posts/${item.slug}/`,
    //   pubDate: item.data.publishedAt,
    // })),
    customData: `<language>en-US</language>`,
    stylesheet: "/styles.xsl",
  });
};

// export const GET: APIRoute = async (context) => {
// 	const unsortedPosts = [...(await getCollection("blog")), ...(await getCollection("caseStudies"))]
// 	const posts = unsortedPosts.sort((a, b) => sortPosts(a, b))

// 	return rss({
// 		// The RSS Feed title, description, and custom metadata.
// 		title: "The Astro Blog",
// 		// See "Styling" section below
// 		description: "News and updates about Astro.",
// 		site: context.site!.href,
// 		// The list of items for your RSS feed, sorted.
// 		items: posts.map((item) => ({
// 			title: item.data.title,
// 			description: item.data.description,
// 			link: "isCaseStudy" in item.data ? `/case-studies/${item.slug}` : `/blog/${item.slug}/`,
// 			pubDate: formatDate(item.data.publishDate),
// 		})),
// 	})
// }
