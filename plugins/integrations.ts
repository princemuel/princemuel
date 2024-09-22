import markdoc from "@astrojs/markdoc";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import pwa from "@vite-pwa/astro";
import type { AstroIntegration } from "astro";
import icon from "astro-icon";
import metaTags from "astro-meta-tags";
import {
  IconOptions,
  markdownOptions,
  PWAOptions,
  sitemapOptions,
} from "./options";

export const integrations: AstroIntegration[] = [
  icon(IconOptions),
  markdoc(markdownOptions),
  sitemap(sitemapOptions),
  pwa(PWAOptions),
  metaTags(),
  partytown(),
];
