import { ContactTemplate } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Page',
  description: '',
};

const PageRoute = () => {
  return <ContactTemplate />;
};

export default PageRoute;
