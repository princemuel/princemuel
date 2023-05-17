import clsx from 'clsx';
import { Logo } from '../atoms';
import { Navigation } from '../molecules';

interface Props {}

export function Header(props: Props) {
  return (
    <header className='bg-white text-white'>
      <div className='full-width-shadow h-container'>
        <div className={clsx('relative py-10 text-zinc-800')}>
          <div>
            <Logo className='text-black transition-all delay-0 duration-300  ease-in hover:text-teal-500 focus:text-teal-500 active:text-teal-500' />
          </div>

          <Navigation />
        </div>
      </div>
    </header>
  );
}
