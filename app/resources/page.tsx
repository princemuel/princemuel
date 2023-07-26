import { Metadata } from 'next';

export const metadata: Metadata = {};

interface Props {}

const Page = (props: Props) => {
  return (
    <>
      <main>
        <h1>No Resources yet</h1>
        {/* <p>
          These materials have been tremendously beneficial to me in my learning
          path. I hope you find these helpful as well!
        </p> */}
        {/* <p>Videos, Music Playlist, Books</p> */}
      </main>
    </>
  );
};

export default Page;
