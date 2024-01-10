/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly RESEND_API_KEY: string;
  readonly PUBLIC_POKEAPI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
