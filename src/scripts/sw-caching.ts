import type { VitePWAOptions } from "vite-plugin-pwa";

type Unpacked<T> = NonNullable<T extends (infer U)[] ? U : T>;

type RuntimeCaching = Unpacked<VitePWAOptions["workbox"]["runtimeCaching"]>;

const baseURL = import.meta.env.PUBLIC_SITE_URL;

export const internal = {
  urlPattern: new RegExp(`^${baseURL}.*`, "iu"),
  handler: "CacheFirst",
  options: {
    cacheName: "pm_pwa_cache",
    expiration: {
      maxAgeSeconds: 60 * 60 * 24 * 30,
      maxEntries: 100,
    },
  },
} satisfies RuntimeCaching;

export const external = {
  urlPattern: new RegExp(`^(?!${baseURL}).*`, "iu"),
  handler: "NetworkOnly",
} satisfies RuntimeCaching;
