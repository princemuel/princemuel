import { Metadata } from 'next';

export const metadata: Metadata = {
  openGraph: {
    title: 'Next.js',
    description: 'The React Framework for the Web',
    type: 'article',
    publishedTime: new Date().toISOString(),
    authors: ['Seb', 'Josh'],
  },
};

interface Props {}

const Page = (props: Props) => {
  return (
    <main className=''>
      <div></div>
    </main>
  );
};

export default Page;
