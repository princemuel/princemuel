/*---------------------------------*
            OBJECT UTILS           *
  ---------------------------------*
 */

export function serialize<T>(data: T) {
  return JSON.parse(JSON.stringify(data)) as NonNullable<T>;
}

export function singleton<T>(name: string, callback: () => T) {
  const g = globalThis as unknown as globalThis;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  g.__singletons ??= new Map<string, T>();
  if (!g.__singletons.has(name)) g.__singletons.set(name, callback());
  return g.__singletons.get(name) as NonNullable<T>;
}

export function remove_key<T>(k: string, data: T): T {
  if (Array.isArray(data)) {
    return data.map((item) => remove_key(k, item)) as unknown as T;
  }
  if (isObject(data)) {
    const entries = Object.entries(data)
      .filter(([key]) => key !== k)
      .map(([key, value]) => [key, remove_key(k, value)]);
    return Object.fromEntries(entries) as T;
  }
  return data;
}

export function omitFields<T extends Record<string, unknown>, K extends keyof T>(
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

export const isEmptyObject = (value: Record<string, unknown> = {}) => {
  return isObject(value) && !Object.entries(value).length;
};
