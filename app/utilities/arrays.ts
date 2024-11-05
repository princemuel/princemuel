/*---------------------------------*
            ARRAY UTILS            *
  ---------------------------------*
 */

export function hasValues<T>(value: T[] | null | undefined): value is NonNullable<T[]> {
  return Array.isArray(value) && value.length > 0;
}

export function range(start: number, stop: number, step: number) {
  return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
}

export const unique = <T>(array: T[]) => [...new Set(array)];

export const difference = <T>(a: T[], b: T[]) => a.filter((item) => !b.includes(item));

export const intersection = <T>(arr: T[], ...args: T[][]) =>
  arr.filter((item) => args.every((value) => value.includes(item)));
