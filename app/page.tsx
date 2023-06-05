import { Text } from '@/components';
import { getProjectsMetadata, hasValues } from '@/lib';
import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Prince Muel',
  description: '',
};

const PageRoute = async () => {
  const projects = await getProjectsMetadata();

  return (
    <main className=''>
      {/* HERO SECTION */}

      {/*  */}
      <h1>This page is still in development. It should be ready soon </h1>

      <React.Fragment>
        {!hasValues(projects) ? (
          <Text className='mt-10 text-center'>
            Sorry, no projects are available yet.
          </Text>
        ) : (
          <section>{JSON.stringify(projects, null, 2)}</section>
        )}
      </React.Fragment>
    </main>
  );
};

export default PageRoute;
