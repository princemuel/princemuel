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
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    title: "Prince Muel | Blog RSS Feed",
    description:
      "My journey learning Astro. If you subscribe to this RSS feed you will receive updates and summaries of my new posts",
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

const str = `<atom:link href='https://princemuel.vercel.app/rss.xml' rel='self' type='application/rss+xml' xmlns:atom='http://www.w3.org/2005/Atom' xmlns:content='http://purl.org/rss/1.0/modules/content/'></atom:link>`;

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
//     commentsUrl: "https://github.com/princemuel/webapp/discussions",
// 			link: "isCaseStudy" in item.data ? `/case-studies/${item.slug}` : `/blog/${item.slug}/`,
// 			pubDate: formatDate(item.data.publishDate),
// 		})),
// 	})
// }
