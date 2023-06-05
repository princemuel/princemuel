import { Text } from '@/components';
import { getProjectsMetadata, hasValues } from '@/lib';
import { Metadata } from 'next';

export const metadata: Metadata = {};

const PageRoute = async () => {
  const projects = await getProjectsMetadata();
  if (!hasValues(projects))
    return (
      <Text className='mt-10 text-center'>
        Sorry, no projects are available yet.
      </Text>
    );

  return (
    <main className=''>
      <div>{JSON.stringify(projects, null, 2)}</div>
    </main>
  );
};

export default PageRoute;
