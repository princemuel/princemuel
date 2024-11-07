// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const log_in_dev = (message?: any, ...optionalParams: any[]) => {
  if (!import.meta.env.DEV) return;
  console.log(message, ...optionalParams);
};
