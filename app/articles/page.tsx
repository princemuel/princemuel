import { Text } from '@/components';
import { hasValues } from '@/lib';
import { Metadata } from 'next';
import { getArticlesMetadata } from '../content';

export const metadata: Metadata = {};

interface Props {}

const PageRoute = async () => {
  const articles = await getArticlesMetadata();
  if (!hasValues(articles))
    return (
      <Text className='mt-10 text-center'>
        Sorry, no articles are available yet.
      </Text>
    );

  return (
    <main
      id='main-content'
      aria-label='Contact Page'
      className='gap- mx-auto flex flex-col'
    >
      <pre>{JSON.stringify(articles, null, 2)}</pre>
    </main>
  );
};

export default PageRoute;
