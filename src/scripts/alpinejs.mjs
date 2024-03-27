import intersect from "@alpinejs/intersect";
import persist from "@alpinejs/persist";

/**
 * Define the types for alpine
 * @typedef {import('alpinejs').Alpine} Alpine
 *
 * Initialize Alpine.js plugins.
 * @param {Alpine} Alpine - The Alpine instance.
 */
export default (Alpine) => {
  Alpine.plugin(intersect);
  Alpine.plugin(persist);
};
