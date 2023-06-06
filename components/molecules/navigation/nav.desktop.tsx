import { links } from '@/common';
import { cx } from 'cva';
import { Logo, NavLink } from '../../atoms';

interface Props {
  className?: string;
}

export function NavDesktop({ className }: Props) {
  return (
    <div className={cx('py-10 full-width-shadow', className)}>
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
              className='text-x uppercase transition-all delay-0 duration-300 ease-in hover:text-teal-500 focus:text-teal-500'
            >
              <NavLink href={link.url}>
                <a>{link.text}</a>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
