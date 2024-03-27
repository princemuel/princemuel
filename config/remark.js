import { toString } from "mdast-util-to-string";
import { execSync } from "node:child_process";
import getReadingTime from "reading-time";
import remarkToc from "remark-toc";
import { visit } from "unist-util-visit";

function remarkReadingTime() {
  return function (tree, file) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    file.data.astro.frontmatter.words = readingTime.words;
    file.data.astro.frontmatter.duration = readingTime.text;
  };
}

function remarkDeruntify() {
  function transformer(tree) {
    visit(tree, "text", function (node) {
      const wordCount = node.value.split(" ").length;

      if (wordCount >= 4) {
        node.value = node.value.replace(/ ([^ ]*)$/, "\u00A0$1");
      }
    });
  }

  return transformer;
}

function remarkModifiedTime() {
  return function (tree, file) {
    const filepath = file.history[0];
    const output = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
    file.data.astro.frontmatter.updatedAt = output.toString();
  };
}

/** @type {import('astro').RemarkPlugins} */
export const remarkPlugins = [
  remarkDeruntify,
  remarkReadingTime,
  remarkModifiedTime,
  remarkToc,
];
