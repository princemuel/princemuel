import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import pwa from "@vite-pwa/astro";
import type { AstroIntegration } from "astro";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import metaTags from "astro-meta-tags";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import { IconOptions, PWAOptions, sitemapOptions } from "./plugins/options";
import { rehypePlugins } from "./plugins/rehype";
import { remarkPlugins } from "./plugins/remark";

const integrations: AstroIntegration[] = [
  icon(IconOptions),
  expressiveCode(),
  mdx({ gfm: true, extendMarkdownConfig: true }),
  sitemap(sitemapOptions),
  pwa(PWAOptions),
  tailwind({ applyBaseStyles: false }),
  metaTags(),
  partytown(),
];

const mode = process.env.NODE_ENV ?? "production";
const envVars = loadEnv(mode, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  srcDir: "./app",
  site: envVars.PUBLIC_SITE_URL,
  experimental: {
    actions: true,
    globalRoutePriority: true,
    contentCollectionCache: true,
    serverIslands: true,
    contentIntellisense: true,
    contentLayer: true,
    directRenderScript: true,
  },
  security: { checkOrigin: true },
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: remarkPlugins,
    rehypePlugins: rehypePlugins,
  },
  integrations: integrations,
  adapter: vercel({
    edgeMiddleware: true,
    functionPerRoute: false,
    imageService: true,
    webAnalytics: { enabled: envVars.NODE_ENV === "production" },
  }),
});
