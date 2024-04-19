import alpine from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import qwik from "@qwikdev/astro";
import sentry from "@sentry/astro";
import spotlightjs from "@spotlightjs/astro";
import { AstroUserConfig } from "astro";
import {
  astroExpressiveCode as ec,
  type AstroExpressiveCodeOptions,
} from "astro-expressive-code";
import htmx from "astro-htmx";
import icon from "astro-icon";
import simpleStackForm from "simple-stack-form";
import simpleStackStream from "simple-stack-stream";
import defaultTheme from "tailwindcss/defaultTheme";
import { envVars } from "./env.config";
import { pluginErrorPreview, pluginFirstWordRed } from "./plugins";

const codeBlockOptions = {
  themes: ["dracula", "dracula-soft"],
  styleOverrides: {
    borderRadius: "0.2rem",
    frames: { editorActiveTabIndicatorHeight: "2px" },
    codeFontFamily: "__FontMono, " + defaultTheme.fontFamily.mono.join(", "),
    uiFontFamily: "__FontSans, " + defaultTheme.fontFamily.sans.join(", "),
  },
  plugins: [
    pluginCollapsibleSections(),
    pluginLineNumbers(),
    pluginFirstWordRed(),
    pluginErrorPreview(),
  ],

  // useThemedSelectionColors: true,
  themeCssSelector: (theme) => `[data-reader-theme='${theme.name}']`,
  defaultProps: {
    showLineNumbers: false,
  },
} satisfies AstroExpressiveCodeOptions;

const iconOptions = {
  iconDir: "src/assets/icons",
  include: { lucide: ["*"] },
} satisfies Parameters<typeof icon>[0];

envVars;
export const integrations: AstroUserConfig["integrations"] = [
  tailwind({ applyBaseStyles: false, nesting: true }),
  ec(codeBlockOptions),
  icon(iconOptions),
  mdx(),
  alpine({ entrypoint: "/src/scripts/alpinejs" }),
  qwik({ include: "**/qwik/*" }),
  sitemap({
    changefreq: "daily",
    priority: 0.7,
    lastmod: new Date(),
    filter: (page) => !(page.includes("/api/") || page.includes(".xml")),
  }),
  htmx(),
  simpleStackForm(),
  simpleStackStream(),
  sentry({
    dsn: envVars.SENTRY_DSN,
    release: "0.3.0",
    environment: envVars.NODE_ENV,
    sourceMapsUploadOptions: {
      project: "website",
      authToken: envVars.SENTRY_AUTH_TOKEN,
    },
  }),
  spotlightjs(),
];
