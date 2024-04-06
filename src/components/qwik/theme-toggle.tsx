import {
  $,
  component$,
  useSignal,
  useStyles$,
  type Signal,
} from "@builder.io/qwik";
import { HiMoonSolid, HiSunSolid } from "@qwikest/icons/heroicons";
import type {
  ThemeScriptProps,
  ThemesType,
  ThemesWithAutoType,
} from "./theme-script";
import { THEME, handleMediaQuery } from "./theme-script";
import styles from "./themeicon.css?inline";

const setThemeTailwind = (theme: ThemesType) => {
  if (theme === THEME.DARK) {
    document.documentElement.classList.remove(`${THEME.LIGHT}`);
    document.documentElement.classList.add(`${THEME.DARK}`);
  }
  if (theme === THEME.LIGHT) {
    document.documentElement.classList.remove(`${THEME.DARK}`);
    document.documentElement.classList.add(`${THEME.LIGHT}`);
  }
};

const setThemeDaisyUI = (theme: ThemesType) => {
  document.documentElement.setAttribute("data-theme", theme);
};

const setThemeQparams = (
  theme: ThemesWithAutoType,
  themeQuery: string | undefined,
) => {
  if (!themeQuery) {
    return;
  }
  const params = new URLSearchParams(location.search);
  params.set(themeQuery, theme);
  window.history.replaceState(
    {},
    "",
    decodeURIComponent(`${location.pathname}?${params}`),
  );
};

export type ThemeToggleProps = {
  textSize: string;
  myClass?: string;
};

export const ThemeToggle = component$(
  ({
    themeStorageKey,
    themeQuery,
    textSize,
    myClass,
  }: ThemeScriptProps & ThemeToggleProps) => {
    const selectedIcon: Signal<ThemesWithAutoType> = useSignal(THEME.AUTO);
    useStyles$(styles);
    const ApplyTheme = $(
      (
        themeStorageKey: string,
        icon: ThemesWithAutoType,
        theme: ThemesType,
      ) => {
        // save theme in localstorage
        localStorage.setItem(themeStorageKey, icon);
        //apply theme in daisyui
        document.documentElement.setAttribute("icon-theme", icon);
        setThemeDaisyUI(theme);
        //apply theme in tailwind
        setThemeTailwind(theme);
        //mediaQuery Subscribtion handler
        handleMediaQuery(icon);
        //set theme in query params
        setThemeQparams(icon, themeQuery);
      },
    );

    // Define an async function that is executed when theme toggle button is clicked
    const handleThemeToggle$ = $(async () => {
      // Initialize variable to hold the chosen theme
      let dataTheme: ThemesType;

      // Get the theme mode value from local storage, or default to AUTO if it's not present
      const themeModeValue =
        localStorage.getItem(themeStorageKey) || THEME.AUTO;

      // Switch case to handle the theme toggle logic based on the theme mode value
      switch (themeModeValue) {
        // If the current theme is AUTO, change it to DARK
        case THEME.AUTO:
          dataTheme = THEME.DARK;
          selectedIcon.value = THEME.DARK;
          break;

        // If the current theme is DARK, change it to LIGHT
        case THEME.DARK:
          dataTheme = THEME.LIGHT;
          selectedIcon.value = THEME.LIGHT;
          break;

        // If the current theme is LIGHT or any other value, toggle it based on user's system preference
        default:
          selectedIcon.value = THEME.AUTO;
          // Use the Media Query API to check if user prefers dark color scheme
          dataTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? THEME.DARK
            : THEME.LIGHT;
          break;
      }

      // Apply the chosen theme using the ApplyTheme function
      ApplyTheme(themeStorageKey, selectedIcon.value, dataTheme);
    });

    return (
      <button
        type="button"
        class={`toggle-button h-[1em] w-[1em] p-1 ${textSize} ${myClass}`}
        onClick$={handleThemeToggle$}
      >
        <div class="sun">
          <HiSunSolid />
        </div>
        <div class="moon">
          <HiMoonSolid />
        </div>
        <div class="auto fill-current">
          <AutoIcon />
        </div>
      </button>
    );
  },
);

export const AutoIcon = component$(() => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      width="1em"
      height="1em"
    >
      <path d="M10.85 12.65h2.3L12 9l-1.15 3.65zM20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM14.3 16l-.7-2h-3.2l-.7 2H7.8L11 7h2l3.2 9h-1.9z"></path>
    </svg>
  );
});
