import { HomeTemplate } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prince Muel',
  description: '',
};

const PageRoute = async () => {
  return (
    <>
      <main
        id='main-content'
        aria-label='Contact Page'
        className='flex flex-col gap-20 !bg-white'
      >
        <HomeTemplate />
      </main>
    </>
  );
};

export default PageRoute;
