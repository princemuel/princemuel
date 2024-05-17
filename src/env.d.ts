/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-pwa/pwa-assets" />

interface ImportMetaEnv {}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  type EdgeLocals = import("@astrojs/vercel").EdgeLocals;
  interface Locals extends EdgeLocals {}
}

interface Window {
  ThemeProvider: { updateWidget(theme?: string): void };
  AnalyticsService: { dispatch(): void };
}
interface globalThis {
  __singletons: Map<string, unknown>;
}

declare module "*.astro" {
  type Props = import("astro").AstroGlobal["props"];
  const component: (_props: Props) => unknown;
  export default component;
}
