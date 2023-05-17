import { links } from '@/common';
import * as React from 'react';
import { NavLink } from './navlink';

interface Props {}

function Navigation(props: Props) {
  return (
    <React.Fragment>
      <nav>
        <ul
          className='flex flex-col items-center gap-8 md:flex-row md:gap-14'
          aria-label='Primary Navigation'
        >
          {links?.routes?.map((link) => (
            <li
              key={link.text}
              className='body-200 text-[1.4rem] uppercase transition-all delay-0 duration-300 ease-in hover:text-teal-500 focus:text-teal-500'
            >
              <NavLink href={link.url}>
                <a>{link.text}</a>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </React.Fragment>
  );
}

export { Navigation };
