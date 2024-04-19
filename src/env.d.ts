/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="simple-stack-form/types" />

interface ImportMetaEnv {}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  type EdgeLocals = import("@astrojs/vercel").EdgeLocals;
  interface Locals extends EdgeLocals {}
}

interface Window {
  Alpine: import("alpinejs").Alpine;
  XThemeProvider: {
    updateWidget(theme?: string): void;
  };
}

declare module "*.astro" {
  type Props = import("astro").AstroGlobal["props"];
  const load: (_props: Props) => any;
  export default load;
}
