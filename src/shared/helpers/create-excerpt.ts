import { marked as mkd } from "marked";
export const createExcerpt = (body: string, maxChars = 140) => {
  const html = mkd(body, { gfm: true, breaks: true }) as string;

  return (
    html
      .split("\n")
      .slice(0, 6)
      .flatMap((value) => value.replace(/<\/?[^>]+(>|$)/giu, "").split("\n"))
      .join(" ")
      .substring(0, maxChars) + "..."
  );
};
