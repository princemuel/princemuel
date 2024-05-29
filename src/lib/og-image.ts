/**
 * Get the path to the OpenGraph image for a page
 */
export const getOgImageUrl = <T extends `/${string}/`>(
  path = "",
  prefix: T,
) => {
  const imagePath =
    path.replace(/^\//, "").replace(/\/$/, "").replace(/^$/, "index") + ".png";
  return prefix + imagePath;
};
