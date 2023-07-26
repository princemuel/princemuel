import { links } from '@/common';
import { cn } from '@/lib';
import { Logo, NavLink, NavlinkUnderline } from '../../atoms';

interface Props {
  className?: string;
}

export function NavDesktop({ className }: Props) {
  return (
    <div className={cn('py-10 full-w-bg', className)}>
      <figure>
        <Logo className='text-black transition-all delay-0 duration-300 ease-in hover:text-blue-500 focus:text-blue-500 active:text-blue-500' />
      </figure>

      <nav className=''>
        <ul
          aria-label='Primary Navigation'
          className='flex items-center gap-8 text-blue-800'
        >
          {links.map((link) => (
            <li
              key={link.text}
              className='text-sm capitalize transition-all delay-0 duration-300 ease-in hover:text-blue-500 focus:text-blue-500'
            >
              <NavLink href={link.url} className='relative block'>
                <span>{link.text}</span>
                <NavlinkUnderline />
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
