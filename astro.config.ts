import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import { integrations } from "./config/integrations";
import { rehypePlugins } from "./config/rehype";
import { remarkPlugins } from "./config/remark";

const mode = process.env.NODE_ENV ?? "production";
export const envVars = loadEnv(mode, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  srcDir: "./app",
  site: envVars.PUBLIC_SITE_URL,
  experimental: {
    globalRoutePriority: true,
    contentCollectionCache: true,
    serverIslands: true,
    contentIntellisense: true,
    contentLayer: true,
    directRenderScript: true,
  },
  security: { checkOrigin: true },
  markdown: {
    syntaxHighlight: "shiki",
    remarkPlugins: remarkPlugins,
    rehypePlugins: rehypePlugins,
  },
  integrations: [...integrations],
  adapter: vercel({
    edgeMiddleware: true,
    functionPerRoute: false,
    imageService: true,
    webAnalytics: {
      enabled: envVars.NODE_ENV === "production",
    },
  }),
});
