import type { AstroFont } from "astro-font";
import type { ComponentProps } from "astro/types";
import { join } from "node:path";
import { cwd } from "node:process";

const font_dir = join(cwd(), "static", "fonts");

type FontConfig = ComponentProps<typeof AstroFont>["config"][0];

export const fontSans: FontConfig = {
  name: "__FontSans",
  fallbackName: "__FontSans_Fallback",
  fallback: "sans-serif",
  display: "swap",
  selector: ".__sans__",
  cssVariable: "font-sans",
  src: [
    {
      path: join(font_dir, "WotfardSemiBold.ttf"),
      weight: "600",
      style: "normal",
      css: { "font-feature-settings": "normal" },
    },
    {
      path: join(font_dir, "WotfardMedium.ttf"),
      weight: "500",
      style: "normal",
      css: { "font-feature-settings": "normal" },
    },
    {
      path: join(font_dir, "WotfardRegular.ttf"),
      weight: "400",
      style: "normal",
      css: { "font-feature-settings": "normal" },
    },
  ],
};
