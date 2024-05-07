import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import { envVars } from "./config/env/env.config";
import { integrations, rehypePlugins, remarkPlugins } from "./config/plugins";

// https://astro.build/config
export default defineConfig({
  site: envVars.PUBLIC_SITE_URL,
  output: "hybrid",
  server: { port: Number(envVars.PORT) || 3000 },
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
    contentCollectionCache: true,
    security: { csrfProtection: { origin: true } },
  },
});
