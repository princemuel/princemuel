import type { SitemapOptions } from "@astrojs/sitemap";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import type { PwaOptions } from "@vite-pwa/astro";
import type { AstroExpressiveCodeOptions } from "astro-expressive-code";
import type { TIconOptions } from "./integrations";

export const IconOptions: TIconOptions = {
  iconDir: "src/assets/icons",
  include: { lucide: ["*"], logos: ["*"], mdi: ["*"] },
};

export const CodeOptions: AstroExpressiveCodeOptions = {
  themes: ["material-theme-ocean", "material-theme-lighter"],
  styleOverrides: {
    borderRadius: "0.3rem",
    frames: { editorActiveTabIndicatorHeight: "2px" },
    codeFontFamily: "__FontMono",
    uiFontFamily: "__FontSans",
  },
  plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
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
    return import("./manifest.json").then(
      (r) => r.default,
    ) as PwaOptions["manifest"];
  } catch (error) {
    return {} as PwaOptions["manifest"];
  }
})();

export const PWAOptions: PwaOptions = {
  strategies: "generateSW",
  registerType: "autoUpdate",
  injectRegister: false,
  pwaAssets: { disabled: false, config: true },
  manifest: await manifest,
  workbox: {
    cleanupOutdatedCaches: true,
    clientsClaim: true,
    offlineGoogleAnalytics: true,
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
  experimental: { directoryAndTrailingSlashHandler: true },
  devOptions: { enabled: true, suppressWarnings: true, type: "module" },
};
