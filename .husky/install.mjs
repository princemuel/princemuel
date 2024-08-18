import { env, exit } from "node:process";
// Skip Husky install in production and CI
if (env.NODE_ENV === "production" || env.CI === "true") exit(0);

(async function () {
  (await import("husky")).default();
})();
