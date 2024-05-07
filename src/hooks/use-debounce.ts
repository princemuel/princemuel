import type { QRL } from "@builder.io/qwik";
import { $, implicit$FirstArg, useSignal } from "@builder.io/qwik";

const useDebounce = <T>(callback: QRL<(args: T) => void>, delay: number) => {
  const timeoutId = useSignal<number>();

  return $((args: T) => {
    clearTimeout(timeoutId.value);
    timeoutId.value = Number(setTimeout(() => callback(args), delay));
  });
};

export const useDebounce$ = implicit$FirstArg(useDebounce);
