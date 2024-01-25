// eslint-disable-next-line @typescript-eslint/ban-types
type Prettify<T> = { [K in keyof T]: T[K] } & {};

type RequireSome<T, P extends keyof T> = Omit<T, P> & Required<Pick<T, P>>;

type MapKeys<M extends Map<unknown, unknown>> = Prettify<Array<Parameters<M["get"]>[0]>>;
