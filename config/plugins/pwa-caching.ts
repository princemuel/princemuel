import type { VitePWAOptions } from "vite-plugin-pwa";

type UnArray<T> = NonNullable<T extends (infer U)[] ? U : T>;

type RuntimeCaching = UnArray<VitePWAOptions["workbox"]["runtimeCaching"]>;

const pages: RuntimeCaching = {
  urlPattern: ({ request, sameOrigin }) =>
    sameOrigin && request.destination === "document",
  handler: "NetworkFirst",
  options: {
    cacheName: "x-pwa-pages-cache",
    expiration: { maxEntries: 100, maxAgeSeconds: 7 * 24 * 60 * 60 },
    cacheableResponse: { statuses: [0, 200] },
  },
};

const stylesheets: RuntimeCaching = {
  urlPattern: ({ request, sameOrigin }) =>
    sameOrigin &&
    (request.destination === "style" || request.destination === "xslt"),
  handler: "CacheFirst",
  options: {
    cacheName: "x-pwa-stylesheets-cache",
    expiration: { maxEntries: 20, maxAgeSeconds: 30 * 24 * 60 * 60 },
    cacheableResponse: { statuses: [0, 200] },
  },
};

const assets: RuntimeCaching = {
  urlPattern: ({ url, sameOrigin }) =>
    sameOrigin && /\.(?:txt|json)$/iu.test(url.pathname),
  handler: "CacheFirst",
  options: {
    cacheName: "x-pwa-assets-cache",
    expiration: { maxEntries: 20, maxAgeSeconds: 30 * 24 * 60 * 60 },
    cacheableResponse: { statuses: [0, 200] },
  },
};

const images: RuntimeCaching = {
  urlPattern: ({ request, sameOrigin }) =>
    sameOrigin && request.destination === "image",
  handler: "CacheFirst",
  options: {
    cacheName: "x-pwa-images-cache",
    expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
    cacheableResponse: { statuses: [0, 200] },
  },
};

const fonts: RuntimeCaching = {
  urlPattern: ({ request, sameOrigin }) =>
    sameOrigin && request.destination === "font",
  handler: "CacheFirst",
  options: {
    cacheName: "x-pwa-fonts-cache",
    expiration: { maxEntries: 10, maxAgeSeconds: 365 * 24 * 60 * 60 },
    cacheableResponse: { statuses: [0, 200] },
  },
};

const manifest: RuntimeCaching = {
  urlPattern: ({ request, sameOrigin }) =>
    sameOrigin && request.destination === "manifest",
  handler: "CacheFirst",
  options: {
    cacheName: "x-pwa-manifest-cache",
    expiration: { maxEntries: 10, maxAgeSeconds: 365 * 24 * 60 * 60 },
    cacheableResponse: { statuses: [0, 200] },
  },
};

const scripts: RuntimeCaching = {
  urlPattern: ({ request, sameOrigin }) =>
    sameOrigin &&
    (request.destination === "worker" || request.destination === "script"),
  handler: "StaleWhileRevalidate",
  options: {
    cacheName: "x-pwa-scripts-cache",
    expiration: { maxEntries: 20, maxAgeSeconds: 30 * 24 * 60 * 60 },
    cacheableResponse: { statuses: [0, 200] },
  },
};

const external: RuntimeCaching = {
  urlPattern: ({ sameOrigin }) => !sameOrigin,
  handler: "CacheFirst",
  options: {
    cacheName: "x-pwa-external-resources-cache",
    expiration: { maxEntries: 20, maxAgeSeconds: 30 * 24 * 60 * 60 },
    cacheableResponse: { statuses: [0, 200] },
  },
};

const analytics: RuntimeCaching = {
  urlPattern: ({ sameOrigin }) => sameOrigin && new RegExp("/api/v1/analytics"),
  handler: "NetworkOnly",
  method: "POST",
  options: {
    backgroundSync: {
      name: "analytics-queue",
      options: {
        maxRetentionTime: 24 * 60,
      },
    },
  },
};

export const runtime_cache = [
  external,
  pages,
  images,
  fonts,
  analytics,
  scripts,
  assets,
  manifest,
  stylesheets,
] as RuntimeCaching[];
