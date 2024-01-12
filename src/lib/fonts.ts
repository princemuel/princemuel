export const fontSans = {
  name: "__FontSans",
  basePath: "./public",
  src: [
    {
      weight: "600",
      style: "normal",
      path: "./public/fonts/WotfardSemiBold.woff2",
    },
    {
      weight: "500",
      style: "normal",
      path: "./public/fonts/WotfardMedium.woff2",
    },
    {
      weight: "400",
      style: "normal",
      path: "./public/fonts/WotfardRegular.woff2",
      css: {
        "font-feature-settings": "normal",
      },
    },
  ],
  preload: true,
  display: "swap",
  selector: ".__sans__",
  fallback: "sans-serif" as const,
  cssVariable: "font-sans",
};

export const fontMono = {
  name: "__FontMono",
  basePath: "./public",
  src: [
    {
      weight: "400",
      style: "italic",
      path: "./public/fonts/MonoLisaVariableItalic.woff2",
    },
    {
      weight: "400",
      style: "normal",
      path: "./public/fonts/MonoLisaVariableNormal.woff2",
      css: {
        "font-feature-settings": "normal",
      },
    },
  ],
  preload: true,
  display: "swap",
  selector: ".__mono__",
  fallback: "sans-serif" as const,
  cssVariable: "font-mono",
};
