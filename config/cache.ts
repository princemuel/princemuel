import type { RuntimeCaching } from "workbox-build";

export const cachePreset: RuntimeCaching[] = [
  {
    urlPattern: ({ request, sameOrigin }) =>
      request.destination === "font" && !sameOrigin,
    handler: "CacheFirst",
    options: {
      cacheName: "google-font-assets",
      cacheableResponse: { statuses: [0, 200] },
      expiration: {
        maxEntries: 4,
        maxAgeSeconds: 365 * 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: ({ request, sameOrigin }) =>
      request.destination === "font" && sameOrigin,
    handler: "CacheFirst",
    options: {
      cacheName: "local-font-assets",
      cacheableResponse: { statuses: [0, 200] },
      expiration: {
        maxEntries: 8,
        maxAgeSeconds: 90 * 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: ({ request }) => request.destination === "image",
    handler: "CacheFirst",
    options: {
      cacheName: "static-image-assets",
      cacheableResponse: { statuses: [0, 200] },
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: ({ request }) => request.destination === "script",
    handler: "NetworkFirst",
    options: {
      cacheName: "static-script-assets",
      cacheableResponse: { statuses: [0, 200] },
      networkTimeoutSeconds: 8,
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: ({ request }) => request.destination === "style",
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "static-style-assets",
      cacheableResponse: { statuses: [0, 200] },
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: ({ request }) => request.destination === "xslt",
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "static-XML-assets",
      cacheableResponse: { statuses: [0, 200] },
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      },
    },
  },
  {
    // Cache multimedia files
    urlPattern: /\.(?:pdf|mp4|webm|ogg|mp3|wav)$/iu,
    handler: "CacheFirst",
    options: {
      cacheName: "static-media-assets",
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: /^\/api\/v\d+\/.*$/iu,
    handler: "NetworkFirst",
    method: "GET",
    options: {
      cacheName: "apis-cache",
      cacheableResponse: { statuses: [0, 200] },
      networkTimeoutSeconds: 8,
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: 1 * 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: /.*/iu,
    handler: "NetworkFirst",
    options: {
      cacheName: "others",
      cacheableResponse: { statuses: [0, 200] },
      networkTimeoutSeconds: 8,
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: 1 * 24 * 60 * 60,
      },
    },
  },
];
