import matter from "gray-matter";
import getReadingTime from "reading-time";
import slugify from "slugify";
import { stripHtml } from "string-strip-html";

import { createMarkdownProcessor } from "@astrojs/markdown-remark";

import type { AstroConfig } from "astro";

export async function md_processor(config: AstroConfig) {
  const processor = await createMarkdownProcessor(config.markdown);

  function truncate(str: string, length: number, delimiter = "...") {
    if (str.length <= length) return str;
    const lastSpace = str.slice(0, length - delimiter.length + 1).lastIndexOf(" ");
    return (
      str.slice(0, lastSpace > 0 ? lastSpace : length - delimiter.length) + delimiter
    );
  }

  return {
    //@ts-expect-error
    process: async (input) => {
      const { data: frontmatter, content } = matter(input.body);

      const { code: html, metadata } = await processor.render(content);

      const textOnPage = stripHtml(html).result;
      const readingTime = getReadingTime(textOnPage);
      const entry = {
        ...input,
        slug:
          frontmatter?.slug ?? slugify(frontmatter.title, { lower: true, trim: true }),
        description: frontmatter?.description ?? truncate(textOnPage, 150),
        body: html,
        publishedAt: frontmatter?.publishedAt
          ? new Date(frontmatter?.publishedAt)
          : (input.publishedAt ?? new Date()),
        words: readingTime.words,
        duration: readingTime.text,
      };

      console.log("ENTRY", entry);

      return { entry, body: content, metadata: { ...metadata, frontmatter } };
    },
  };
}
