import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import pwa from "@vite-pwa/astro";
import auto_import from "astro-auto-import";
import ec_code from "astro-expressive-code";
import icon from "astro-icon";

import { import_options } from "./components";
import icons from "./icons.json";
import manifest from "./manifest.json";

import type { SitemapOptions } from "@astrojs/sitemap";
import type { PwaOptions } from "@vite-pwa/astro";
import type { AstroIntegration } from "astro";
import type { AstroExpressiveCodeOptions as CodeOptions } from "astro-expressive-code";
import { fonts } from "./fonts.mjs";
type TIconOptions = NonNullable<Parameters<typeof icon>[0]>;

const icon_options: TIconOptions = {
  iconDir: "app/assets/icons",
  include: icons,
};

const sitemap_options: SitemapOptions = {
  changefreq: "weekly",
  priority: 0.7,
  lastmod: new Date(),
  filter: (page) => !(page.includes("/api/") || page.includes(".xml")),
};

const pwa_options: PwaOptions = {
  registerType: "prompt",
  pwaAssets: { disabled: false, config: true, overrideManifestIcons: true },
  experimental: { directoryAndTrailingSlashHandler: true },
  manifest: manifest as PwaOptions["manifest"],
  devOptions: { enabled: false, suppressWarnings: true, type: "module" },
  workbox: {
    cleanupOutdatedCaches: true,
    clientsClaim: true,
    // navigateFallback: "/offline",
    // globPatterns: [
    //   "**/*.{css,js,jpg,jpeg,png,gif,webp,svg,ico,woff,woff2,ttf,eot}",
    // ],
    // navigateFallbackAllowlist: [/^\/api\/v\d+\/.*$/iu],
    // navigateFallbackDenylist: [
    //   /\.(?:png|gif|jpg|jpeg|webp|avif|svg|ico)$/iu,
    //   /\.(?:ttf|otf|woff|woff2)$/iu,
    //   /\.(?:css|js)$/iu,
    //   /\/sw\.js$/iu,
    //   /\.(?:pdf|mp4|webm|ogg|mp3|wav)$/iu,
    // ],
    // runtimeCaching: cachePreset,
  },
};

const code_options: CodeOptions = {
  styleOverrides: {
    codeFontFamily: fonts.mono.join(","),
    uiFontFamily: fonts.sans.join(","),
  },
};
export const integrations = [
  icon(icon_options),
  ec_code(code_options),
  auto_import(import_options),
  mdx({ gfm: true, extendMarkdownConfig: true }),
  sitemap(sitemap_options),
  pwa(pwa_options),
  partytown(),
] as AstroIntegration[];
