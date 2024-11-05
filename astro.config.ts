import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import { envSchema } from "./config/env-schema";
import { integrations } from "./config/integrations";
import { rehypePlugins, remarkPlugins } from "./config/remark-rehype";

const mode = process.env.NODE_ENV ?? "production";
const envVars = loadEnv(mode, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  output: "static",
  srcDir: "./app",
  site: envVars.PUBLIC_URL,
  env: { validateSecrets: true, schema: envSchema },
  experimental: { contentIntellisense: true },
  markdown: {
    syntaxHighlight: "shiki",
    remarkPlugins: remarkPlugins,
    rehypePlugins: rehypePlugins,
  },
  integrations: [...integrations],
  image: {
    remotePatterns: [{ protocol: "https", hostname: "**.unsplash.com" }],
  },
  adapter: vercel({
    isr: true,
    edgeMiddleware: true,
    imageService: true,
    webAnalytics: { enabled: mode === "production" },
  }),
});
