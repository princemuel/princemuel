export function unform(
  formData: FormData,
  prefix: string,
): Record<string, FormDataEntryValue> {
  return Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => [
      key.replace(new RegExp(`^${prefix}`), ""), // Remove specified prefix
      value,
    ]),
  );
}
