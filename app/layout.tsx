import { seo } from '@/config';
import { cn } from '@/lib';
import { GlobalProvider } from '@/providers';
import { Analytics } from '@vercel/analytics/react';
import * as React from 'react';
import { fonts } from './fonts';
import './globals.css';

export const metadata = seo;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={cn(
        'scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-slate-500 scrollbar-track-rounded-md scrollbar-thumb-rounded-md',
        fonts
      )}
    >
      <body className='relative bg-white font-sans text-gray-900 dark:bg-[#111] dark:text-gray-100'>
        <React.Fragment>
          <GlobalProvider>{children}</GlobalProvider>
          <Analytics />
        </React.Fragment>
      </body>
    </html>
  );
}

/* <body className='relative bg-white bg-gradient-to-br text-slate-500 antialiased selection:bg-teal-300 selection:text-teal-900 dark:bg-slate-950 dark:text-slate-400'> */

/*   <a href="#maincontent" data-skip-nav className='absolute z-[9999] mx-auto translate-y-[-120%] bg-zinc-800 px-[0.5em] py-[1em] text-white transition-transform focus:translate-y-0 focus:outline focus:outline-offset-2 focus:outline-zinc-800'>Skip to main content</a>*/
