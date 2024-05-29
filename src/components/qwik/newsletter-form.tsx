import { parseError, raise } from "@/helpers";
import {
  $,
  component$,
  useStore,
  type QRLEventHandlerMulti,
} from "@builder.io/qwik";
import { ZodError, z } from "zod";

const formSchema = z.object({
  honeypot: z.string().max(0, "Invalid submission detected."),
  email: z.string().email(),
});

const resultSchema = z.discriminatedUnion("status", [
  z.object({ status: z.literal("success"), message: z.string() }),
  z.object({ status: z.literal("error"), message: z.string() }),
]);

// peer w-full rounded border border-brand-100 bg-transparent px-4 py-3"text-400 font-bold leading-200 -tracking-200 text-brand-900 caret-brand-500 outline-none transition-colors autofill:bg-white aria-[invalid="true"]:!border-accent-200 aria-[invalid="true"]:!text-accent-200 focus:aria-[invalid="true"]:!border-accent-200 focus:aria-[invalid="true"]:!ring-accent-200 hocus:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-white dark:autofill:bg-brand-700 dark:hocus:border-brand-500

type Store = {
  data: string | null;
  errors: Record<string, string> | null;
};

export const NewsletterForm = component$(() => {
  const store = useStore<Store>({ data: null, errors: null });

  const handleSubmit: QRLEventHandlerMulti<SubmitEvent, HTMLFormElement> = $(
    async (_, form) => {
      try {
        const formData = formSchema.parse(
          Object.fromEntries(new FormData(form).entries()),
        );

        const response = await fetch("/api/v1/subscribe", {
          method: "POST",
          body: JSON.stringify({ email: formData.email }),
        });

        const result = resultSchema.parse(await response.json());
        if (result.status === "error") raise(result.message);

        store.errors = null;
        store.data = result.message;
      } catch (e) {
        let errors: Record<string, string> = {};
        if (e instanceof ZodError) {
          for (let key of Object.keys(e.formErrors?.fieldErrors)) {
            errors[key] = e.formErrors?.fieldErrors?.[key]?.[0] ?? "";
          }
        } else errors.unknown = parseError(e);

        store.data = null;
        store.errors = errors;
      }
    },
  );

  return (
    <div class="flex flex-col gap-1">
      {store.data && (
        <p role="alert" aria-live="polite" class="text-sm text-green-500">
          {store.data}
        </p>
      )}

      {store.errors &&
        Object.values(store.errors).map((message) => (
          <p
            key={message}
            role="alert"
            aria-live="polite"
            class="text-sm text-red-500"
          >
            {message}
          </p>
        ))}

      <form
        preventdefault:submit
        onSubmit$={handleSubmit}
        class={[
          "flex w-full flex-col items-center gap-4 md:flex-row md:p-1",
          "md:rounded md:border md:border-slate-300 md:dark:border-slate-800",
        ]}
      >
        <input
          type="hidden"
          name="honeypot"
          placeholder="do not fill this"
          class="sr-only"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          class={[
            "w-full bg-transparent p-3",
            "text-sm text-slate-900 caret-current dark:text-slate-200",
            "rounded border border-slate-300 outline-none dark:border-slate-800",
            "md:px-3 md:py-2",
            "md:flex-grow md:rounded-none md:border-none md:py-0",
          ]}
        />

        <button
          type="submit"
          class={[
            "w-full px-4 py-3 md:px-3 md:py-2",
            "text-sm font-medium text-slate-900 dark:text-slate-200",
            "rounded border border-slate-300 dark:border-slate-800",
            "transition-colors hocus:text-sky-500 md:w-auto",
          ]}
        >
          Subscribe
        </button>
      </form>
    </div>
  );
});
