import type { Props as AstroFontProps } from "node_modules/astro-font/dist/utils";

type FontConfig = AstroFontProps["config"][0];

export const fontSans = {
  name: "__FontSans",
  basePath: "./public",
  src: [
    {
      path: "./public/static/fonts/WotfardSemiBold.ttf",
      weight: "600",
      style: "normal",
      css: {
        "font-feature-settings": "normal",
      },
    },
    {
      path: "./public/static/fonts/WotfardMedium.ttf",
      weight: "500",
      style: "normal",
      css: {
        "font-feature-settings": "normal",
      },
    },
    {
      path: "./public/static/fonts/WotfardRegular.ttf",
      weight: "400",
      style: "normal",
      css: {
        "font-feature-settings": "normal",
      },
    },
  ],

  display: "swap",
  selector: ".__sans__",
  fallback: "sans-serif",
  fallbackName: "__FontSans_Fallback",
  cssVariable: "font-sans",
} satisfies FontConfig;

export const fontMono = {
  name: "__FontMono",
  basePath: "./public",
  src: [
    {
      path: "./public/static/fonts/JetBrainsMonoItalic.ttf",
      style: "italic",
      css: {
        "font-feature-settings": "normal",
      },
    },
    {
      path: "./public/static/fonts/JetBrainsMonoNormal.ttf",
      style: "normal",
      css: {
        "font-feature-settings": "normal",
      },
    },
  ],

  display: "swap",
  selector: ".__mono__",
  fallback: "monospace",
  fallbackName: "__FontMono_Fallback",
  cssVariable: "font-mono",
} satisfies FontConfig;

export const fontAccent = {
  name: "__FontAccent",
  basePath: "./public",
  src: [
    {
      path: "./public/static/fonts/Inconsolata.ttf",
      style: "normal",
      css: {
        "font-feature-settings": "normal",
      },
    },
  ],

  display: "swap",
  selector: ".__accent__",
  fallback: "sans-serif",
  fallbackName: "__FontAccent_Fallback",
  cssVariable: "font-accent",
} satisfies FontConfig;
