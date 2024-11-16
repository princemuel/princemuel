import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { getCollection, getEntry } from "astro:content";
import PlaceholderImage from "@/assets/images/blog-placeholder-5.jpg";
import { handler } from "@/helpers/api-handler";
import satori from "satori";
import { html } from "satori-html";
import sharp from "sharp";

import type { GetStaticPaths, InferGetStaticPropsType } from "astro";

export const prerender = true;
export const getStaticPaths = (async () => {
  const entries = await getCollection(
    "posts",
    ({ data }) => !(import.meta.env.PROD && data.draft),
  );

  return entries.map((entry) => ({
    props: { entry },
    params: { slug: entry.id },
  }));
}) satisfies GetStaticPaths;

type Properties = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET = handler<Properties>(async ({ props }) => {
  const entry = props.entry;

  const image_src = entry.data.media?.cover?.src || PlaceholderImage.src;

  const image_path = import.meta.env.DEV
    ? resolve(image_src.replace(/\?.*/, "").replace("/@fs", ""))
    : resolve(image_src.replace("/", "dist/"));

  console.log(image_path);

  const [light, regular, bold] = await Promise.all([
    readFile(join(process.cwd(), "app", "assets", "fonts", "ubuntu-300.ttf")),
    readFile(join(process.cwd(), "app", "assets", "fonts", "ubuntu-400.ttf")),
    readFile(join(process.cwd(), "app", "assets", "fonts", "ubuntu-700.ttf")),
    // readFile(image_path),
  ]);

  const author = await getEntry(entry.data.author);

  // <img
  //   src=${new URL(img.src, site)}
  //   width="500"
  //   height="500"
  //   tw="h-40 w-40 overflow-hidden rounded-full border border-white"
  // />

  const markup = html`
    <div
      tw="flex h-[40rem] w-[75rem] flex-col items-center justify-center px-6"
    >
      <h1 tw="text-6xl font-bold text-slate-700">${author.data.name}</h1>
      <h2 tw="text-4xl font-bold text-slate-500">${entry.data.title}</h2>
      <h3 tw="text-2xl font-normal text-slate-500">${entry.data.summary}</h3>
    </div>
  `;
  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    embedFont: true,
    fonts: [
      { name: "Ubuntu", data: light.buffer, style: "normal", weight: 300 },
      { name: "Ubuntu", data: regular.buffer, style: "normal", weight: 400 },
      { name: "Ubuntu", data: bold.buffer, style: "normal", weight: 700 },
    ],
  });

  const png = await sharp(Buffer.from(svg), { density: 300 })
    .resize(1200, 630)
    .png()
    .toBuffer();

  return new Response(png, {
    status: 200,
    headers: { "Content-Type": "image/png" },
  });
});
