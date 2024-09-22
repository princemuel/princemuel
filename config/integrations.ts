import markdoc from "@astrojs/markdoc";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import pwa from "@vite-pwa/astro";
import icon from "astro-icon";
import metaTags from "astro-meta-tags";
import tailwindConfigViewer from "astro-tailwind-config-viewer";
import {
  IconOptions,
  markdownOptions,
  PWAOptions,
  sitemapOptions,
} from "./options";

import type { AstroIntegration } from "astro";

export const integrations: AstroIntegration[] = [
  icon(IconOptions),
  markdoc(markdownOptions),
  sitemap(sitemapOptions),
  pwa(PWAOptions),
  metaTags(),
  tailwindConfigViewer({ overlayMode: "embed" }),
  partytown(),
];
