import { Text } from '@/components';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className='text-center'>
      <Text className='mt-10'>Sorry, the requested post does not exist.</Text>
      <Link href='/'>Back to Home</Link>
    </div>
  );
};

export default NotFound;
