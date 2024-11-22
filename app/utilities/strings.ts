import { type CnOptions, cn } from "tailwind-variants";

export const tw = (...classes: CnOptions) => cn(...classes)({ twMerge: true });

/*---------------------------------*
            STRING UTILS           *
  ---------------------------------*
 */

export function capitalize<S extends string>(str: S) {
  return (str.charAt(0).toLocaleUpperCase() +
    str.slice(1).toLocaleUpperCase()) as Capitalize<typeof str>;
}

export const normalize = (str: string) => str.replace(/[^\w]/g, "-");

export const truncate = (str: string, length: number) => {
  if (!str || typeof str !== "string" || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

export const str_to_bool = (value?: string | null) =>
  JSON.parse(value ?? "false") as boolean;

export function pluralize<
  C extends number,
  N extends string,
  P extends string = `${N}s`,
>(count: C, noun: N, plural?: P) {
  return (count === 1 ? noun : (plural ?? `${noun}s`)) as C extends 1 ? N : P;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type EndsWith<W, S extends string> = W extends `${infer _}${S}` ? W : never;

export const endsWith = <W extends string, S extends string>(
  str: W,
  suffix: S,
): str is EndsWith<W, S> => {
  return str.endsWith(suffix);
};
