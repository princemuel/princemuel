import { isServer } from "../utils";

const intl_date_format = (
  ...args: ConstructorParameters<typeof Intl.DateTimeFormat>
) => {
  const [locales, options] = args;
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

export const en_datetime_default = intl_date_format("en-US");
export const en_datetime_with_time = intl_date_format("en-US", {
  timeZone: "UTC",
  weekday: "long",
});

export const format_date_with_time = (
  dateString: ConstructorParameters<typeof Date>[0] | null | undefined,
  showTime = false,
) => {
  const date = dateString ? new Date(dateString) : new Date();

  const dateStamp = date.toLocaleString("en-US", {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  });
  const timeStamp = date.toLocaleTimeString();

  return `${dateStamp} ${showTime ? `@${timeStamp}` : ""}`;
};
