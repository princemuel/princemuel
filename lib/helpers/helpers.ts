import { cx } from 'cva';
import { ClassValue } from 'cva/dist/types';

import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  // classGroups: {
  //   'font-size': [{ text: ['100', '200', '300', '400', '500', '600', '700'] }],
  // },
});

export function cn(...args: ClassValue[]) {
  return customTwMerge(cx(args));
}

/*---------------------------------*
            STRING UTILS           *
  ---------------------------------*
 */
// Success! 🌈
export function capitalize(string = '') {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}
export const trim = (string = '') => string.trim();

export function removeFirstChar(string = '') {
  return string?.slice(1);
}
export function pluralize(word: string, value: number) {
  return value === 1 ? `${word}` : `${word}s`;
}

export function truncate(word = '', length = word.length) {
  return word.length > length ? `${word.substring(0, length)}...` : word;
}

type EndsWith<W, S extends string> = W extends `${infer _R}${S}` ? W : never;

export const endsWith = <Word extends string, Suffix extends string>(
  str: Word,
  suffix: Suffix
): str is EndsWith<Word, Suffix> => {
  return str.endsWith(suffix);
};

const min = (a: number, b: number) => Math.min(a, b);
const max = (a: number, b: number) => Math.max(a, b);

export function clamp(value: number, a: number, b: number) {
  return min(max(value, min(a, b)), max(a, b));
}

export function safeNum(value: any, defaultValue = 0): number {
  const updated = Number(value);
  return Number.isNaN(updated) || isNaN(updated) ? defaultValue : updated;
}

/*---------------------------------*
            OBJECT UTILS           *
  ---------------------------------*
 */

export function serialize<T>(data: T): NonNullable<T> {
  return JSON.parse(JSON.stringify(data));
}

export const objectKeys = <O extends {}>(object: O): (keyof O)[] => {
  return Object.keys(object) as (keyof O)[];
};

/*---------------------------------*
            ARRAY UTILS           *
  ---------------------------------*
 */

export function hasValues<T>(
  array: T[] | null | undefined
): array is NonNullable<T[]> {
  return (array || []).length > 0;
}

// export const sortBy = <T>(
//   arr: T[],
//   key: string,
//   direction = 'asc',
//   callback: any
// ) => {
//   const compareFn =
//     callback ||
//     function (a: any, b: any) {
//       if (a > b) return 1;
//       else if (a < b) return -1;
//       else return 0;
//     };

//   return arr.sort((a, b) => {
//     return compareFn(
//       sortBy === 'asc' ? a[key] : b[key],
//       sortBy === 'asc' ? b[key] : a[key]
//     );
//   });
// };

// export const isEmpty = (obj) => Object.keys(obj).length === 0;

// reverse array function using iterators
export function reverse<T>(data: ArrayLike<T>): Iterable<T> {
  return {
    [Symbol.iterator](): Iterator<T> {
      let len = data.length;
      return {
        next(): IteratorResult<T> {
          return len
            ? { value: data[--len], done: false }
            : { value: undefined, done: true };
        },
      };
    },
  };
}

/**
 * A Generic Ranking Algorithm
 * @param items T[]
 * @param order 'asc' | 'desc'
 * @returns An array containing the sorted items according to the ranking algorithm
 */

export const rank = <T>(
  items: T[],
  order: 'asc' | 'desc',
  callbackfn: (value: T) => number
) => {
  return items
    .map((item) => ({
      item,
      rank: callbackfn(item),
    }))
    .sort((a, b) => (order === 'asc' ? a.rank - b.rank : b.rank - a.rank))
    .map((ranked) => ranked.item);
};

/*---------------------------------*
            FUNCTION UTILS         *
  ---------------------------------*
 */

/**
 * A simple type guard for objects.
 *
 * @param obj - A possible object
 */
export function isObject(obj: unknown): obj is Record<string, unknown> {
  return typeof obj === 'object' && obj !== null;
}
/**
 * This method will call the callback for every value in the
 * object, and return a new object with transformed values.
 * This is useful if, eg., you need to capitalize every value in
 * a dictionary-style object with string values.
 */
export const transformValues = <T extends object>(
  data: T,
  callback: (key: string, value: unknown) => any
) => {
  if (typeof data !== 'object') return data;

  return Object.entries(data).reduce((values, [key, value]) => {
    return {
      ...values,
      [key]: callback(key, value),
    };
  }, {});
};

/*---------------------------------*
            DATE UTILS             *
  ---------------------------------*
 */

type FormatDateFunction = (
  date?: string,
  formatOptions?: Intl.DateTimeFormatOptions[],
  separator?: string
) => string;

export const formatDate: FormatDateFunction = (
  date = new Date().toISOString(),
  formatOptions = [{ day: 'numeric' }, { month: 'short' }, { year: 'numeric' }],
  separator = ' '
) => {
  return formatOptions
    .map((options) => {
      const dateFormatter = new Intl.DateTimeFormat('en', options);
      return dateFormatter.format(new Date(date));
    })
    .join(separator);
};

/*---------------------------------*
            BROWSER UTILS          *
  ---------------------------------*
 */
export const isBrowser = typeof window !== 'undefined';
export const isNavigator = typeof navigator !== 'undefined';

const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i;
const userAgent = isNavigator ? navigator.userAgent : 'node';

export const IS_MOBILE_USER_AGENT = mobileRegex.test(userAgent);

export function pixelToRem(value: number | string) {
  return 0.0625 * safeNum(value);
}

type DOMEventListenerTarget = Window | Document | HTMLElement | EventTarget;

export function on<T extends DOMEventListenerTarget>(
  obj: T | null,
  ...args: Parameters<T['addEventListener']> | [string, Function | null, ...any]
): void {
  if (obj && obj.addEventListener) {
    obj.addEventListener(
      ...(args as Parameters<HTMLElement['addEventListener']>)
    );
  }
}

export function off<T extends DOMEventListenerTarget>(
  obj: T | null,
  ...args:
    | Parameters<T['removeEventListener']>
    | [string, Function | null, ...any]
): void {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(
      ...(args as Parameters<HTMLElement['removeEventListener']>)
    );
  }
}

export const shimmer = (width: number, height: number) => `
<svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="#333" />
  <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window?.btoa(str);
