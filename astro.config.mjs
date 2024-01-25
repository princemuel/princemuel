import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import pwa from "@vite-pwa/astro";
import ec from "astro-expressive-code";
import { defineConfig } from "astro/config";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkToc from "remark-toc";
import { loadEnv } from "vite";
import {
  codeBlockOptions,
  remarkDeruntify,
  remarkModifiedTime,
  remarkReadingTime,
} from "./plugins";

const envVars = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  site: envVars.PUBLIC_SITE_URL,
  output: "hybrid",
  adapter: vercel({
    output: "hybrid",
    edgeMiddleware: true,
    functionPerRoute: false,
    imageService: true,
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
  }),
  experimental: {
    globalRoutePriority: true,
    contentCollectionCache: true,
  },
  vite: { plugins: [] },
  markdown: {
    remarkPlugins: [remarkDeruntify, remarkReadingTime, remarkModifiedTime, remarkToc],
    rehypePlugins: [
      rehypeHeadingIds,
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
    ],
  },
  integrations: [
    pwa({
      registerType: "autoUpdate",
      includeAssets: ["/favicon.svg"],
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
    }),
    ec(codeBlockOptions),
    mdx({ optimize: true }),
    tailwind({ applyBaseStyles: false, nesting: true }),
    react({ include: ["**/react/*"] }),
    sitemap({
      changefreq: "daily",
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !(page.includes("/api/") || page.includes(".xml")),
    }),
  ],
});
