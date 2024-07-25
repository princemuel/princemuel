import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import { envVars } from "./config/env";
import { integrations } from "./config/integrations";
import { rehypePlugins } from "./config/rehype";
import { remarkPlugins } from "./config/remark";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  site: envVars.PUBLIC_SITE_URL,
  srcDir: "./app",
  experimental: {
    globalRoutePriority: true,
    contentCollectionCache: true,
    serverIslands: true,
  },
  security: { checkOrigin: true },
  markdown: { syntaxHighlight: false, remarkPlugins, rehypePlugins },
  integrations: integrations,
  adapter: vercel({
    isr: true,
    edgeMiddleware: true,
    functionPerRoute: false,
    imageService: true,
    webAnalytics: { enabled: true },
  }),
});
