import { getSiteSettings } from "@/config/settings";
import { isServer } from "@/utilities/guards";

type DateParams = ConstructorParameters<typeof Intl.DateTimeFormat>;

const createDateFormatter = (...args: DateParams) => {
  const [locales, options] = args;
  const defaultLanguage = getSiteSettings().language;

  const language: Intl.LocalesArgument =
    locales ||
    (isServer ||
    typeof navigator === "undefined" ||
    typeof navigator.language !== "string"
      ? defaultLanguage
      : navigator.language);

  return new Intl.DateTimeFormat(language, {
    timeZone: "UTC",
    year: "numeric", // Year (2023)
    month: "long", // Full month name (January)
    day: "2-digit", // Day of the month (3)
    ...options,
  });
};

export const dfmt = createDateFormatter("en-US");
