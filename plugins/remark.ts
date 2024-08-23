import { execSync } from "node:child_process";
//@ts-nocheck
import type { RemarkPlugins } from "astro";
import { toString as parseToString } from "mdast-util-to-string";
import getReadingTime from "reading-time";
import remarkDirective from "remark-directive";
import remarkEmoji from "remark-emoji";
import { visit } from "unist-util-visit";

type UnArray<T> = NonNullable<T extends (infer U)[] ? U : T>;
type RemarkPlugin = UnArray<import("@astrojs/markdown-remark").RemarkPlugin>;

const remarkReadingTime: RemarkPlugin = () => {
  return (tree, file) => {
    const textOnPage = parseToString(tree);
    const readingTime = getReadingTime(textOnPage);
    //@ts-expect-error
    file.data.astro.frontmatter.words = readingTime.words;
    //@ts-expect-error
    file.data.astro.frontmatter.duration = readingTime.text;
  };
};

const remarkDeruntify: RemarkPlugin = () => (tree) => {
  visit(tree, "text", (node) => {
    const wordCount = node.value.split(" ").length;

    if (wordCount >= 4) {
      node.value = node.value.replace(/ ([^ ]*)$/, "\u00A0$1");
    }
  });
};

const remarkModifiedTime: RemarkPlugin = () => (_, file) => {
  const filepath = file.history[0];
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const output = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
  //@ts-expect-error
  file.data.astro.frontmatter.updatedAt = new Date(
    output.toString().trim() || Date.now(),
  ).toISOString();
};

export const remarkPlugins: RemarkPlugins = [
  remarkDirective,
  remarkDeruntify,
  remarkReadingTime,
  remarkModifiedTime,
  [remarkEmoji, { accessible: true }],
];
