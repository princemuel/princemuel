import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: process.env.VERCEL_URL ?? "http://localhost:3000",

  output: "hybrid",
  adapter: vercel({
    functionPerRoute: false,
    imageService: true,
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
  }),

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react({
      include: ["**/react/*"],
    }),
    mdx(),
    sitemap({ changefreq: "daily", priority: 0.7 }),
  ],
  redirects: {
    "/twitter": "https://x.com/iamprincemuel",
    "/linkedin": "https://linkedin.com/in/iamprincemuel",
    "/youtube": "https://youtube.com/@princemuel",
    "/github": "https://github.com/princemuel",
    "/sponsors": "https://github.com/sponsors/princemuel",
    "/coffee": "",
  },
});
