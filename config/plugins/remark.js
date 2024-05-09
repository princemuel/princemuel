// @ts-nocheck
import { toString } from "mdast-util-to-string";
import { execSync } from "node:child_process";
import getReadingTime from "reading-time";
import remarkEmoji from "remark-emoji";
import { visit } from "unist-util-visit";

/** @type {import('@astrojs/markdown-remark').RemarkPlugin} */
function remarkReadingTime() {
  return function (tree, file) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    file.data.astro.frontmatter.words = readingTime.words;
    file.data.astro.frontmatter.duration = readingTime.text;
  };
}
/** @type {import('@astrojs/markdown-remark').RemarkPlugin} */
function remarkDeruntify() {
  return function (tree) {
    visit(tree, "text", function (node) {
      const wordCount = node.value.split(" ").length;

      if (wordCount >= 4) {
        node.value = node.value.replace(/ ([^ ]*)$/, "\u00A0$1");
      }
    });
  };
}

/** @type {import('@astrojs/markdown-remark').RemarkPlugin} */
function remarkModifiedTime() {
  return function (_, file) {
    const filepath = file.history[0];
    const output = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
    file.data.astro.frontmatter.updatedAt = new Date(
      output.toString().trim() || Date.now(),
    ).toISOString();
  };
}

/** @type {import('astro').RemarkPlugins} */
export const remarkPlugins = [
  remarkDeruntify,
  remarkReadingTime,
  remarkModifiedTime,
  // remarkToc,
  [remarkEmoji, { accessible: true }],
];
