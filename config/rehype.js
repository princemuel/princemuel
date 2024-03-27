import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

/** @type {import('astro').RehypePlugins} */
export const rehypePlugins = [
  rehypeHeadingIds,
  //@ts-expect-error
  rehypeAccessibleEmojis,
  [
    rehypeAutolinkHeadings,
    {
      behavior: "append",
      properties: {
        class: "linked",
        ariaHidden: true,
        tabIndex: -1,
      },
    },
  ],
];
