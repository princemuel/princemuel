import { isServer } from "./utils";

const intl_date_format = (
  locales?: Intl.LocalesArgument,
  options?: Intl.DateTimeFormatOptions,
) => {
  const language: Intl.LocalesArgument =
    locales || (isServer ? ["en", "en-US"] : navigator.language);
  return new Intl.DateTimeFormat(language, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    ...options,
  });
};

export const en_datetime = intl_date_format("en-US");
