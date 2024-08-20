declare module "css-has-pseudo/browser";

declare global {
	interface ObjectConstructor {
		entries<T extends NonNullable<unknown>>(object: T): ReadonlyArray<Entry<T>>;
	}
}
