import { ImageResponse } from 'next/server';

export const alt = 'Prince Muel';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';
export const runtime = 'edge';

export default async function icon() {
  const font = fetch(
    new URL('./fonts/special-elite.ttf', import.meta.url)
  ).then((response) => response?.arrayBuffer());

  const fontData = await font;

  return new ImageResponse(
    (
      <div tw='flex h-full w-full items-center justify-between bg-white text-[2.4rem]'>
        PM
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Special Elite',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
}
