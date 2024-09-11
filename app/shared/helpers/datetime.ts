import { isServer } from "../utils/guards";

export const date_nf = (
  ...args: ConstructorParameters<typeof Intl.DateTimeFormat>
) => {
  const [locales, options] = args;
  const language: Intl.LocalesArgument =
    locales || (isServer ? ["en", "en-US"] : navigator.language);
  return new Intl.DateTimeFormat(language, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    ...options,
  });
};
export const moment = date_nf("en-US", { weekday: "short" });
