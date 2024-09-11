import { handler } from "@/shared/helpers/api-handler";
import { waitUntil } from "@vercel/functions";

export const prerender = false;

const CONFETTI_URL =
  "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js";

export const GET = handler(async () => {
  const { readable, writable } = new TransformStream();

  waitUntil(streamData(writable));

  return new Response(readable, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
});

async function streamData(writable: WritableStream, wait_time = 1500) {
  const writer = writable.getWriter();

  writer.write(`
    <meta name="viewport" content="width=device-width" />
    <h1>hello_<span>${"&nbsp;".repeat(1024)}</span></h1>
  `);

  const [_, confetti] = await Promise.all([
    new Promise((resolve) => setTimeout(resolve, wait_time)),
    fetch(CONFETTI_URL).then((response) => response.text()),
  ]);

  writer.write(`
    <h2>world <font size="2">after ${wait_time / 1000}s</font></h2>
    <script>${confetti}\nconfetti();</script>
  `);

  writer.close();
}

export const config = { runtime: "edge" };
