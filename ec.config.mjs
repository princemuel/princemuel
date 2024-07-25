import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { defineEcConfig } from "astro-expressive-code";
import twConfig from "./config/tailwind.json" assert { type: "json" };

export default defineEcConfig({
  themes: ["dracula", "github-light"],
  styleOverrides: {
    borderRadius: "0.3rem",
    frames: {
      editorActiveTabIndicatorHeight: "2px",
      // editorTabBarBackground: '#333333',
      // editorActiveTabForeground: "#A682FF",
      // editorActiveTabForeground: '#FFFFFF',
      // editorActiveTabIndicatorBottomColor: "#A682FF",
      // editorActiveTabIndicatorBottomColor: '#aaaaaa00',
      // editorTabBarBorderColor: "#333333"
      // editorTabBarBorderColor: "#A682FF",
    },
    codeFontFamily: twConfig.theme.fontFamily.mono,
    uiFontFamily: twConfig.theme.fontFamily.sans,
    borderColor: "#A682FF",
  },
  plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
  useThemedSelectionColors: false,
  themeCssSelector: (theme) => `[data-reader-theme='${theme.name}']`,
  defaultProps: { showLineNumbers: false },
});
