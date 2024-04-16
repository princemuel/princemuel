import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";

const results = await (async function () {
  try {
    const posts = getCollection("posts");
    const projects = getCollection("projects");
    return Promise.all([posts, projects]);
  } catch (error) {
    return [];
  }
})();

const pages = Object.fromEntries(
  // @ts-expect-error
  results.flat(Infinity).map((entry) => [entry.slug, entry.data]),
);

export const { getStaticPaths, GET } = OGImageRoute({
  param: "route",
  pages: pages,
  getImageOptions: (_, page) => ({
    title: page.title,
    description: page.description,
    padding: 75,
  }),
});
