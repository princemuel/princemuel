// @ts-nocheck
import type { RemarkPlugins } from "astro";
import { toString } from "mdast-util-to-string";
import { execSync } from "node:child_process";
import getReadingTime from "reading-time";
import remarkDirective from "remark-directive";
import remarkEmoji from "remark-emoji";
import { visit } from "unist-util-visit";

type UnArray<T> = NonNullable<T extends (infer U)[] ? U : T>;
type RemarkPlugin = UnArray<import("@astrojs/markdown-remark").RemarkPlugin>;

const remarkReadingTime: RemarkPlugin = () => {
  return function (tree, file) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    file.data.astro.frontmatter.words = readingTime.words;
    file.data.astro.frontmatter.duration = readingTime.text;
  };
};

const remarkDeruntify: RemarkPlugin = () =>
  function (tree) {
    visit(tree, "text", function (node) {
      const wordCount = node.value.split(" ").length;

      if (wordCount >= 4) {
        node.value = node.value.replace(/ ([^ ]*)$/, "\u00A0$1");
      }
    });
  };

const remarkModifiedTime: RemarkPlugin = () =>
  function (_, file) {
    const filepath = file.history[0];
    const output = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
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
