import AvatarImage from "@/assets/images/forrest-gump-quote.webp";
import { envVars } from "@/lib/env.server";
import { ImageResponse } from "@vercel/og";
import type {
  APIContext,
  GetStaticPaths,
  InferGetStaticPropsType,
} from "astro";
import { getCollection } from "astro:content";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const getStaticPaths = (async () => {
  const status = ["draft", "preview", "published"] as const;
  const entries = await getCollection("posts", ({ data }) => {
    return import.meta.env.MODE === "production"
      ? envVars.ENABLE_PREVIEW && data.status !== "draft"
        ? status.includes(data.status)
        : data.status === "published"
      : true;
  });

  return entries.map((entry) => {
    const [year, month, slug] = entry.slug.split("/");
    return {
      params: { year, month, slug },
      props: { entry },
    };
  });
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export async function GET({ props }: APIContext<Props>) {
  const entry = props.entry;

  const image_src = entry.data.media?.cover
    ? entry.data.media.cover.src
    : AvatarImage.src;

  const image_path = import.meta.env.DEV
    ? resolve(image_src.replace(/\?.*/, "").replace("/@fs", ""))
    : resolve(image_src.replace("/", "dist/"));

  console.log(image_path);

  const basePath = fileURLToPath(
    new URL("../../../../../../public/static/fonts", import.meta.url),
  );

  const [fontBase, fontMedium, fontSemi, _] = await Promise.all([
    readFile(join(basePath, "WotfardRegular.ttf")),
    readFile(join(basePath, "WotfardMedium.ttf")),
    readFile(join(basePath, "WotfardSemiBold.ttf")),
    readFile(image_path),
  ]);

  const html = {
    type: "div",
    props: {
      children: [
        // {
        //   type: 'div',
        //   props: {
        //     // using tailwind
        //     tw: 'w-[200px] h-[200px] flex rounded-3xl overflow-hidden',
        //     children: [
        //       {
        //         type: 'img',
        //         props: {
        //           src: postCover.buffer,
        //         },
        //       },
        //     ],
        //   },
        // },
        {
          type: "div",
          props: {
            tw: "pl-10 shrink flex",
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "48px",
                    fontFamily: "Wotfard SemiBold",
                  },
                  children: entry.data.title,
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            tw: "absolute right-[40px] bottom-[40px] flex items-center",
            children: [
              {
                type: "div",
                props: {
                  tw: "text-blue-600 text-3xl",
                  style: {
                    fontFamily: "Wotfard SemiBold",
                  },
                  children: "Prince Muel",
                },
              },
              {
                type: "div",
                props: {
                  tw: "px-2 text-3xl",
                  style: {
                    fontSize: "30px",
                  },
                  children: "|",
                },
              },
              {
                type: "div",
                props: {
                  tw: "text-3xl",
                  children: "Blog",
                },
              },
            ],
          },
        },
      ],
      tw: "w-full h-full flex items-center justify-center relative px-22",
      style: {
        background: "#f7f8e8",
        fontFamily: "Wotfard Regular",
      },
    },
  };

  return new ImageResponse(html, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Wotfard SemiBold",
        data: fontSemi.buffer,
        style: "normal",
        weight: 600,
      },
      {
        name: "Wotfard Medium",
        data: fontMedium.buffer,
        style: "normal",
        weight: 500,
      },
      {
        name: "Wotfard Regular",
        data: fontBase.buffer,
        style: "normal",
        weight: 400,
      },
    ],
  });
}
