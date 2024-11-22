//@ts-check
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { defineEcConfig } from "astro-expressive-code";
import { fonts } from "./config/fonts.mjs";

export default defineEcConfig({
  themes: ["github-dark-default", "github-light-default"],
  styleOverrides: {
    codeFontFamily: fonts.mono.join(","),
    uiFontFamily: fonts.sans.join(","),
  },
  plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
  useThemedSelectionColors: false,
  themeCssSelector: (theme) => `[data-theme='${theme.name}']`,
  defaultProps: { showLineNumbers: false },
});
