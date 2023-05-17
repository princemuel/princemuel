'use client';

import { Text } from '@/components';
import Link from 'next/link';
import { useEffect } from 'react';

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className='mx-auto min-h-screen max-w-lg bg-slate-200 px-4 py-1'>
      <h2 className='my-4 text-800 font-bold'>Something went wrong!</h2>
      <button
        className='mb-8 rounded-xl bg-red-500 p-4 text-white'
        onClick={reset}
      >
        Try again
      </button>

      <Text className='text-700'>
        Or go back to{' '}
        <Link href='/' className='underline'>
          Home 🏠
        </Link>
      </Text>
    </main>
  );
}
