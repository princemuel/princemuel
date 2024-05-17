import type { SitemapOptions } from "@astrojs/sitemap";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import type { PwaOptions } from "@vite-pwa/astro";
import type { AstroExpressiveCodeOptions } from "astro-expressive-code";
import { pluginErrorPreview, pluginFirstWordRed } from "./plugins";
import { runtime_cache } from "./pwa-caching";

export const ecCodeOptions: AstroExpressiveCodeOptions = {
  themes: ["vitesse-black"],
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
  minify: true,
  includeAssets: ["/favicon.svg"],
  experimental: { directoryAndTrailingSlashHandler: true },
  devOptions: { enabled: true, suppressWarnings: true, type: "module" },
  manifest: await manifest,
  pwaAssets: { config: true },
  workbox: {
    maximumFileSizeToCacheInBytes: 1024 * 2048,
    cleanupOutdatedCaches: true,
    clientsClaim: true,
    skipWaiting: true,
    navigateFallback: "/offline",
    navigateFallbackDenylist: [/\.(?:png|gif|jpg|jpeg|avif|webp|svg|ico)$/iu],
    directoryIndex: "index.html",
    runtimeCaching: runtime_cache,
  },
};
