import { $, component$, Fragment, useSignal } from "@builder.io/qwik";

export const CopyEmailButton = component$(() => {
  const defaultMessage = "Click to Copy";
  const message = useSignal(defaultMessage);

  const handleCopy = $(async (_e: MouseEvent, el: HTMLButtonElement) => {
    try {
      await navigator.clipboard.writeText(el.innerText);
      message.value = "Copied!";
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  });

  const handleMouseOut = $(() => {
    setTimeout(() => {
      message.value = defaultMessage;
    }, 200);
  });

  return (
    <Fragment>
      <button
        class="text-xs text-slate-700 dark:text-slate-300"
        onClick$={handleCopy}
        onMouseOut$={handleMouseOut}
      >
        vansomecsam@gmail.com
      </button>

      <span class="pointer-events-none absolute -top-8 left-1/2 w-max -translate-x-1/2 rounded bg-black/90 px-2 py-1 text-[.625rem] text-slate-50 opacity-0 transition-colors group-hover:opacity-100">
        {message.value}
      </span>
    </Fragment>
  );
});
