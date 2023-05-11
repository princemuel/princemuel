import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prince Muel',
  description: '',
};

interface Props {}

const Page = (props: Props) => {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'></main>
  );
};

export default Page;
