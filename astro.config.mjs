import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import { integrations } from "./plugins/integrations";
import { rehypePlugins } from "./plugins/rehype";
import { remarkPlugins } from "./plugins/remark";

const envVars = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  site: envVars.PUBLIC_SITE_URL,
  output: "hybrid",
  adapter: vercel({
    output: "hybrid",
    edgeMiddleware: true,
    functionPerRoute: false,
    imageService: true,
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
  }),
  experimental: {
    globalRoutePriority: true,
    contentCollectionCache: true,
  },
  // vite: { plugins: [] },
  markdown: { remarkPlugins, rehypePlugins },
  integrations: [...integrations],
});
