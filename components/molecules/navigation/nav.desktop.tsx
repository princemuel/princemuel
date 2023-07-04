import { links } from '@/common';
import { cn } from '@/lib';
import { Logo, NavLink } from '../../atoms';

interface Props {
  className?: string;
}

export function NavDesktop({ className }: Props) {
  return (
    <div className={cn('py-10 full-w-bg', className)}>
      <figure>
        <Logo className='text-black transition-all delay-0 duration-300 ease-in hover:text-teal-500 focus:text-teal-500 active:text-teal-500' />
      </figure>

      <nav className=''>
        <ul
          aria-label='Primary Navigation'
          className='flex items-center gap-8 text-blue-800'
        >
          {links?.routes?.map((link) => (
            <li
              key={link.text}
              className='uppercase transition-all delay-0 duration-300 ease-in hover:text-teal-500 focus:text-teal-500'
            >
              <NavLink href={link.url}>{link.text}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
