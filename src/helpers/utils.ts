import { cn, type CnOptions } from "tailwind-variants";

export const tw = <T extends CnOptions>(...classes: T) =>
  cn(...classes)({ twMerge: true });

export function pluralize<
  C extends number,
  N extends string,
  P extends string = `${N}s`,
>(count: C, noun: N, plural?: P) {
  return (count === 1 ? noun : plural ?? `${noun}s`) as C extends 1 ? N : P;
}

export const unique = <T>(array: T[]) => {
  return [...new Set(array)];
};

/**
 * Safely parses a value to a number and guards against NaN and negative zero.
 * @param {any} value - The value to be parsed.
 * @param {number} [defaultValue=0] - The default value to be returned if parsing fails.
 * @returns {number} The parsed number or the default value.
 */
export const numberGuard = (value: any, defaultValue: number = 0): number => {
  const parsed = Number(value);
  return Number.isNaN(parsed) || Object.is(parsed, -0) ? defaultValue : parsed;
};

export function formatNumber(num: number, digits?: number | undefined) {
  if (!num) return "0";

  const LOOKUP = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];

  const TRAILING_ZERO_REGEX = /\.0+$|(\.[0-9]*[1-9])0+$/;

  const { value, symbol } = LOOKUP.slice()
    .reverse()
    .find((item) => num >= item.value) || { value: 1, symbol: "" };

  const validDigits = digits ? Math.abs(digits) : 1;

  return (
    (num / value).toFixed(validDigits).replace(TRAILING_ZERO_REGEX, "$1") +
    symbol
  );
}

export function capitalize(str: string) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const truncate = (str: string, length: number) => {
  if (!str || typeof str !== "string" || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

export const formatDate = (
  dateString: string | number | Date,
  showTime = false,
) => {
  const date = new Date(dateString);

  const dateStamp = new Date(dateString).toLocaleString("en-US", {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  });
  const timeStamp = date.toLocaleTimeString();

  return `${dateStamp} ${showTime ? `@${timeStamp}` : ""}`;
};

export const difference = <T>(a: T[], b: T[]) =>
  a.filter((item) => !b.includes(item));

export const intersection = <T>(arr: T[], ...args: T[][]) =>
  arr.filter((item) => args.every((value) => value.includes(item)));

export function singleton<T>(name: string, callback: () => T): NonNullable<T> {
  const g = globalThis as any;
  g.__singletons ??= new Map();

  if (!g.__singletons.has(name)) g.__singletons.set(name, callback());
  return g.__singletons.get(name);
}
