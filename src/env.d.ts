/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="simple-stack-form/types" />

interface ImportMetaEnv {
  readonly RESEND_API_KEY: string;
  readonly PUBLIC_SITE_URL: string;
  readonly GOOGLE_DRIVE_API_KEY: string;
  readonly GOOGLE_DRIVE_FILE_ID: string;
  readonly ENABLE_RESOURCE_PREVIEW: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  Alpine: import("alpinejs").Alpine;
}
