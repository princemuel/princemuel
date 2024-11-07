/// <reference path="../.astro/icon.d.ts" />
/// <reference types="vite-plugin-pwa/vanillajs" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-pwa/pwa-assets" />

interface ImportMetaEnv {
  [key: string]: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  ThemeProvider: { updateWidget(theme?: string): void };
}

interface globalThis {
  __singletons: Map<string, unknown>;
}

declare const __APP_BUILD_DATE__: string;
