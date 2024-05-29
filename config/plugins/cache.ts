import type { RuntimeCaching } from "workbox-build";

export const cachePreset: RuntimeCaching[] = [
  {
    urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/iu,
    handler: "CacheFirst",
    options: {
      cacheName: "google-fonts",
      cacheableResponse: { statuses: [0, 200] },
      expiration: {
        maxEntries: 4,
        maxAgeSeconds: 365 * 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/iu,
    handler: "CacheFirst",
    options: {
      cacheName: "static-font-assets",
      cacheableResponse: { statuses: [0, 200] },
      expiration: {
        maxEntries: 8,
        maxAgeSeconds: 90 * 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: /\.(?:png|gif|jpg|jpeg|webp|avif|svg|ico)$/iu,
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
    urlPattern: /\.(?:js)$/iu,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "static-js-assets",
      cacheableResponse: { statuses: [0, 200] },
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: /\/sw\.js$/iu,
    handler: "NetworkFirst",
    options: {
      cacheName: "static-sw-assets",
      networkTimeoutSeconds: 10,
    },
  },
  {
    urlPattern: /\.(?:css|less)$/iu,
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
    urlPattern: new RegExp("/api/v1/analytics"),
    handler: "NetworkOnly",
    method: "POST",
    options: {
      backgroundSync: {
        name: "analytics-queue",
        options: {
          maxRetentionTime: 1 * 24 * 60,
        },
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
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: 1 * 24 * 60 * 60,
      },
      networkTimeoutSeconds: 10,
    },
  },
  {
    urlPattern: /.*/iu,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "others",
      cacheableResponse: { statuses: [0, 200] },
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: 1 * 24 * 60 * 60,
      },
    },
  },
];
