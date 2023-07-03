import { ContactTemplate } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Page',
  description: '',
};

const PageRoute = () => {
  return (
    <main
      id='main-content'
      aria-label='Contact Page'
      className='flex flex-col gap-20'
    >
      <ContactTemplate />;
    </main>
  );
};

export default PageRoute;
