import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import { envVars } from "./config/env";
import { integrations } from "./config/integrations";
import { rehypePlugins } from "./config/rehype";
import { remarkPlugins } from "./config/remark";

// https://astro.build/config
export default defineConfig({
  site: envVars.PUBLIC_SITE_URL,
  output: "hybrid",
  server: { port: Number(envVars.PORT || 4321) },
  markdown: { syntaxHighlight: false, remarkPlugins, rehypePlugins },
  integrations: integrations,
  adapter: vercel({
    edgeMiddleware: true,
    functionPerRoute: false,
    imageService: true,
    webAnalytics: { enabled: envVars.NODE_ENV === "production" },
  }),
  security: { checkOrigin: true },
  experimental: {
    globalRoutePriority: true,
    contentCollectionCache: true,
  },
});
