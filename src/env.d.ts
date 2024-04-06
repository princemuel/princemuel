/// <reference path="../.astro/types.d.ts" />
/// <reference path="../.astro/db-types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="simple-stack-form/types" />

interface ImportMetaEnv {}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  Alpine: import("alpinejs").Alpine;
}

declare module "*.astro" {
  type Props = import("astro").AstroGlobal["props"];
  const load: (_props: Props) => any;
  export default load;
}
