import { Text } from '@/components';
import { getProjectsMetadata, hasValues } from '@/lib';
import { Metadata } from 'next';
import * as React from 'react';

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
    <React.Fragment>
      <div>{JSON.stringify(projects, null, 2)}</div>
    </React.Fragment>
  );
};

export default PageRoute;
