import { $, component$, useSignal } from "@builder.io/qwik";

const ClickToCopyEmail = component$(() => {
  const defaultMessage = "Click to Copy Email";
  const message = useSignal(defaultMessage);

  const handleCopy = $(async (_e: PointerEvent, el: HTMLButtonElement) => {
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
    <div class="group relative flex w-max items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        class="size-4 stroke-tahiti-500"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        ></path>
      </svg>

      <button
        class="text-sm text-white no-underline"
        onClick$={handleCopy}
        onMouseOut$={handleMouseOut}
      >
        vansomecsam@gmail.com
      </button>

      <span class="pointer-events-none absolute -top-7 left-1/2 w-max -translate-x-1/2 bg-gray-500 px-2 py-1 text-xs opacity-0 transition-opacity group-hover:opacity-100">
        {message.value}
      </span>
    </div>
  );
});

export default ClickToCopyEmail;
