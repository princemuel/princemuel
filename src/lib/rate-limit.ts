import { singleton } from "@/helpers";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./clients";
import { envVars } from "./env.server";

const tokens = envVars.UPSTASH_LIMIT_TOKEN;
const duration = envVars.UPSTASH_LIMIT_WINDOW as Parameters<
  typeof Ratelimit.slidingWindow
>[1];

export const rl = new Ratelimit({
  redis: redis,
  analytics: true,
  limiter: Ratelimit.slidingWindow(tokens, duration),
  prefix: "@upstash/ratelimit",
  ephemeralCache: singleton("__rl_cache__", () => new Map<string, number>()),
});
