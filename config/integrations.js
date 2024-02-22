import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import qwik from "@qwikdev/astro";
import pwa from "@vite-pwa/astro";
import ec from "astro-expressive-code";
import simpleStackForm from "simple-stack-form";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('astro-expressive-code').AstroExpressiveCodeOptions} */
const codeBlockOptions = {
  themes: ["github-dark", "github-light"],
  styleOverrides: {
    codeFontFamily: "__FontMono, " + defaultTheme.fontFamily.mono.join(", "),
    uiFontFamily: "__FontSans, " + defaultTheme.fontFamily.sans.join(", "),
  },
  frames: {},
  plugins: [pluginCollapsibleSections()],
  useThemedSelectionColors: true,
  themeCssSelector: (theme) => `[data-theme='${theme.name}']`,
};

/** @type {import('astro').AstroUserConfig['integrations']} */
export const integrations = [
  pwa({
    registerType: "autoUpdate",
    includeAssets: ["/favicon.svg"],
    experimental: {
      directoryAndTrailingSlashHandler: true,
    },
  }),
  ec(codeBlockOptions),
  mdx({ optimize: true }),
  tailwind({ applyBaseStyles: false, nesting: true }),
  qwik({ include: ["**/qwik/*"] }),
  sitemap({
    changefreq: "daily",
    priority: 0.7,
    lastmod: new Date(),
    filter: (page) => !(page.includes("/api/") || page.includes(".xml")),
  }),
  simpleStackForm(),
];
