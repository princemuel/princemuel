import type { SitemapOptions } from "@astrojs/sitemap";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import type { PwaOptions } from "@vite-pwa/astro";
import type { AstroExpressiveCodeOptions } from "astro-expressive-code";
import { pluginErrorPreview, pluginFirstWordRed } from "./plugins";
import { runtime_cache } from "./pwa-caching";

export const ecCodeOptions: AstroExpressiveCodeOptions = {
  themes: ["min-dark", "min-light"],
  styleOverrides: {
    borderRadius: "0.2rem",
    frames: { editorActiveTabIndicatorHeight: "2px" },
    codeFontFamily: "__FontMono",
    uiFontFamily: "__FontSans",
  },
  plugins: [
    pluginCollapsibleSections(),
    pluginLineNumbers(),
    pluginFirstWordRed(),
    pluginErrorPreview(),
  ],
  useThemedSelectionColors: false,
  themeCssSelector: (theme) => `[data-reader-theme='${theme.name}']`,
  defaultProps: { showLineNumbers: false },
};

export const sitemapOptions: SitemapOptions = {
  changefreq: "weekly",
  priority: 0.7,
  lastmod: new Date(),
  filter: (page) => !(page.includes("/api/") || page.includes(".xml")),
};

const manifest = (async function () {
  try {
    return import("../data/manifest.json").then(
      (r) => r.default,
    ) as PwaOptions["manifest"];
  } catch (error) {
    return {} as PwaOptions["manifest"];
  }
})();

export const pwaOptions: PwaOptions = {
  registerType: "autoUpdate",
  experimental: { directoryAndTrailingSlashHandler: true },
  devOptions: {
    enabled: false,
    navigateFallbackAllowlist: [/^\//],
    suppressWarnings: true,
    type: "module",
  },
  useCredentials: true,
  manifest: await manifest,
  pwaAssets: { config: true },
  workbox: {
    cleanupOutdatedCaches: true,
    maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
    clientsClaim: false,
    skipWaiting: false,
    navigationPreload: true,
    navigateFallback: "/offline",
    navigateFallbackAllowlist: [/^\/[^/]+(\/|$)/i],
    navigateFallbackDenylist: [
      /\.(?:png|gif|jpg|jpeg|webp|avif|svg|ico)$/iu,
      /\.(?:ttf|otf|woff|woff2)$/iu,
      /\.(?:css|js)$/iu,
      /^\/api\//iu,
      /\/sw\.js$/iu,
      /\.(?:pdf|mp4|webm|ogg|mp3|wav)$/iu,
    ],
    runtimeCaching: runtime_cache,
  },
};
