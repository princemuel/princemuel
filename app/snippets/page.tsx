import { Metadata } from 'next';

export const metadata: Metadata = {};

interface Props {}

const Page = (props: Props) => {
  return (
    <>
      <main>
        <h1>My Reservior of Code Snippets</h1>
        <p>
          I've found been coding for quite a while now and here are some of the
          snippets of code I've found useful
        </p>
        <p>Typescript types, react hooks , functions</p>
      </main>
    </>
  );
};

export default Page;
