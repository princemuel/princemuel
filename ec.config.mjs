import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { defineEcConfig } from "astro-expressive-code";
import twConfig from "./config/tailwind.json" assert { type: "json" };

export default defineEcConfig({
	themes: ["github-dark-default", "github-light-default"],
	styleOverrides: {
		codeFontFamily: twConfig.theme.fontFamily.mono,
		uiFontFamily: twConfig.theme.fontFamily.sans,
	},
	plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
	useThemedSelectionColors: false,
	themeCssSelector: (theme) => `[data-reader-theme='${theme.name}']`,
	defaultProps: { showLineNumbers: false },
});
