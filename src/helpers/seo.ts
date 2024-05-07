/**
 * Formats a URL into its canonical form.
 * Enforces some standard canonical URL formatting across the site.
 *
 * @param {string | URL} url - The URL to be formatted.
 * @returns {string} - The formatted canonical URL.
 */
export function formatCanonicalURL(url: string | URL): string {
  const path = url.toString();
  return path.includes("?") ? path.replace(/\/?$/, "") : path.replace(/\/?$/, "/");
}
