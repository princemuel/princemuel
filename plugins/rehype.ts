import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeSectionHeadings from "@maxmmyron/rehype-section-headings";
import type { RehypePlugins } from "astro";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export const rehypePlugins: RehypePlugins = [
  rehypeHeadingIds,
  [
    rehypeSectionHeadings,
    { sectionDataAttribute: "data-id", maxHeadingRank: 2 },
  ],
  [
    rehypeAutolinkHeadings,
    { behavior: "wrap", properties: { class: "linked" } },
    // properties: { class: "linked", ariaHidden: "", tabIndex: -1 },
  ],
];
