import { Ibarra_Real_Nova, Public_Sans } from 'next/font/google';
import './index.css';

export const ibarraRealNova = Ibarra_Real_Nova({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});

export const publicSans = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});
