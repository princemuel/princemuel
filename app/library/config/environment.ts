import { isServer } from "@/shared/utils/guards";
import { str_to_bool } from "@/shared/utils/strings";
import { createEnv } from "@t3-oss/env-core";
import { z } from "astro:schema";

export const envVars = createEnv({
  // Tell the library when we're in a server context.
  isServer: isServer,
  server: {
    GOOGLE_DRIVE_TOKEN: z.string().min(1),
    GOOGLE_DRIVE_FILE_ID: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    SHADOW_DATABASE_URL: z.string().min(1),
    DIRECT_URL: z.string().min(1),
    ASTRO_KEY: z.string().min(1),
    WAKATIME_TOKEN: z.string().min(1),
    ENABLE_EXPERIMENTAL_COREPACK: z.coerce.number(),
    RESEND_ADDRESS: z.string().min(1).email(),
    RESEND_AUDIENCE: z.string().min(1),
    RESEND_TOKEN: z.string().min(1),
    OCTOKIT_TOKEN: z.string().min(1),
    OCTOKIT_VERSION: z.string().min(1),
    OCTOKIT_URL: z.string().min(1).url(),
    OCTOKIT_USERNAME: z.string().min(1),
    // TODO: change this to DISABLE_ instead
    ENABLE_PREVIEW: z.coerce.string().transform((v) => str_to_bool(v)),
    SITE_STATUS: z.enum(["construction", "maintenance", "live"]),
    UPSTASH_REDIS_REST_URL: z.string().url(),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
    UPSTASH_LIMIT_TOKEN: z.coerce.number(),
    UPSTASH_LIMIT_WINDOW: z.string().min(1),
  },

  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: import.meta.env,

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true,
});
