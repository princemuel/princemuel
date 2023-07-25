import { cn } from '@/lib';
import localFont from 'next/font/local';

// ! Note: using local fonts for now until next font api is stable
const FontAccent = localFont({
  src: './mona-sans.woff2',
  variable: '--font-accent',
  display: 'swap',
});

const FontMono = localFont({
  // src: './roboto-mono.ttf',
  src: './monaco.ttf',
  variable: '--font-mono',
  display: 'swap',
});

const FontSans = localFont({
  display: 'swap',
  variable: '--font-sans',
  src: [
    {
      path: './ubuntu-regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './ubuntu-medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './ubuntu-bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
});

// import { Fira_Code, Ubuntu } from 'next/font/google';

//   const FontSans = Ubuntu({
//   subsets: ['latin'],
//   variable: '--font-sans',
//   display: 'swap',
// });

export const fonts = cn(
  FontAccent.variable,
  FontMono.variable,
  FontSans.variable
);
