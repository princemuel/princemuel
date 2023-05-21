import { Navigation } from '../molecules';

interface Props {}

export function Header(props: Props) {
  return (
    <header className='sticky top-0 z-50 bg-white text-white'>
      <Navigation />
    </header>
  );
}
