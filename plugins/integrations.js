import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
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

export { codeBlockOptions };
