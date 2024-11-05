import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Octokit } from "octokit";
import { Resend } from "resend";

import {
  OCTOKIT_TOKEN,
  RESEND_TOKEN,
  UPSTASH_LIMIT_TOKEN,
  UPSTASH_LIMIT_WINDOW,
  UPSTASH_REDIS_REST_TOKEN,
  UPSTASH_REDIS_REST_URL,
} from "astro:env/server";

import { singleton } from "@/utilities/objects";

// https://github.com/octokit/octokit.js/#readme
export const octokit = new Octokit({ auth: OCTOKIT_TOKEN });
export const resend = new Resend(RESEND_TOKEN);

// export const db = singleton("__prisma__", () => new PrismaClient());

// export const getConnection = singleton("_db_", () => {
//   const client = new PrismaClient();
//   void client.$connect();
//   return {
//     db: client,
//     [Symbol.asyncDispose]: () => {
//       void client.$disconnect();
//     },
//   };
// });

export const redis = new Redis({
  url: UPSTASH_REDIS_REST_URL,
  token: UPSTASH_REDIS_REST_TOKEN,
});

const tokens = UPSTASH_LIMIT_TOKEN;
const duration = UPSTASH_LIMIT_WINDOW as Parameters<
  typeof Ratelimit.slidingWindow
>[1];

export const ratelimit = new Ratelimit({
  redis: redis,
  analytics: true,
  limiter: Ratelimit.slidingWindow(tokens, duration),
  prefix: "@upstash/ratelimit",
  ephemeralCache: singleton("__rl_cache__", () => new Map<string, number>()),
});
