// @ts-check
import { constants, promises as fs } from "node:fs";
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
    try {
      // Read the SVG files in the public/icons folder
      const iconsDir = path.join(process.cwd(), "public", "icons");
      const files = await fs.readdir(iconsDir, { withFileTypes: true });

      let symbols = "";

      // Build up the SVG sprite from the SVG files
      for (const file of files) {
        if (!file.isFile() || !file.name.endsWith(".svg")) continue;

        const filePath = path.join(iconsDir, file.name);

        // Use constants for file access
        const svgContent = await fs.readFile(filePath, { encoding: "utf8", flag: constants.R_OK });

        const id = file.name.replace(".svg", "");

        // Use regular expressions to capture the style and viewBox attributes
        const styleMatch = svgContent.match(/style="([^"]*)"/);
        const viewBoxMatch = svgContent.match(/viewBox="([^"]*)"/);

        // Construct the new <symbol> element
        const styleAttribute = styleMatch ? `style="${styleMatch[1]}"` : "";
        const viewBoxAttribute = viewBoxMatch ? "" : 'viewBox="0 0 24 24"';

        const replacedContent = svgContent
          .replace(/id="[^"]+"/, "") // Remove any existing id
          .replace("<svg", `<symbol id="${id}" ${viewBoxAttribute} ${styleAttribute}`) // Change <svg> to <symbol>
          .replace("</svg>", "</symbol>")
          .replace(/<\?xml version="1.0" encoding="utf-8"\?>/i, "");
        symbols += replacedContent + "\n";
      }

      // Write the SVG sprite to a file in the public folder
      const sprite = `<?xml version="1.0" encoding="utf-8"?>\n<svg xmlns="http://www.w3.org/2000/svg">\n<defs>\n${symbols}</defs>\n</svg>`;
      await fs.writeFile(path.join(process.cwd(), "public", "sprites.svg"), sprite, {
        flag: constants.W_OK,
      });
    } catch (error) {
      console.error("Error generating icon sprite:", error);
      throw error; // Re-throw the error to signal a failure
    }
  }

  return {
    name: "icon-sprite-plugin",
    /**
     * Hook called during build.
     *
     * @returns {Promise<void>}
     */
    async buildStart() {
      // Generate during build
      await generateIconSprite();
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
        if (changedPath.endsWith(".svg")) await generateIconSprite();
      });
    },
  };
}
