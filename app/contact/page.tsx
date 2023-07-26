import { Metadata } from 'next';
import { ContactTemplate } from './contact';

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
      <ContactTemplate />
    </main>
  );
};

export default PageRoute;
