import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import { integrations } from "./config/integrations";
import { rehypePlugins } from "./config/rehype";
import { remarkPlugins } from "./config/remark";

//@ts-expect-error
const envVars = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  site: envVars.PUBLIC_SITE_URL,
  output: "hybrid",
  adapter: vercel({
    edgeMiddleware: true,
    maxDuration: 20,
    functionPerRoute: false,
    imageService: true,
    webAnalytics: { enabled: true },
    speedInsights: { enabled: true },
  }),
  experimental: {
    globalRoutePriority: true,
    contentCollectionCache: true,
  },
  server: { port: 3000 },
  markdown: { remarkPlugins, rehypePlugins },
  integrations: integrations,
});
