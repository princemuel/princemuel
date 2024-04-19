import { Redis } from "@upstash/redis";
import { Octokit } from "octokit";
import { Resend } from "resend";
import { envVars } from "./env.server";

// https://github.com/octokit/octokit.js/#readme
export const octokit = new Octokit({ auth: envVars.OCTOKIT_TOKEN });
export const resend = new Resend(envVars.RESEND_TOKEN);

export const redis = new Redis({
  url: envVars.UPSTASH_REDIS_REST_URL,
  token: envVars.UPSTASH_REDIS_REST_TOKEN,
});
