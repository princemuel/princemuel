import { Footer, Header } from '@/components';
import { cn } from '@/lib';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import { FontMono, FontSans } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: 'Prince Muel | %s',
    default: 'Prince Muel',
  },
  // metadataBase: new URL(process.env.VERCEL_URL || ''),
  generator: 'Next.js',
  applicationName: 'Prince Muel',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript', 'Portfolio', 'Blog'],
  colorScheme: 'dark light',
  creator: 'Prince Muel',
  publisher: 'Prince Muel',
  authors: { name: 'Prince Muel', url: 'https://github.com/princemuel' },
  openGraph: {
    type: 'website',
    title: `Prince Muel`,
    description: '',
    url: 'https://princemuel.vercel.app',
    siteName: 'Princemuel',
    // images: [
    //   {
    //     url: 'https://nextjs.org/og.png',
    //     width: 800,
    //     height: 600,
    //   },
    //   {
    //     url: 'https://nextjs.org/og-alt.png',
    //     width: 1800,
    //     height: 1600,
    //     alt: 'My custom alt',
    //   },
    // ],
    locale: 'en-US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@iamprincemuel',
    creator: '@iamprincemuel',
    // add image
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'standard',
      'max-snippet': -1,
    },
  },
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0B1120' },
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={cn(
        FontMono.variable,
        FontSans.variable,
        'scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-slate-500 scrollbar-track-rounded-md scrollbar-thumb-rounded-md'
      )}
    >
      <body
        className={cn(
          'relative bg-white bg-gradient-to-br text-slate-500 antialiased selection:bg-teal-300 selection:text-teal-900 dark:bg-slate-950 dark:text-slate-400'
        )}
      >
        <>
          <Header />
          {children}
          <Footer />
          <Analytics />
        </>
      </body>
    </html>
  );
}
