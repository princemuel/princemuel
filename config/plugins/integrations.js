import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import qwik from "@qwikdev/astro";
import { astroExpressiveCode as ec } from "astro-expressive-code";
import htmx from "astro-htmx";
import icon from "astro-icon";
import simpleStackStream from "simple-stack-stream";
import { ecCodeOptions, sitemapOptions } from "./options";

/** @type {import('astro').AstroConfig['integrations']} */
export const integrations = [
  tailwind({ applyBaseStyles: false, nesting: true }),
  icon({ iconDir: "src/assets/icons", include: { lucide: ["*"] } }),
  ec(ecCodeOptions),
  mdx(),
  qwik({ include: "**/qwik/*" }),
  sitemap(sitemapOptions),
  htmx(),
  simpleStackStream(),
];
