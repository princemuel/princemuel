import { getSortedPosts } from "@/lib/utils";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  const resources = await getSortedPosts();

  return rss({
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
      media: "http://search.yahoo.com/mrss/",
    },
    title: "Prince Muel | Blog RSS Feed",
    description:
      "My Personal Website scaffolded with Astro. If you subscribe to this RSS feed you will receive updates and summaries of my new posts",
    site: new URL("/", context.site),
    items: (resources ?? []).map((item) => {
      return {
        title: item.data.title,
        description: item.data.description,
        link: `/blog/${item.slug}/`,
        pubDate: item.data.publishedAt,
        categories: item.data.tags,
        commentsUrl: "https://github.com/princemuel/webapp/discussions",
        customData: `<media:content
        type="image/${item.data.media?.cover?.format == "jpg" ? "jpeg" : "png"}"
        width="${item.data.media?.cover?.width}"
        height="${item.data.media?.cover?.height}"
        medium="image"
        url="${context.site}${item.data.media?.cover?.src || ""}" />
    `,
      };
    }),
    customData: `<atom:link href="${context.site}rss.xml" rel='self'
    type='application/rss+xml' xmlns:atom='http://www.w3.org/2005/Atom'
    xmlns:content='http://purl.org/rss/1.0/modules/content/'></atom:link>`,
    stylesheet: "/styles.xsl",
  });
};
