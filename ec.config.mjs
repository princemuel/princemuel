//@ts-check
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { defineEcConfig } from "astro-expressive-code";
import twDefaultTheme from "tailwindcss/defaultTheme";
import twConfig from "./tailwind.json" with { type: "json" };

export default defineEcConfig({
  themes: ["github-dark-high-contrast", "github-light-high-contrast"],
  styleOverrides: {
    codeFontFamily: [twConfig.theme.fontFamily.mono, ...twDefaultTheme.fontFamily.mono].join(
      ",",
    ),
    uiFontFamily: [twConfig.theme.fontFamily.sans, ...twDefaultTheme.fontFamily.sans].join(","),
  },
  plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
  useThemedSelectionColors: false,
  themeCssSelector: (theme) => `[data-reader-theme='${theme.name}']`,
  defaultProps: { showLineNumbers: false },
  emitExternalStylesheet: true,
});
