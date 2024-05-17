import type { VitePWAOptions } from "vite-plugin-pwa";

type UnArray<T> = NonNullable<T extends (infer U)[] ? U : T>;

type RuntimeCaching = UnArray<VitePWAOptions["workbox"]["runtimeCaching"]>;

const pages: RuntimeCaching = {
  urlPattern: ({ url }) =>
    url.origin === location.origin &&
    !/\.(?:png|gif|jpg|jpeg|webp|avif|svg|ico|ttf|woff2|js|json|xml|xsl|webmanifest|css)$/iu.test(
      url.pathname,
    ),
  handler: "NetworkFirst",
  options: {
    cacheName: "x-pwa-pages-cache",
    expiration: {
      maxAgeSeconds: 60 * 60 * 24,
      maxEntries: 100,
    },
    cacheableResponse: {
      statuses: [0, 200],
    },
  },
};

const assets: RuntimeCaching = {
  urlPattern: ({ url }) =>
    url.origin === location.origin &&
    /\.(?:png|gif|jpg|jpeg|webp|avif|svg|ico|ttf|woff2)$/iu.test(url.pathname),
  handler: "CacheFirst",
  options: {
    cacheName: "x-pwa-assets-cache",
    expiration: {
      maxAgeSeconds: 60 * 60 * 24 * 30 * 12,
      maxEntries: 500,
    },
    rangeRequests: true,
    cacheableResponse: { statuses: [0, 200] },
  },
};

const scripts: RuntimeCaching = {
  urlPattern: ({ url }) =>
    url.origin === location.origin &&
    /\.(?:js|json|xml|xsl|webmanifest|css)$/iu.test(url.pathname),
  handler: "StaleWhileRevalidate",
  options: {
    cacheName: "x-pwa-scripts-cache",
    expiration: {
      maxAgeSeconds: 60 * 60 * 24,
      maxEntries: 100,
    },
    cacheableResponse: {
      statuses: [0, 200],
    },
    backgroundSync: {
      name: "scripts-sync",
      options: {
        maxRetentionTime: 60 * 60 * 24,
      },
    },
  },
};

const external: RuntimeCaching = {
  urlPattern: ({ url }) => url.origin !== location.origin,
  handler: "NetworkFirst",
};

export const runtime_cache = [
  external,
  assets,
  scripts,
  pages,
] as RuntimeCaching[];
