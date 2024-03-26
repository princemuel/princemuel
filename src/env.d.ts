/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="simple-stack-form/types" />

interface ImportMetaEnv {
  readonly GOOGLE_DRIVE_TOKEN: string;
  readonly GOOGLE_DRIVE_FILE_ID: string;

  readonly RESEND_ADDRESS_FROM: string;
  readonly RESEND_ADDRESS_TO: string;
  readonly RESEND_AUDIENCE_ID: string;
  readonly RESEND_TOKEN: string;

  readonly OCTOKIT_TOKEN: string;
  readonly ENABLE_RESOURCE_PREVIEW: string;
  readonly PUBLIC_SITE_URL: string;
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
