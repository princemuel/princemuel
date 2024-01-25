import { ContactFormSchema as schema } from "@/lib/schema";
import { conform, useForm } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import { useId } from "react";

export const ContactForm = () => {
  const formId = useId();
  const [form, fields] = useForm({
    id: formId,
    shouldValidate: "onBlur",
    fallbackNative: true,
    defaultValue: { name: "", email: "", message: "" },
    constraint: getFieldsetConstraint(schema),
    onValidate: ({ formData }) => parse(formData, { schema }),
  });

  return (
    <form method="POST" className="flex-1 space-y-8" {...form.props}>
      <div className="space-y-2">
        <label className="block text-sm font-semibold" htmlFor={fields.name.id}>
          Name
        </label>
        <input
          {...conform.input(fields.name, { type: "text" })}
          className="w-full bg-zinc-800/20 px-5 py-3 dark:bg-zinc-200/20"
          placeholder="Jane Appleseed"
          autoComplete="name"
        />
        <span
          role="alert"
          aria-live="polite"
          id={fields.name.errorId}
          className="text-sm text-red-400"
        >
          {fields.name.errors}
        </span>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold" htmlFor={fields.email.id}>
          Email Address
        </label>
        <input
          {...conform.input(fields.email, { type: "email" })}
          className="w-full bg-zinc-800/20 px-5 py-3 dark:bg-zinc-200/20"
          placeholder="email@example.com"
          autoComplete="email"
        />

        <span
          role="alert"
          aria-live="polite"
          id={fields.email.errorId}
          className="text-sm text-red-400"
        >
          {fields.email.errors}
        </span>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold" htmlFor={fields.message.id}>
          Message
        </label>
        <textarea
          {...conform.textarea(fields.message)}
          className="min-h-min w-full bg-zinc-800/20 px-5 py-3"
          placeholder="How can I help"
        ></textarea>
        <span
          role="alert"
          aria-live="polite"
          id={fields.message.errorId}
          className="text-sm text-red-400"
        >
          {fields.message.errors}
        </span>
      </div>

      <button type="submit" className="inline-flex items-center bg-tahiti-500 px-5 py-3 text-white">
        Send Message
      </button>
    </form>
  );
};
