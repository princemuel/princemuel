import { Text } from '@/components';
import { hasValues } from '@/lib';
import { getProjectsMetadata } from '../content';

export const metadata = {
  title: 'Projects',
  description: 'A list of all my past and current projects',
};

const PageRoute = async () => {
  const projects = await getProjectsMetadata();
  if (!hasValues(projects))
    return (
      <Text className='mt-10 text-center'>
        Sorry, no projects are available yet.
      </Text>
    );

  return (
    <main
      id='main-content'
      aria-label='Contact Page'
      className='flex flex-col gap-20'
    >
      <pre>{JSON.stringify(projects, null, 2)}</pre>
    </main>
  );
};

export default PageRoute;
