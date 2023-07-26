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
  src: './ubuntu.woff2',
});

export const fonts = cn(
  FontAccent.variable,
  FontMono.variable,
  FontSans.variable
);
