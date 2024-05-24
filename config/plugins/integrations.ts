import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import qwik from "@qwikdev/astro";
import { astroExpressiveCode as ec } from "astro-expressive-code";
// import htmx from "astro-htmx";
import pwa from "@vite-pwa/astro";
import type { AstroIntegration } from "astro";
import icon from "astro-icon";
import {
  CodeOptions,
  IconOptions,
  PWAOptions,
  sitemapOptions,
} from "./options";

export type TIconOptions = NonNullable<Parameters<typeof icon>[0]>;

export const integrations: AstroIntegration[] = [
  tailwind({ applyBaseStyles: false, nesting: true }),
  icon(IconOptions),
  ec(CodeOptions),
  mdx(),
  qwik({ include: "**/qwik/*" }),
  sitemap(sitemapOptions),
  pwa(PWAOptions),
  // htmx(),
];
