/* eslint-disable @typescript-eslint/ban-types */
/*===============================*
          HELPER TYPES
 *===============================*
*/

type LooseAutocomplete<T extends string> = T | Omit<string, T>;

type Prettify<T> = { [K in keyof T]: T[K] } & NonNullable<unknown>;
type Lookup<T> = { [K in keyof T]: { key: K } }[keyof T];
type MapKeys<M extends Map<unknown, unknown>> = Prettify<
  Array<Parameters<M["get"]>[0]>
>;
type IterableToArray<T> = T extends Iterable<infer I>
  ? I[]
  : T extends ArrayLike<infer A>
    ? A[]
    : never;

type ObjectEntry<T extends NonNullable<unknown>> = T extends object
  ? { [K in keyof T]: [K, Required<T>[K]] }[keyof T] extends infer E
    ? E extends [infer K extends string | number, infer V]
      ? [`${K}`, V]
      : never
    : never
  : never;

type TupleEntry<
  T extends readonly unknown[],
  I extends unknown[] = [],
  R = never,
> = T extends readonly [infer Head, ...infer Tail]
  ? TupleEntry<Tail, [...I, unknown], R | [`${I["length"]}`, Head]>
  : R;

type Entry<T extends NonNullable<unknown>> = T extends readonly [unknown, ...unknown[]]
  ? TupleEntry<T>
  : T extends ReadonlyArray<infer U>
    ? [`${number}`, U]
    : ObjectEntry<T>;

type Expand<T> = T extends (...args: infer A) => infer R
  ? (...args: Expand<A>) => Expand<R>
  : T extends object
    ? T extends infer O
      ? { [K in keyof O]: Expand<O[K]> }
      : never
    : T;

type RequireSome<T, P extends keyof T> = Omit<T, P> & Required<Pick<T, P>>;
type RequiredKeys<T> = {
  [K in keyof T]-?: NonNullable<unknown> extends { [P in K]: T[K] } ? never : K;
}[keyof T];

type DeepRequired<T> = T extends BrowserNativeObject | Blob
  ? T
  : {
      [K in keyof T]-?: NonNullable<DeepRequired<T[K]>>;
    };

// biome-ignore lint/complexity/noBannedTypes: <explanation>
type DeepPartial<T> = T extends Function
  ? T
  : T extends Array<infer A>
    ? DeepPartialArray<A>
    : T extends object
      ? DeepPartialObject<T>
      : T | undefined;

type DeepPartialObject<T> = {
  [K in keyof T]?: DeepPartial<T[K]>;
};
type DeepPartialArray<T> = Array<DeepPartial<T>>;

type KeyValuePair<K extends keyof unknown = string, V = string> = Record<K, V>;

interface RecursiveKeyValuePair<K extends keyof unknown = string, V = string> {
  [key: K]: V | RecursiveKeyValuePair<K, V>;
}

type CSSRuleObject = RecursiveKeyValuePair<string, null | string | string[]>;

type OptionalUnion<
  U extends Record<string, unknown>,
  A extends keyof U = U extends U ? keyof U : never,
> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;

type IfAvailable<T, Fallback = void> = true | false extends (
  T extends never
    ? true
    : false
)
  ? Fallback
  : keyof T extends never
    ? Fallback
    : T;

type WeakReferences =
  | IfAvailable<WeakMap<unknown, unknown>>
  | IfAvailable<WeakSet<unknown>>;
/**
 * A type of a function accepting an arbitrary amount of arguments
 */
type VariadicFunction = (...args: unknown[]) => unknown;

type GuardQualifier<Function extends VariadicFunction> = [
  validator: <Result extends boolean>(...args: Parameters<Function>) => Result,
  executor: Function,
];

/**
 * A type of a function accepting exactly one argument
 */
type UnaryFunction = (arg: unknown) => unknown;

/**
 * Makes a composition of functions from received arguments.
 */
type Compose<
  Arguments extends unknown[],
  Functions extends unknown[] = [],
> = Arguments["length"] extends 0
  ? Functions
  : Arguments extends [infer A, infer B]
    ? [...Functions, (arg: A) => B]
    : Arguments extends [infer A, ...infer Rest, infer P, infer L]
      ? Compose<[A, ...Rest, P], [...Functions, (arg: P) => L]>
      : [];

/**
 * Destructures a composition of functions into arguments.
 */
type Decompose<
  Functions extends UnaryFunction[],
  Arguments extends unknown[] = [],
> = Functions extends [(arg: infer Arg) => infer Return]
  ? [...Arguments, Arg, Return]
  : Functions extends [
        ...infer Rest extends UnaryFunction[],
        (arg: infer Arg) => unknown,
      ]
    ? Decompose<Rest, [...Arguments, Arg]>
    : [];

type JSONValue =
  | string
  | number
  | boolean
  | JSONValue[]
  | {
      [k: string]: JSONValue;
    };

type PrimitiveType = string | number | bigint | boolean | symbol | null | undefined;

// biome-ignore lint/complexity/noBannedTypes: <explanation>
type AtomicObject = Function | RegExp | Promise<unknown> | Date;
type BrowserNativeObject = Date | FileList | File;

// get method names in an object
type FunctionPropertyNames<T> = {
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

// get non method names in an object
type NonFunctionPropertyNames<T> = {
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  [P in keyof T]: T[P] extends Function ? never : P;
}[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

type Immutable<T> = T extends PrimitiveType
  ? T
  : T extends AtomicObject
    ? T
    : T extends Array<infer A>
      ? ReadonlyArray<Immutable<A>>
      : T extends IfAvailable<ReadonlyMap<infer K, infer V>>
        ? ReadonlyMap<Immutable<K>, Immutable<V>>
        : T extends IfAvailable<ReadonlySet<infer S>>
          ? ReadonlySet<Immutable<S>>
          : T extends WeakReferences
            ? T
            : T extends object
              ? {
                  // !NOTE: removes methods on object
                  readonly [P in NonFunctionPropertyNames<T>]: Immutable<T[P]>;
                  // !NOTE: use { readonly [P in keyof T]: Immutable<T[P]> } to add methods
                }
              : unknown;
