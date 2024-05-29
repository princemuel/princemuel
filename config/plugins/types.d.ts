declare module "astro-htmx";

type UnArray<T> = NonNullable<T extends (infer U)[] ? U : T>;
