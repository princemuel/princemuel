import { isBrowser } from "@/helpers/utils";
import { $, component$, useOnDocument } from "@builder.io/qwik";

// export type ThemesType = "light" | "dark";

type ITheme = Lowercase<`${keyof typeof THEME}`>;

export type ThemesType = Exclude<ITheme, "auto">;

export type ThemesWithAutoType = Lowercase<`${keyof typeof THEME}`>;

export const THEME = {
  LIGHT: "light",
  DARK: "dark",
  AUTO: "auto",
} as const;

const setTheme = (theme: ThemesType) => {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.setAttribute(
    "data-dark-reader-theme",
    `github-${theme}`,
  );
};

const mediaQueryList = isBrowser
  ? window.matchMedia("(prefers-color-scheme: dark)")
  : null;

export const colorSchemeChangeHandler = (e: MediaQueryListEvent) => {
  setTheme(e.matches ? THEME.DARK : THEME.LIGHT);
};

export const handleMediaQuery = (theme: string) => {
  if (mediaQueryList) {
    theme === "auto"
      ? mediaQueryList.addEventListener("change", colorSchemeChangeHandler)
      : mediaQueryList.removeEventListener("change", colorSchemeChangeHandler);
  }
};

export type ThemeScriptProps = {
  themeStorageKey: string;
  themeQuery?: string;
};

export const ThemeScript = component$(
  ({ themeStorageKey, themeQuery }: ThemeScriptProps) => {
    useOnDocument(
      "DOMContentLoaded",
      $(() => {
        const themePref = localStorage.getItem(themeStorageKey);
        if (
          themePref &&
          [THEME.LIGHT, THEME.DARK, THEME.AUTO].includes(themePref)
        ) {
          handleMediaQuery(themePref);
        }
      }),
    );

    const themeScript = `
      const params = new URLSearchParams(location.search);
      let themePref = localStorage.getItem("${themeStorageKey}");
      const themeQ = params.get("${themeQuery}");

      if (
        themeQ &&
        ["${THEME.LIGHT}", "${THEME.DARK}", "${THEME.AUTO}"].includes(themeQ)
      ) {
        if (themePref && themePref !== themeQ) {
          themePref = themeQ;
          localStorage.setItem("${themeStorageKey}", themePref);
        }
      } else if (!themePref) {
        themePref = "${THEME.AUTO}";
        localStorage.setItem("${themeStorageKey}", themePref);
      }

      if (!themeQ || (themePref && themePref !== themeQ)) {
        if ("${themeQuery}" !== "undefined") {
          params.set("${themeQuery}", themePref);
          window.location.replace(window.location.pathname + "?" + params.toString());
        }
      }

      const attrTheme =
        themePref === "${THEME.AUTO}"
          ? window.matchMedia("(prefers-color-scheme: ${THEME.DARK})").matches
            ? "${THEME.DARK}"
            : "${THEME.LIGHT}"
          : themePref;

      document.documentElement.setAttribute("data-theme", attrTheme);
      document.documentElement.setAttribute("icon-theme", themePref);
      document.documentElement.setAttribute(
        "data-dark-reader-theme",
        "github-" + attrTheme
      );
  `;
    return <script dangerouslySetInnerHTML={themeScript} />;
  },
);
