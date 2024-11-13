import twPlugin from "tailwindcss/plugin";
import twConfig from "./tailwind.json";

/** @type {import('tailwindcss').Config} */
export default {
  future: "all",
  theme: {
    fluidCols: { fit: "fit", fill: "fill" },
    extend: {
      // colors: twConfig.theme.colors,
      animation: twConfig.theme.animation,
      keyframes: twConfig.theme.keyframes,
    },
  },
  plugins: [
    twPlugin(({ theme, addUtilities, addVariant, matchUtilities }) => {
      addVariant("optional", "&:optional");
      addVariant("hocus", ["&:hover", "&:focus"]);
      addVariant("inverted-colors", "@media (inverted-colors: inverted)");

      addUtilities({
        ".auto-fit": { "--tw-repeat": "auto-fit" },
        ".auto-fill": { "--tw-repeat": "auto-fill" },
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
        ".bg-w-full": {
          backgroundColor: "currentColor",
          boxShadow: "0 0 0 100vmax currentColor, 0 0 2rem currentColor",
          clipPath: "inset(0 -100vmax)",
        },
      });

      matchUtilities(
        {
          "grid-cols-fluid": (value) => ({
            gridTemplateColumns: `repeat(var(--tw-repeat), minmax(min(100%, ${value}), 1fr))`,
          }),
        },
        { values: theme("width") },
      );
    }),
  ],
};
