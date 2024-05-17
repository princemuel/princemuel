import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import type { RehypePlugins } from "astro";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export const rehypePlugins: RehypePlugins = [
  rehypeHeadingIds,
  [
    rehypeAutolinkHeadings,
    {
      behavior: "wrap",
      properties: { class: "linked", ariaHidden: true, tabIndex: -1 },
    },
  ],
];
