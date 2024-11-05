/*---------------------------------*
            FUNCTION UTILS         *
  ---------------------------------*
 */

export const run = <T>(fn: () => T): T => fn();

export async function asyncPool<T, V>(array: T[], limit: number, fn: (item: T) => Promise<V>): Promise<V[]> {
  const results: Promise<V>[] = [];
  const executing = new Set<Promise<V>>();

  for (const item of array) {
    const promise = Promise.resolve().then(() => fn(item));
    results.push(promise);

    if (limit <= array.length) {
      executing.add(promise);
      void promise.then(() => executing.delete(promise));
      if (executing.size >= limit) await Promise.race(executing);
    }
  }

  return Promise.all(results);
}
