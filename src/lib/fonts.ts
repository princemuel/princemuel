import type { Props as AstroFontProps } from "node_modules/astro-font/dist/utils";

type FontConfig = AstroFontProps["config"][0];

export const fontSans = {
  name: "__FontSans",
  basePath: "./public",
  src: [
    {
      weight: "600",
      style: "normal",
      path: "./public/static/fonts/WotfardSemiBold.woff2",
    },
    {
      weight: "500",
      style: "normal",
      path: "./public/static/fonts/WotfardMedium.woff2",
    },
    {
      weight: "400",
      style: "normal",
      path: "./public/static/fonts/WotfardRegular.woff2",
      css: {
        "font-feature-settings": "normal",
      },
    },
  ],
  preload: true,
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
      weight: "400",
      style: "italic",
      path: "./public/static/fonts/MonoLisaVariableItalic.woff2",
    },
    {
      weight: "400",
      style: "normal",
      path: "./public/static/fonts/MonoLisaVariableNormal.woff2",
      css: {
        "font-feature-settings": "normal",
      },
    },
  ],
  preload: true,
  display: "swap",
  selector: ".__mono__",
  fallback: "monospace",
  fallbackName: "__FontMono_Fallback",
  // cssVariable: "font-mono",
} satisfies FontConfig;

export const fontAccent = {
  name: "__FontAccent",
  basePath: "./public",
  src: [
    {
      style: "normal",
      path: "./public/static/fonts/Inconsolata.ttf",
      css: {
        "font-feature-settings": "normal",
      },
    },
  ],
  preload: true,
  display: "swap",
  selector: ".__accent__",
  fallback: "sans-serif",
  fallbackName: "__FontAccent_Fallback",
  // cssVariable: "font-accent",
} satisfies FontConfig;
