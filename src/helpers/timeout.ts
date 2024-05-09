import { TimeoutError } from "./error-classes";

/**
 * Used to uniquely identify a timeout
 * @private
 */
const TIMEOUT = Symbol("TIMEOUT");

/**
 * Attach a timeout to any promise, if the timeout resolves first ignore the
 * original promise and throw an error
 * @param promise The promise to attach a timeout to
 * @param options The options to use
 * @param options.ms The number of milliseconds to wait before timing out
 * @param options.controller An AbortController to abort the original promise
 * @returns The result of the promise
 * @throws TimeoutError If the timeout resolves first
 * @example
 * try {
 *   let result = await timeout(
 *     fetch("https://example.com"),
 *     { ms: 100 }
 *   );
 * } catch (error) {
 *   if (error instanceof TimeoutError) {
 *     // Handle timeout
 *   }
 * }
 * @example
 * try {
 *   let controller = new AbortController();
 *   let result = await timeout(
 *     fetch("https://example.com", { signal: controller.signal }),
 *     { ms: 100, controller }
 *   );
 * } catch (error) {
 *   if (error instanceof TimeoutError) {
 *     // Handle timeout
 *   }
 * }
 */
export function timeout<T>(
  promise: Promise<T>,
  options: { controller?: AbortController; ms: number },
): Promise<T> {
  return new Promise(function (resolve, reject) {
    let timer: NodeJS.Timeout | null = null;

    const timeoutPromise = new Promise((innerResolve) => {
      timer = setTimeout(() => innerResolve(TIMEOUT), options.ms);
    });

    Promise.race([promise, timeoutPromise])
      .then((result) => {
        if (timer) clearTimeout(timer);

        if (result === TIMEOUT) {
          if (options.controller) options.controller.abort();
          reject(new TimeoutError(`Timed out after ${options.ms}ms`));
        }
        resolve(result as Awaited<T>);
      })
      .catch((error) => {
        if (timer) clearTimeout(timer);
        reject(error);
      });
  });
}
