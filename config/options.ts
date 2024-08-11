import type { SitemapOptions } from "@astrojs/sitemap";
import type { PwaOptions } from "@vite-pwa/astro";
import type { TIconOptions } from "./integrations.js";

export const IconOptions: TIconOptions = {
  iconDir: "app/assets/icons",
  include: {
    lucide: [
      "badge-check",
      "bar-chart",
      "briefcase-business",
      "clock-4",
      "home",
      "library",
      "pen-line",
      "mail-plus",
      "moon-star",
      "move-right",
      "notebook-pen",
      "rss",
      "square-user",
      "sun",
    ],
    logos: ["astro-icon"],
    mdi: [
      "discord",
      "email-outline",
      "github",
      "instagram",
      "linkedin",
      "youtube",
    ],
    ri: ["price-tag-3-fill", "quill-pen-fill"],
  },
};

export const sitemapOptions: SitemapOptions = {
  changefreq: "weekly",
  priority: 0.7,
  lastmod: new Date(),
  filter: (page) => !(page.includes("/api/") || page.includes(".xml")),
};

const manifest = (function () {
  type ManifestPromise = Promise<PwaOptions["manifest"]>;
  try {
    return import("./manifest.json").then((r) => r.default) as ManifestPromise;
  } catch (error) {
    return {} as ManifestPromise;
  }
})();

export const PWAOptions: PwaOptions = {
  registerType: "autoUpdate",
  pwaAssets: { disabled: false, config: true, overrideManifestIcons: true },
  experimental: { directoryAndTrailingSlashHandler: true },
  manifest: await manifest,
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
