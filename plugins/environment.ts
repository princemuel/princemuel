import type { defineConfig } from "astro/config";

type Environment = NonNullable<
  NonNullable<Parameters<typeof defineConfig>[0]["experimental"]>["env"]
>;

export const environment = {} satisfies Environment;
