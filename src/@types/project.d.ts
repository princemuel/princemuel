type Prettify<T> = { [K in keyof T]: T[K] } & NonNullable<unknown>;

type RequireSome<T, P extends keyof T> = Omit<T, P> & Required<Pick<T, P>>;

type MapKeys<M extends Map<unknown, unknown>> = Prettify<
  Array<Parameters<M["get"]>[0]>
>;

type A = { name: string; age: number; address: { zip: string } };
type B = { email: string };

type C = Prettify<A & B>;

type IterableToArray<T> =
  T extends Iterable<infer I> ? I[]
  : T extends ArrayLike<infer A> ? A[]
  : never;
