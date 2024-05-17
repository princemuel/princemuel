import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import qwik from "@qwikdev/astro";
import { astroExpressiveCode as ec } from "astro-expressive-code";
// import htmx from "astro-htmx";
import pwa from "@vite-pwa/astro";
import type { AstroIntegration } from "astro";
import icon from "astro-icon";
import { ecCodeOptions, pwaOptions, sitemapOptions } from "./options";

export const integrations: AstroIntegration[] = [
  tailwind({ applyBaseStyles: false, nesting: true }),
  icon({ iconDir: "src/assets/icons", include: { lucide: ["*"] } }),
  ec(ecCodeOptions),
  mdx(),
  qwik({ include: "**/qwik/*" }),
  sitemap(sitemapOptions),
  pwa(pwaOptions),
  // htmx(),
];
