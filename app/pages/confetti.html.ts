import { handler } from "@/helpers/api-handler";

export const prerender = false;

const timeout = 1500;

const CONFETTI_URL =
  "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js";

export const GET = handler(async () => {
  const { readable, writable } = new TransformStream();

  const writer = writable.getWriter();

  writer.write(`
    <meta name="viewport" content="width=device-width" />
    <h1>hello_<span>${"&nbsp;".repeat(1024)}</span></h1>
  `);

  const [_, confetti] = await Promise.all([
    new Promise((resolve) => setTimeout(resolve, timeout)),
    fetch(CONFETTI_URL, { signal: AbortSignal.timeout(5000) }).then((r) => r.text()),
  ]);

  writer.write(`
    <h2>world <font size="2">after ${timeout / 1000}s</font></h2>
    <script>${confetti}\nconfetti();</script>
  `);

  writer.close();

  return new Response(readable, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
});
