import { ContactTemplate } from '@/components';
import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {};

interface Props {}

const Page = (props: Props) => {
  return (
    <React.Fragment>
      <ContactTemplate />
    </React.Fragment>
  );
};

export default Page;
