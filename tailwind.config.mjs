import twTypography from "@tailwindcss/typography";
import twScrollbar from "tailwind-scrollbar";
import twAnimate from "tailwindcss-animate";
import twDefaultTheme from "tailwindcss/defaultTheme";
import twPlugin from "tailwindcss/plugin";
import config from "./config/tailwind.json";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{astro,js,jsx,ts,tsx,md,mdx}",
    "./src/layouts/**/*.{astro,js,jsx,ts,tsx,md,mdx}",
    "./src/components/**/*.{astro,js,jsx,ts,tsx,md,mdx}",
    "./src/content/**/*.{md,mdx}",
  ],
  corePlugins: { float: false, container: false },
  future: "all",
  theme: {
    screens: {
      "3xs": "24em", // @media (min-width: 384px) { ... }
      "2xs": "30em", // @media (min-width: 480px) { ... }
      ...twDefaultTheme.screens,
    },
    extend: {
      borderRadius: { pill: "100vmax" },
      fontFamily: {
        sans: ["__FontSans", ...twDefaultTheme.fontFamily.sans],
        mono: ["__FontMono", ...twDefaultTheme.fontFamily.mono],
        accent: ["__FontAccent", ...twDefaultTheme.fontFamily.mono],
      },
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
      cursor: { pointer: config.theme.cursor },
    },
  },
  plugins: [
    twAnimate,
    twTypography({ target: "modern" }),
    twScrollbar({ nocompatible: true, preferredStrategy: "pseudoelements" }),
    twPlugin(function ({ theme, addUtilities, addVariant, matchUtilities }) {
      addVariant("optional", "&:optional");
      addVariant("hocus", ["&:hover", "&:focus"]);
      addVariant("inverted-colors", "@media (inverted-colors: inverted)");

      matchUtilities({
        "fluid-cols": (value) => ({
          "--tw-fluid-value": "var(--tw-fluid-cols-repeat, auto-fit)",
          gridTemplateColumns: `repeat(var(--tw-fluid-value), minmax(min(100%, ${value}), 1fr))`,
        }),
      });

      addUtilities({
        ".fluid-cols-fit": { "--tw-fluid-cols-repeat": "auto-fit" },
        ".fluid-cols-fill": { "--tw-fluid-cols-repeat": "auto-fill" },
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
    }),
  ],
};
