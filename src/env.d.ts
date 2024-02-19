/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

/* PWA Specific Types*/
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/info" />

interface ImportMetaEnv {
  readonly RESEND_API_KEY: string;
  readonly PUBLIC_SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
