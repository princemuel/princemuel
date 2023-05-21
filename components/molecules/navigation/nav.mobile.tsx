'use client';

import { links } from '@/common';
import clsx from 'clsx';
import * as React from 'react';
import { Logo, NavLink } from '../../atoms';
import styles from './styles/nav.module.css';

interface Props {}

export function NavMobile(props: Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={clsx('flex flex-col bg-slate-700 text-zinc-800')}>
      <div className={clsx('py-10 full-width-shadow h-container')}>
        <div className='flex items-center justify-between bg-blue-600'>
          <Logo className='text-black transition-all delay-0 duration-300 ease-in hover:text-teal-500 focus:text-teal-500 active:text-teal-500' />

          <button
            className={clsx('rounded-full bg-red-600 p-4')}
            aria-controls='primary-navigation'
            aria-pressed={isOpen}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((previous) => !previous)}
          >
            <span className='sr-only'>Menu</span>
          </button>
        </div>
      </div>

      <nav
        className={clsx('group relative', styles.navigation)}
        data-state={isOpen ? 'opened' : 'closed'}
      >
        <ul
          className={clsx(
            `flex flex-col items-center gap-8 group-data-[state='opened']:absolute group-data-[state='opened']:top-0 group-data-[state='opened']:z-50 group-data-[state='opened']:min-w-full group-data-[state='opened']:bg-red-700 group-data-[state='opened']:py-16 md:flex-row md:gap-14 md:py-10`
          )}
          aria-label='Primary Navigation'
          id='primary-navigation'
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
    </div>
  );
}
