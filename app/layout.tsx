import clsx from 'clsx';
import { Metadata } from 'next';
import { Ibarra_Real_Nova, Public_Sans } from 'next/font/google';
import './index.css';

const ibarraRealNova = Ibarra_Real_Nova({ subsets: ['latin'] });
const publicSans = Public_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={clsx(ibarraRealNova.className, publicSans.className)}>
        {children}
      </body>
    </html>
  );
}
