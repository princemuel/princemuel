import defaultTheme from "tailwindcss/defaultTheme";

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
  fallback: "__FontSans, " + defaultTheme.fontFamily.sans.join(", "),
  // fallback: "sans-serif" as const,
  fallbackName: "__FontSans_Fallback",
  cssVariable: "font-sans",
};

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
  fallback: "__FontMono, " + defaultTheme.fontFamily.mono.join(", "),
  fallbackName: "__FontMono_Fallback",
  // cssVariable: "font-mono",
};

export const fontAccent = {
  name: "__FontAccent",
  basePath: "./public",
  src: [
    {
      // weight: "400",
      style: "italic",
      path: "./public/static/fonts/JetBrainsMonoVariableItalic.ttf",
    },
    {
      // weight: "400",
      style: "normal",
      path: "./public/static/fonts/JetBrainsMonoVariableNormal.ttf",
      css: {
        "font-feature-settings": "normal",
      },
    },
  ],
  preload: true,
  display: "swap",
  selector: ".__accent__",
  fallback: "__FontAccent, " + defaultTheme.fontFamily.mono.join(", "),
  fallbackName: "__FontAccent_Fallback",
  // cssVariable: "font-accent",
};
