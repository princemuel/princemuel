/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

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
}
interface globalThis {
  __singletons: Map<string, unknown>;
}

declare module "*.astro" {
  type Props = import("astro").AstroGlobal["props"];
  const component: (_props: Props) => unknown;
  export default component;
}
