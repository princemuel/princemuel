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
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
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
