import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  site:
    Boolean(process.env.VERCEL_URL) ?
      `https://${process.env.VERCEL_URL}`
    : "https://princemuel.vercel.app",
  integrations: [
    sitemap({ changefreq: "daily", priority: 0.7 }),
    tailwind({ applyBaseStyles: false }),
    react({ include: ["**/react/*"] }),
    mdx(),
  ],
  adapter: vercel({
    output: "hybrid",
    functionPerRoute: false,
    imageService: true,
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
  }),

  // redirects: {
  //   "/twitter": "https://x.com/iamprincemuel",
  //   "/linkedin": "https://www.linkedin.com/in/princemuel/",
  //   "/youtube": "https://youtube.com/@princemuel",
  //   "/github": "https://github.com/princemuel",
  //   "/sponsor-me": "https://github.com/sponsors/princemuel",
  //   "/coffee": "https://www.buymeacoffee.com/princemuel",
  // },
});
