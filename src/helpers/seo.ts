/**
 * Formats a URL into its canonical form.
 * Enforces some standard canonical URL formatting across the site.
 *
 * @param {string | URL} url - The URL to be formatted.
 * @param {boolean | undefined} trailingSlash - Allow a trailing slash on the url.
 * @param {URL | string | undefined} base - The base URL
 * @returns {string} - The formatted canonical URL.
 */

export function formatCanonicalURL(
  url: string | URL,
  trailingSlash: boolean = false,
  base: URL | string | undefined = import.meta.env.SITE,
): string {
  const link = url.toString();

  let pathname = link.replace(/\/index.html$/, "");
  if (trailingSlash === false) {
    pathname = pathname.replace(/(\/+)?$/, "");
  } else if (!getUrlExtension(link)) {
    pathname = pathname.replace(/(\/+)?$/, "/");
  }
  pathname = pathname.replace(/\/+/g, "/");
  return new URL(pathname, base).href;
}

function getUrlExtension(url: string) {
  const lastDot = url.lastIndexOf(".");
  const lastSlash = url.lastIndexOf("/");
  return lastDot > lastSlash ? url.slice(lastDot + 1) : "";
}
