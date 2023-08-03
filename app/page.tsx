import { HomeTemplate } from './home';

const PageRoute = () => {
  return (
    <>
      <main id='main-content' aria-label='' className='flex flex-col gap-20'>
        <HomeTemplate />
      </main>
    </>
  );
};

export default PageRoute;
