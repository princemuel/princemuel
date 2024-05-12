import { cn, type CnOptions } from "tailwind-variants";

export const isBrowser = (() =>
  typeof window !== "undefined" &&
  typeof HTMLElement !== "undefined" &&
  !!window.document &&
  String(HTMLElement).includes("[native code]"))();
export const isServer = !isBrowser;

export const tw = (...classes: CnOptions) => cn(...classes)({ twMerge: true });

/*---------------------------------*
            STRING UTILS           *
  ---------------------------------*
 */

export function capitalize(str: string) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toLocaleUpperCase() + str.slice(1).toLocaleUpperCase();
}

export const truncate = (str: string, length: number) => {
  if (!str || typeof str !== "string" || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

export const str_to_bool = (value = "false") => JSON.parse(value) as boolean;

export function pluralize<
  C extends number,
  N extends string,
  P extends string = `${N}s`,
>(count: C, noun: N, plural?: P) {
  return (count === 1 ? noun : plural ?? `${noun}s`) as C extends 1 ? N : P;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type EndsWith<W, S extends string> = W extends `${infer _}${S}` ? W : never;

export const endsWith = <Word extends string, Suffix extends string>(
  str: Word,
  suffix: Suffix,
): str is EndsWith<Word, Suffix> => {
  return str.endsWith(suffix);
};

/*---------------------------------*
            NUMBER UTILS           *
  ---------------------------------*
 */

export function approximate(num = 0, fractionDigits = 2) {
  return Number.parseFloat(num.toFixed(fractionDigits));
}

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

export const formatDate = (
  dateString: ConstructorParameters<typeof Date>[0] | null,
  showTime = false,
) => {
  const date = dateString ? new Date(dateString) : new Date();

  const dateStamp = date.toLocaleString("en-US", {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  });
  const timeStamp = date.toLocaleTimeString();

  return `${dateStamp} ${showTime ? `@${timeStamp}` : ""}`;
};

export const date_formatter = (
  locales?: Intl.LocalesArgument,
  options?: Intl.DateTimeFormatOptions,
) => {
  const language = locales || (isServer ? "en-US" : navigator.language);
  return new Intl.DateTimeFormat(language, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    ...options,
  });
};

/*---------------------------------*
            ARRAY UTILS            *
  ---------------------------------*
 */

export function hasValues<T>(
  value: T[] | null | undefined,
): value is NonNullable<T[]> {
  return Array.isArray(value) && value.length > 0;
}

export function range(start: number, stop: number, step: number) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step,
  );
}

export const unique = <T>(array: T[]) => [...new Set(array)];

export const difference = <T>(a: T[], b: T[]) =>
  a.filter((item) => !b.includes(item));

export const intersection = <T>(arr: T[], ...args: T[][]) =>
  arr.filter((item) => args.every((value) => value.includes(item)));

/*---------------------------------*
            OBJECT UTILS           *
  ---------------------------------*
 */

export function serialize<T>(data: T) {
  return JSON.parse(JSON.stringify(data)) as NonNullable<T>;
}

export function singleton<T>(name: string, callback: () => T) {
  const g = globalThis as unknown as globalThis;
  g.__singletons ??= new Map<string, T>();

  if (!g.__singletons.has(name)) g.__singletons.set(name, callback());
  return g.__singletons.get(name) as NonNullable<T>;
}

export function omitFields<T extends Record<string, any>, K extends keyof T>(
  source: T,
  fieldsToOmit: K[],
): Omit<T, K> {
  if (!isObject(source)) throw new Error("Source must be an object.");

  return Object.fromEntries(
    Object.entries(source).filter(([key]) => !fieldsToOmit.includes(key as K)),
  ) as Omit<T, K>;
}

export const isObject = (value: unknown): value is NonNullable<unknown> => {
  return Object.prototype.toString.call(value) === "[object Object]";
};

export function convertTime(
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0,
) {
  if (
    typeof days !== "number" ||
    typeof hours !== "number" ||
    typeof minutes !== "number" ||
    typeof seconds !== "number" ||
    typeof milliseconds !== "number"
  ) {
    throw new Error("All input values must be numbers.");
  }

  // Ensure non-negative values
  if (days < 0 || hours < 0 || minutes < 0 || seconds < 0 || milliseconds < 0) {
    throw new Error("All input values must be non-negative.");
  }

  // Calculate total milliseconds
  const totalMs =
    (((days * 24 + hours) * 60 + minutes) * 60 + seconds) * 1000 + milliseconds;

  // Calculate other units
  const totalSecs = totalMs / 1000;
  const totalMins = totalSecs / 60;
  const totalHrs = totalMins / 60;
  const totalDays = totalHrs / 24;

  return {
    ms: totalMs,
    secs: totalSecs,
    mins: totalMins,
    hours: totalHrs,
    days: totalDays,
  };
}
