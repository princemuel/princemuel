import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import { integrations } from "./config/integrations";
import { rehypePlugins } from "./config/rehype";
import { remarkPlugins } from "./config/remark";

const envVars = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  site: envVars.PUBLIC_SITE_URL,
  output: "hybrid",
  server: { port: 3000 },
  markdown: { syntaxHighlight: false, remarkPlugins, rehypePlugins },
  integrations: integrations,
  adapter: vercel({
    edgeMiddleware: true,
    functionPerRoute: false,
    imageService: true,
    webAnalytics: { enabled: envVars.NODE_ENV === "production" },
    isr: { expiration: 60 * 60 * 24 * 1.2 },
  }),
  experimental: {
    globalRoutePriority: true,
    contentCollectionCache: envVars.NODE_ENV === "production",
    security: { csrfProtection: { origin: true } },
  },
});
