/*---------------------------------*
            STRING UTILS           *
  ---------------------------------*
 */

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

/*---------------------------------*
            DOM UTILS              *
  ---------------------------------*
 */

export const isBrowser = typeof window !== 'undefined';
export const isNavigator = typeof navigator !== 'undefined';

export function on<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args: Parameters<T['addEventListener']> | [string, Function | null, ...any]
): void {
  if (obj && obj.addEventListener) {
    obj.addEventListener(
      ...(args as Parameters<HTMLElement['addEventListener']>)
    );
  }
}

export function off<T extends Window | Document | HTMLElement | EventTarget>(
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
