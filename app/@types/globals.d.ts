declare module "css-has-pseudo/browser";
declare module "virtual:astro-icon" {
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  export type Icon = string | {};
}

declare global {
  interface ObjectConstructor {
    entries<T extends NonNullable<unknown>>(object: T): ReadonlyArray<Entry<T>>;
  }
}
