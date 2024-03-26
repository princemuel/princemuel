/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
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
  Alpine: import("alpinejs").Alpine;
}

declare module "*.astro" {
  type Props = import("astro").AstroGlobal["props"];
  const load: (_props: Props) => any;
  export default load;
}
