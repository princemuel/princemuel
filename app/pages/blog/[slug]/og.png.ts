import { handler } from "@/helpers/api-handler";

import { getImage } from "astro:assets";
import { getCollection, getEntry } from "astro:content";

import { readFile } from "node:fs/promises";
import { join } from "node:path";

import satori from "satori";
import { html } from "satori-html";
import sharp from "sharp";

import cover from "@/assets/images/blog-placeholder-5.jpg";

import type { InferGetStaticPropsType } from "astro";

export async function getStaticPaths() {
  const entries = await getCollection(
    "posts",
    ({ data }) => !(import.meta.env.PROD && data.draft),
  );

  return entries.map((entry) => ({
    props: { entry },
    params: { slug: entry.id },
  }));
}

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET = handler<Props>(async (ctx) => {
  const entry = ctx.props.entry;

  const generated = (async () => {
    const image_src = entry.data.media?.cover?.src || cover;
    return getImage({ src: image_src, format: "png", width: 1200, height: 630 });
  })();

  const [img, regular, bold, author] = await Promise.all([
    generated,
    readFile(join(process.cwd(), "app", "assets", "fonts", "ubuntu-400.ttf")),
    readFile(join(process.cwd(), "app", "assets", "fonts", "ubuntu-700.ttf")),
    getEntry(entry.data.author),
  ]);

  console.log("generated", img);
  // <img
  //   src=${new URL(img.src, site)}
  //   width="500"
  //   height="500"
  //   tw="h-40 w-40 overflow-hidden rounded-full border border-white"
  // />

  const markup = html`
  <div tw="flex h-[40rem] bg-white w-[75rem] flex-col items-center justify-center px-6"
  >
  <h1 tw="text-6xl font-bold text-gray-900">${author.data.name}</h1>
  <h2 tw="text-5xl font-bold text-gray-500">${entry.data.title}</h2>
  <h3 tw="text-2xl font-normal text-gray-500">${entry.data.summary}</h3>


    </div>
  `;

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    embedFont: true,
    fonts: [
      { name: "Ubuntu Sans", data: regular, style: "normal", weight: 400 },
      { name: "Ubuntu Sans", data: bold, style: "normal", weight: 700 },
    ],
  });

  const png = await sharp(Buffer.from(svg), { density: 300 })
    .resize(1200, 630)
    .png()
    .toBuffer();

  return new Response(png, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
});
