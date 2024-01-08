import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import rehypeShikiji from "rehype-shikiji";
import { loadEnv } from "vite";
import { remarkDeruntify, remarkModifiedTime, remarkReadingTime } from "./plugins/remark";
import IconSpritePlugin from "./plugins/sprites";

// import { transformerNotationDiff, transformerNotationHighlight } from "shikiji-transformers";

/** @type {import('rehype-pretty-code').Options} */
export const rehypePrettyCodeOptions = {
  grid: true,
  // theme: { light: "github-light", dark: "github-dark" },
  // keepBackground: true,
  // defaultLang: {
  //   block: "plaintext",
  //   inline: "plaintext",
  // },
  // transformers: [transformerNotationDiff, transformerNotationHighlight],

  // onVisitHighlightedLine(node) {
  //   node.properties.className.push("line--highlighted");
  // },
};

const { BASE_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
// https://astro.build/config
export default defineConfig({
  site: BASE_URL ?? "https://princemuel.vercel.app",
  output: "hybrid",
  adapter: vercel({
    output: "hybrid",
    functionPerRoute: false,
    imageService: true,
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
  }),
  experimental: { contentCollectionCache: true },
  vite: { plugins: [IconSpritePlugin()] },
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      experimentalThemes: { light: "github-light", dark: "github-dark" },
    },
  },
  integrations: [
    sitemap({ changefreq: "daily", priority: 0.7 }),
    tailwind({ applyBaseStyles: false, nesting: true }),
    react({ include: ["**/react/*"] }),
    mdx({
      extendMarkdownConfig: true,
      remarkPlugins: [remarkDeruntify, remarkReadingTime, remarkModifiedTime],
      rehypePlugins: [rehypeShikiji],
    }),
  ],
});

// { theme: { light: "github-light", dark: "github-dark" }
