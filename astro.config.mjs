import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./plugins/remark";
import IconSpritePlugin from "./plugins/sprites";

// https://astro.build/config
export default defineConfig({
  site:
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://princemuel.vercel.app",
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
    shikiConfig: {
      experimentalThemes: { light: "github-light", dark: "github-dark" },
    },
    remarkPlugins: [remarkReadingTime],
  },
  integrations: [
    sitemap({ changefreq: "daily", priority: 0.7 }),
    tailwind({ applyBaseStyles: false, nesting: true }),
    react({ include: ["**/react/*"] }),
    mdx({ extendMarkdownConfig: true }),
  ],
});
