export const isBrowser = (() =>
  typeof window !== "undefined" &&
  typeof HTMLElement !== "undefined" &&
  Boolean(window.document) &&
  String(HTMLElement).includes("[native code]"))();
export const isServer = !isBrowser;
