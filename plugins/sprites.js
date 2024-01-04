import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * @typedef {import('vite').ViteDevServer} ViteDevServer
 * @typedef {{
 *   watcher: {
 *     add: (value: string) => void;
 *     on: (value: string, callback: (changedPath: string) => Promise<void>) => void;
 *   };
 * }} ServerOptions
 */

/**
 * @typedef {{
 *   configureServer: (server: ViteDevServer) => void;
 *   buildStart: () => Promise<void>;
 *   name: string;
 * }} IconSpritePlugin
 */

/**
 * Icon Sprite Plugin for Vite.
 *
 * @returns {IconSpritePlugin}
 */
export default function IconSpritePlugin() {
  /**
   * Generate the SVG sprite during build.
   *
   * @throws {Error} If there is an error generating the icon sprite.
   * @returns {Promise<void>}
   */
  async function generateIconSprite() {
    // Read the SVG files in the public/icons folder
    const iconsDir = path.join(process.cwd(), "public", "icons");
    const files = await fs.readdir(iconsDir);
    let symbols = "";

    // Build up the SVG sprite from the SVG files
    for (const file of files) {
      if (!file.endsWith(".svg")) continue;
      let svgContent = await fs.readFile(path.join(iconsDir, file), "utf8");
      const id = file.replace(".svg", "");
      svgContent = svgContent
        .replace(/id="[^"]+"/, "") // Remove any existing id
        .replace("<svg", `<symbol id="${id}"`) // Change <svg> to <symbol>
        .replace("</svg>", "</symbol>");
      symbols += svgContent + "\n";
    }

    // Write the SVG sprite to a file in the public folder
    const sprite = `<svg width="0" height="0" style="display: none">\n\n${symbols}</svg>`;
    await fs.writeFile(path.join(process.cwd(), "public", "sprites.svg"), sprite);
  }

  return {
    name: "icon-sprite-plugin",
    /**
     * Hook called during build.
     *
     * @returns {Promise<void>}
     */
    buildStart() {
      // Generate during build
      return generateIconSprite();
    },
    /**
     * Configure the Vite development server.
     * @param {ViteDevServer} server - The Vite development server instance.
     * @returns {void}
     */
    configureServer(server) {
      // Regenerate during development whenever an icon is added
      server.watcher.add(path.join(process.cwd(), "public", "icons", "*.svg"));
      server.watcher.on("change", async (changedPath) => {
        if (changedPath.endsWith(".svg")) return generateIconSprite();
      });
    },
  };
}
