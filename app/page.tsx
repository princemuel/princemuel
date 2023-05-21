import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prince Muel',
  description: '',
};

interface Props {}

export default function PageRoute(props: Props) {
  return (
    <main className=''>
      <h1>
        This page is currently under construction. It should be ready soon{' '}
      </h1>
    </main>
  );
}
