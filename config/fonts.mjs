import twDefaultTheme from "tailwindcss/defaultTheme.js";
import twConfig from "../tailwind.json" with { type: "json" };

export const fonts = {
  mono: [twConfig.theme.fontFamily.mono, ...twDefaultTheme.fontFamily.mono],
  sans: [twConfig.theme.fontFamily.sans, ...twDefaultTheme.fontFamily.sans],
};
