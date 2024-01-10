import { transformerNotationDiff, transformerNotationHighlight } from "shikiji-transformers";

/** @type {import('rehype-pretty-code').Options} */
export const rehypePrettyCodeOptions = {
  grid: true,
  theme: { light: "github-light", dark: "github-dark" },
  keepBackground: true,
  defaultLang: {
    block: "plaintext",
    inline: "plaintext",
  },
  transformers: [transformerNotationDiff, transformerNotationHighlight],

  // onVisitHighlightedLine(node) {
  //   node.properties.className.push("line--highlighted");
  // },
};
