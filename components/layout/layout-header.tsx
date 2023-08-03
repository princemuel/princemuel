'use client';

import { GrainyBackgroundSVG } from '@/common';
import { FOCUS_VISIBLE_OUTLINE } from '@/config';
import { cn } from '@/lib';
import { Transition } from '@headlessui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Avatar, ThemeSwitch } from '../atoms';
import { Container } from './container';
import { DesktopNavigation } from './desktop';
import { MobileNavigation } from './mobile';

interface Props {}

export const LayoutHead = (props: Props) => {
  const showNav = useRef(false);
  const isHome = usePathname() === '/';
  const { ref } = useInView({
    root: null,
    rootMargin: '-100px',
    onChange(inView) {
      if (!isHome || (isHome && !inView)) {
        showNav.current = true;
      } else {
        showNav.current = false;
      }
    },
  });

  // useEffect(() => {
  //   if (!isHome || entry?.isIntersecting) {
  //     showNav.current = true;
  //   }

  //   return () => {
  //     showNav.current = false;
  //   };
  // }, [entry?.isIntersecting, isHome]);

  return (
    <>
      <GrainyBackgroundSVG
        className='pointer-events-none fixed isolate z-50 opacity-70 mix-blend-soft-light'
        width='100%'
        height='100%'
      />

      <header className='fixed top-0 z-30 w-full'>
        <Container>
          <nav
            aria-label='Primary Navigation'
            className='relative flex items-center gap-4'
          >
            <Transition
              className='pointer-events-auto mt-6 hidden w-full items-center gap-6 md:flex'
              show={showNav.current}
              enter='transition duration-100 ease-in-out'
              enterFrom='opacity-0 scale-90'
              enterTo='opacity-100 scale-100'
              leave='transition ease-in-out'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <NextLink
                href='/'
                title='View home page'
                className={cn('rounded-full', FOCUS_VISIBLE_OUTLINE)}
              >
                <Avatar interactive />
              </NextLink>

              <DesktopNavigation className='mx-auto' />

              <div className=''>
                <ThemeSwitch />
              </div>
            </Transition>

            <MobileNavigation
              showAvatar={showNav.current}
              className='pointer-events-auto mt-6 w-full md:hidden'
            />
          </nav>
        </Container>
      </header>

      {isHome && (
        <Container
          className={cn(
            'py-48 transition duration-300',
            showNav.current ? 'opacity-0' : 'opacity-100'
          )}
        >
          <div className='mt-2 flex items-center gap-6'>
            <Avatar size='large' />

            <div className='flex flex-col items-start gap-1'>
              <h1 className='text-3xl font-medium text-rose-100/80 sm:text-4xl'>
                Prince Muel
              </h1>
              {/* Had to use the ss breakpoint since tailwind's min not working */}
              <p className='flex flex-col gap-1.5 text-sm ss:flex-row ss:gap-1 sm:text-base'>
                <span className='hidden sm:inline'>
                  Frontend Engineer improving the web
                </span>
                <span className='sm:hidden'>Improving the web</span>
                <span>one character at a time</span>
              </p>
            </div>
          </div>
        </Container>
      )}

      <div
        ref={ref}
        data-id='content-offset'
        className={cn(!isHome && showNav.current && 'pt-48')}
      />
    </>
  );
};
