import { ImageResponse } from 'next/server';

export const alt = 'Prince Muel';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
export const runtime = 'edge';

export default async function og() {
  const font = fetch(
    new URL('../assets/SpecialElite-Regular.ttf', import.meta.url)
  ).then((res) => res?.arrayBuffer());

  const fontData = await font;

  return new ImageResponse(
    (
      <div tw='flex h-full w-full items-center justify-between bg-white text-[12.8rem]'>
        Prince Muel
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
