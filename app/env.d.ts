/// <reference types="unplugin-fonts/client" />
/// <reference types="vite-plugin-pwa/vanillajs" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-pwa/pwa-assets" />
/// <reference types="../.astro/icon.d.ts" />

interface ImportMetaEnv {
  [key: string]: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  type NetlifyLocals = import("@astrojs/netlify").NetlifyLocals;
  interface Locals extends NetlifyLocals {}
}

interface Window {
  ThemeProvider: { updateWidget(theme?: string): void };
}

interface globalThis {
  __singletons: Map<string, unknown>;
}

declare const __BUILD_DATE__: string;
