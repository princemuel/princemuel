import { Metadata } from 'next';
import { HomeTemplate } from './home';

export const metadata: Metadata = {
  title: 'Prince Muel',
  description: '',
};

const PageRoute = () => {
  return (
    <>
      <main id='main-content' aria-label='' className='flex flex-col gap-20'>
        <HomeTemplate />
      </main>
    </>
  );
};

export default PageRoute;
