import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import pwa from "@vite-pwa/astro";
import autoImport from "astro-auto-import";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import twDefaultTheme from "tailwindcss/defaultTheme";
import { importConfig } from "./components";

import icons from "./icons.json";
import manifest from "./manifest.json";
import twConfig from "./tailwind.json";

import type { SitemapOptions } from "@astrojs/sitemap";
import type { PwaOptions } from "@vite-pwa/astro";
import type { AstroIntegration } from "astro";
import type { AstroExpressiveCodeOptions } from "astro-expressive-code";
type TIconOptions = NonNullable<Parameters<typeof icon>[0]>;

const IconOptions: TIconOptions = {
  iconDir: "app/assets/icons",
  include: icons,
};

const sitemapOptions: SitemapOptions = {
  changefreq: "weekly",
  priority: 0.7,
  lastmod: new Date(),
  filter: (page) => !(page.includes("/api/") || page.includes(".xml")),
};

// const markdownOptions: MarkdocIntegrationOptions = {};

const PWAOptions: PwaOptions = {
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

const ecConfigOptions: AstroExpressiveCodeOptions = {
  themes: ["github-dark-high-contrast", "github-light-high-contrast"],
  styleOverrides: {
    codeFontFamily: [
      twConfig.theme.fontFamily.mono,
      ...twDefaultTheme.fontFamily.mono,
    ].join(","),
    uiFontFamily: [
      twConfig.theme.fontFamily.sans,
      ...twDefaultTheme.fontFamily.sans,
    ].join(","),
  },
  plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
  useThemedSelectionColors: false,
  themeCssSelector: (theme) => `[data-reader-theme='${theme.name}']`,
  defaultProps: { showLineNumbers: false },
};

export const integrations: AstroIntegration[] = [
  icon(IconOptions),
  // markdoc(markdownOptions),
  autoImport(importConfig),
  expressiveCode(ecConfigOptions),
  mdx({ gfm: true, extendMarkdownConfig: true }),
  sitemap(sitemapOptions),
  pwa(PWAOptions),
  partytown(),
];
