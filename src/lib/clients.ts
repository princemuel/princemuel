import { Octokit } from "octokit";
import { Resend } from "resend";

// https://github.com/octokit/octokit.js/#readme
export const octokit = new Octokit({ auth: import.meta.env.OCTOKIT_TOKEN });
export const resend = new Resend(import.meta.env.RESEND_TOKEN);
