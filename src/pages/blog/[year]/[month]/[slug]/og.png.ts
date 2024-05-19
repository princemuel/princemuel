import { fetchResource } from "@/lib/utils";
import { ImageResponse } from "@vercel/og";
import type {
  APIContext,
  GetStaticPaths,
  InferGetStaticPropsType,
} from "astro";
import { readFileSync } from "node:fs";
import path from "node:path";
// import type { getStaticPaths } from "./index.astro";

// export const prerender = false;

export const getStaticPaths = (async () => {
  const entries = await fetchResource("posts");
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

  const basePath = path.join(process.cwd(), "public", "fonts");
  const fontBase = readFileSync(basePath + "/WotfardRegular.ttf");
  const fontMedium = readFileSync(basePath + "/WotfardMedium.ttf");
  const fontSemi = readFileSync(basePath + "/WotfardSemibold.ttf");

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
      },
      {
        name: "Wotfard Medium",
        data: fontMedium.buffer,
        style: "normal",
      },
      {
        name: "Wotfard Regular",
        data: fontBase.buffer,
        style: "normal",
      },
    ],
  });
}
