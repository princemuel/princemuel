import { singleton } from "@/shared/utils/objects";
import { PrismaClient } from "@prisma/client";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Octokit } from "octokit";
import { Resend } from "resend";
import { envVars } from "./environment";

// https://github.com/octokit/octokit.js/#readme
export const octokit = new Octokit({ auth: envVars.OCTOKIT_TOKEN });
export const resend = new Resend(envVars.RESEND_TOKEN);

export const db = singleton("__db__", () => new PrismaClient());

export const redis = new Redis({
  url: envVars.UPSTASH_REDIS_REST_URL,
  token: envVars.UPSTASH_REDIS_REST_TOKEN,
});

const tokens = envVars.UPSTASH_LIMIT_TOKEN;
const duration = envVars.UPSTASH_LIMIT_WINDOW as Parameters<
  typeof Ratelimit.slidingWindow
>[1];

export const ratelimit = new Ratelimit({
  redis: redis,
  analytics: true,
  limiter: Ratelimit.slidingWindow(tokens, duration),
  prefix: "@upstash/ratelimit",
  ephemeralCache: singleton("__rl_cache__", () => new Map<string, number>()),
});
