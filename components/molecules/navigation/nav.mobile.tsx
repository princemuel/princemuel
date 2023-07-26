'use client';

import styles from '@/assets/styles/navigation.module.css';
import { links } from '@/common';
import { cn } from '@/lib';
import { useState } from 'react';
import { Logo, NavLink } from '../../atoms';

interface Props {
  className?: string;
}

export function NavMobile({ className }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn('bg-slate-700 text-zinc-800', className)}>
      <div className={cn('py-10 full-w-bg h-container')}>
        <div className='flex items-center justify-between bg-blue-600'>
          <Logo className='text-black transition-all delay-0 duration-300 ease-in hover:text-teal-500 focus:text-teal-500 active:text-teal-500' />

          <button
            className={cn('group rounded-full p-4', styles['menu-toggle'])}
            aria-controls='primary-navigation'
            aria-pressed={isOpen}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((previous) => !previous)}
          >
            {/* <span className='sr-only'>Menu</span> */}
            <svg
              fill='var(--button-color)'
              className={styles.hamburger}
              viewBox='0 0 100 100'
            >
              <rect
                className={cn(styles.line, styles.top)}
                width={80}
                height={10}
                x={10}
                y={25}
                rx={5}
              />
              <rect
                className={cn(styles.line, styles.middle)}
                width={80}
                height={10}
                x={10}
                y={45}
                rx={5}
              />
              <rect
                className={cn(styles.line, styles.bottom)}
                width={80}
                height={10}
                x={10}
                y={65}
                rx={5}
              />
            </svg>
          </button>
        </div>
      </div>

      <nav
        className={cn('group relative', styles.navigation)}
        data-state={isOpen ? 'opened' : 'closed'}
      >
        <ul
          className={cn(
            `flex flex-col items-center gap-8 group-data-[state='opened']:absolute group-data-[state='opened']:top-0 group-data-[state='opened']:z-50 group-data-[state='opened']:min-w-full group-data-[state='opened']:bg-red-700 group-data-[state='opened']:py-16 md:flex-row md:gap-14 md:py-10`
          )}
          aria-label='Primary Navigation'
          id='primary-navigation'
        >
          {links.map((link) => (
            <li
              key={link.text}
              className=' text-[1.4rem] capitalize transition-all delay-0 duration-300 ease-in hover:text-teal-500 focus:text-teal-500'
            >
              <NavLink href={link.url}>{link.text}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
