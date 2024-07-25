// @ts-nocheck
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import qwik from "@qwikdev/astro";
import pwa from "@vite-pwa/astro";
import type { AstroIntegration } from "astro";
import expressiveCode from "astro-expressive-code";
import htmx from "astro-htmx";
import icon from "astro-icon";
import metaTags from "astro-meta-tags";
import { IconOptions, PWAOptions, sitemapOptions } from "./options";

export type TIconOptions = NonNullable<Parameters<typeof icon>[0]>;

export const integrations: AstroIntegration[] = [
  tailwind({ applyBaseStyles: false }),
  icon(IconOptions),
  qwik(),
  htmx(),
  expressiveCode(),
  mdx({ gfm: true, extendMarkdownConfig: true }),
  sitemap(sitemapOptions),
  pwa(PWAOptions),
  metaTags(),
];
