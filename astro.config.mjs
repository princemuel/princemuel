import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";

const VERCEL_PREVIEW_SITE =
  process.env.VERCEL_ENV !== "production" &&
  process.env.VERCEL_URL &&
  `https://${process.env.VERCEL_URL}`;
// https://astro.build/config
export default defineConfig({
  site: VERCEL_PREVIEW_SITE ?? "https://princemuel.vercel.app",

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
