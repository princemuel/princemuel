import { Metadata } from 'next';

export const metadata: Metadata = {};

interface Props {}

const Page = (props: Props) => {
  return (
    <>
      <main>
        <h1>No Blog Posts yet</h1>
      </main>
    </>
  );
};

export default Page;
