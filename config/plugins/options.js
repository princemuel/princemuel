import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { pluginErrorPreview, pluginFirstWordRed } from "./plugins";

/** @type {import('astro-expressive-code').AstroExpressiveCodeOptions} */
export const ecCodeOptions = {
  themes: ["vitesse-black"],
  styleOverrides: {
    borderRadius: "0.2rem",
    frames: { editorActiveTabIndicatorHeight: "2px" },
    codeFontFamily: "__FontMono",
    uiFontFamily: "__FontSans",
  },
  plugins: [pluginCollapsibleSections(), pluginLineNumbers(), pluginFirstWordRed(), pluginErrorPreview()],
  useThemedSelectionColors: false,
  themeCssSelector: (theme) => `[data-reader-theme='${theme.name}']`,
  defaultProps: { showLineNumbers: false },
};

/** @type {import('@astrojs/sitemap').SitemapOptions} */
export const sitemapOptions = {
  changefreq: "daily",
  priority: 0.7,
  lastmod: new Date(),
  filter: (page) => !(page.includes("/api/") || page.includes(".xml")),
};
