import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {};

interface Props {}

const Page = (props: Props) => {
  return (
    <React.Fragment>
      <main>
        <h1>No Blog Posts yet</h1>
      </main>
    </React.Fragment>
  );
};

export default Page;
