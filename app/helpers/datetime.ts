import { getSiteSettings } from "@/config/settings";
import { isServer } from "@/utilities/guards";

type DateFormatterParams = ConstructorParameters<typeof Intl.DateTimeFormat>;

const date_formatter = (...args: DateFormatterParams) => {
  const [locales, options] = args;
  const language: Intl.LocalesArgument =
    locales || (isServer ? getSiteSettings().language : navigator.language);
  return new Intl.DateTimeFormat(language, {
    year: "numeric", // Year (2023)
    month: "long", // Full month name (January)
    day: "numeric", // Day of the month (3)
    ...options,
  });
};

export const moment = date_formatter("en-US");
