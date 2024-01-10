import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import remarkToc from "remark-toc";
import { loadEnv } from "vite";
import { rehypePrettyCodeOptions } from "./plugins/rehype";
import { remarkDeruntify, remarkModifiedTime, remarkReadingTime } from "./plugins/remark";
import { IconSpritePlugin } from "./plugins/rest";

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
    syntaxHighlight: false,
    remarkPlugins: [remarkDeruntify, remarkReadingTime, remarkModifiedTime, remarkToc],
    rehypePlugins: [
      rehypeHeadingIds,
      [rehypePrettyCode, rehypePrettyCodeOptions],
      [rehypeAutolinkHeadings, { behavior: "prepend" }],
      rehypeAccessibleEmojis,
    ],
  },
  integrations: [
    mdx(),
    sitemap({ changefreq: "daily", priority: 0.7 }),
    tailwind({ applyBaseStyles: false, nesting: true }),
    react({ include: ["**/react/*"] }),
  ],
});
