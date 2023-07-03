import localFont from 'next/font/local';

// ! Note: using local fonts for now until next font api is stable
const FontSans = localFont({
  src: './inter.ttf',
  variable: '--font-sans',
  display: 'swap',
});
const FontMono = localFont({
  src: './roboto-mono.ttf',
  variable: '--font-mono',
  display: 'swap',
});

// import { Inter, Roboto_Mono } from 'next/font/google';

//   const FontSans = Inter({
//   subsets: ['latin'],
//   variable: '--font-sans',
//   display: 'swap',
// });

//   const FontMono = Roboto_Mono({
//   subsets: ['latin'],
//   variable: '--font-mono',
//   display: 'swap',
// });
export { FontMono, FontSans };
