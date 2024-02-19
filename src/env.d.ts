/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

/* PWA Specific Types*/
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/info" />

interface ImportMetaEnv {
  readonly RESEND_API_KEY: string;
  readonly PUBLIC_SITE_URL: string;
  readonly GOOGLE_CLIENT_ID: string;
  readonly GOOGLE_CLIENT_SECRET: string;
  readonly GOOGLE_REDIRECT_URL: string;
  readonly GOOGLE_DRIVE_API_KEY: string;
  readonly GOOGLE_DRIVE_FILE_ID: string;
  readonly GOOGLE_DRIVE_API_SCOPE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  Alpine: import("alpinejs").Alpine;
}
