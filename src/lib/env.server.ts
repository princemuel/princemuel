import { isServer } from "@/helpers/utils";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const envVars = createEnv({
  // Tell the library when we're in a server context.
  isServer: isServer,
  server: {
    GOOGLE_DRIVE_TOKEN: z.string().min(1),
    GOOGLE_DRIVE_FILE_ID: z.string().min(1),
    RESEND_ADDRESS: z.string().min(1).email(),
    RESEND_AUDIENCE: z.string().min(1),
    RESEND_TOKEN: z.string().min(1),
    OCTOKIT_TOKEN: z.string().min(1),
    ENABLE_PREVIEW: z
      .string()
      .refine((s) => s === "true" || s === "false")
      .transform((s) => s === "true"),
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
