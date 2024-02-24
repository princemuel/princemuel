declare module "css-has-pseudo/browser";

declare global {
  interface ObjectConstructor {
    entries<T extends {}>(object: T): ReadonlyArray<Misc.Entry<T>>;
  }
}
