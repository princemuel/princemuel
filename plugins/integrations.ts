import database from "@astrojs/db";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import webVitals from "@astrojs/web-vitals";
import pwa from "@vite-pwa/astro";
import type { AstroIntegration } from "astro";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import metaTags from "astro-meta-tags";
import { IconOptions, PWAOptions, sitemapOptions } from "./options";

export const integrations: AstroIntegration[] = [
  icon(IconOptions),
  expressiveCode(),
  mdx({ gfm: true, extendMarkdownConfig: true }),
  sitemap(sitemapOptions),
  pwa(PWAOptions),
  tailwind({ applyBaseStyles: false }),
  // @ts-expect-error
  database(),
  webVitals(),
  metaTags(),
  partytown(),
];
