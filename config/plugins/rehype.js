import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

/** @type {import('astro').RehypePlugins} */
export const rehypePlugins = [
  rehypeHeadingIds,
  [
    rehypeAutolinkHeadings,
    {
      behavior: "wrap",
      properties: { class: "linked", ariaHidden: true, tabIndex: -1 },
    },
  ],
];
