/**
 * Formats a URL into its canonical form.
 * Enforces some standard canonical URL formatting across the site.
 *
 * @param {string | URL} url - The URL to be formatted.
 * @returns {string} - The formatted canonical URL.
 */
export function formatCanonicalURL(url: string | URL): string {
  let path = url.toString();
  const hasQueryParams = path.includes("?");

  path = hasQueryParams ? path.replace(/\/?$/, "") : path.replace(/\/?$/, "/");

  return path;
}
