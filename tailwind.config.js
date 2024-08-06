import twForms from "@tailwindcss/forms";
import twTypography from "@tailwindcss/typography";
import twScrollbar from "tailwind-scrollbar";
import twAnimate from "tailwindcss-animate";
import twDefaultTheme from "tailwindcss/defaultTheme";
import twPlugin from "tailwindcss/plugin";
import twConfig from "./config/tailwind.json";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./app/pages/**/*.{astro,md,mdx}",
    "./app/layouts/**/*.astro",
    "./app/components/**/*.{astro,tsx}",
    "./app/content/**/*.{md,mdx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
    respectDefaultRingColorOpacity: true,
    disableColorOpacityUtilitiesByDefault: true,
  },
  experimental: { optimizeUniversalDefaults: true },
  theme: {
    screens: {
      "3xs": "24em", // @media (min-width: 384px) { ... }
      "2xs": "30em", // @media (min-width: 480px) { ... }
      ...twDefaultTheme.screens,
    },
    fluidCols: { fit: "fit", fill: "fill" },
    extend: {
      colors: twConfig.theme.colors,
      borderRadius: { pill: "100vmax" },
      fontFamily: {
        sans: [
          twConfig.theme.fontFamily.sans,
          ...twDefaultTheme.fontFamily.sans,
        ],
        mono: [
          twConfig.theme.fontFamily.mono,
          ...twDefaultTheme.fontFamily.mono,
        ],
        accent: [
          twConfig.theme.fontFamily.accent,
          ...twDefaultTheme.fontFamily.mono,
        ],
      },
      cursor: twConfig.theme.cursor,
      screens: {
        xs: "36em", // @media (min-width: 576px) { ... },
        sm: "40em", // @media (min-width: 640px) { ... }
        md: "48em", // @media (min-width: 768px) { ... }
        lg: "64em", // @media (min-width: 1024px) { ... }
        xl: "80em", // @media (min-width: 1280px) { ... }
        "2xl": "96em", // @media (min-width: 1536px) { ... }
        "3xl": "112.5em", // @media (min-width: 1800px) { ... }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        rotate: "rotate 1s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0px, -8px, 0)" },
          "50%": { transform: "translate3d(0px, 8px, 0)" },
        },
        rotate: {
          "0%": { transform: "rotate(-45deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
    },
  },
  plugins: [
    twAnimate,
    twTypography({ target: "modern" }),
    twScrollbar({ nocompatible: true, preferredStrategy: "pseudoelements" }),
    twForms({ strategy: "base" }),
    twPlugin(function ({ theme, addUtilities, addVariant, matchUtilities }) {
      addVariant("optional", "&:optional");
      addVariant("hocus", ["&:hover", "&:focus"]);
      addVariant("inverted-colors", "@media (inverted-colors: inverted)");
      addVariant("neon", '&:where([data-theme="neon"], [data-theme="neon"] *)');

      addUtilities({
        ".grid-repeat-autofit": { "--tw-grid-repeat": "auto-fit" },
        ".grid-repeat-autofill": { "--tw-grid-repeat": "auto-fill" },
      });
      addUtilities({
        ".mask-radial-gradient": {
          maskImage: "radial-gradient(rgba(0, 0, 0, 0.8), transparent 60%)",
        },
        ".mask-linear-gradient-to-b": {
          maskImage:
            "linear-gradient(to bottom, white 0%, white 33%, transparent 90%)",
        },
      });
      addUtilities({
        ".full-w-bg": {
          backgroundColor: "currentColor",
          boxShadow: "0 0 0 100vmax currentColor, 0 0 2rem currentColor",
          clipPath: "inset(0 -100vmax)",
        },
      });

      matchUtilities(
        {
          "grid-cols-fluid": (value) => ({
            gridTemplateColumns: `repeat(var(--tw-grid-repeat), minmax(min(100%, ${value}), 1fr))`,
          }),
        },
        { values: theme("width") },
      );
    }),
  ],
};
