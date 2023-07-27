'use client';

import { cn, off, on } from '@/lib';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { SiteLogo } from '../atoms';
import { Container } from './container';
import { DesktopNavigation } from './desktop';
import styles from './layout.module.scss';
import { MobileNavigation } from './mobile';

interface Props {}

function LayoutHeader(props: Props) {
  const pathname = usePathname();

  const isHome = pathname === '/';

  let header = React.useRef<HTMLDivElement>(null);
  let logoRef = React.useRef<HTMLDivElement>(null);
  let initial = React.useRef(true);

  // const blah = new IntersectionObserver((entries) => {});

  React.useEffect(() => {
    const bottomOffet = logoRef.current?.offsetTop ?? 0;
    const topOffset = 64;

    function updateProperty(prop: string, value: string) {
      console.log('setting property', { prop, value });
      document.documentElement.style.setProperty(prop, value);
    }

    function updateHeaderStyles() {}
    function updateLogoStyles() {}

    function update() {
      initial.current = false;
      console.log('updating');
    }

    update();
    on(window, 'scroll', update, { passive: true });
    on(window, 'resize', update);
    return () => {
      off(window, 'scroll', update, { passive: true });
      off(window, 'resize', update);
    };
  }, []);

  return (
    <React.Fragment>
      <header
        className={cn(
          'relative z-50 flex flex-col',
          styles.height,
          styles['bottom-margin']
        )}
      >
        {isHome && (
          <React.Fragment>
            <div
              ref={logoRef}
              className='order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]'
            />

            <Container
              className={cn('top-0 order-last -mb-3 pt-3', styles.position)}
            >
              <div className='relative'>
                <figure
                  className={cn(
                    'rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10',
                    'absolute left-0 top-3 origin-left transition-opacity',
                    styles['border-opacity'],
                    styles['border-transform']
                  )}
                >
                  <SiteLogo
                    size='lg'
                    className={cn('origin-left', styles['logo-transform'])}
                  />
                </figure>
              </div>
            </Container>
          </React.Fragment>
        )}

        <div ref={header} className={cn('top-0 z-10 pt-6', styles.position)}>
          <Container>
            <div className='relative flex gap-4'>
              <div className='flex flex-1'>
                {!isHome && (
                  <figure
                    aria-label='Prince Muel'
                    className={cn(
                      'rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10'
                    )}
                  >
                    <SiteLogo />
                  </figure>
                )}
              </div>

              <nav
                aria-label='Primary Navigation'
                className='flex flex-1 justify-end md:justify-center'
              >
                <MobileNavigation className='pointer-events-auto md:hidden' />
                <DesktopNavigation className='pointer-events-auto hidden md:block' />
              </nav>
            </div>
          </Container>
        </div>
      </header>

      {isHome && <div className={cn(styles['content-offset'])} />}
    </React.Fragment>
  );
}

// export { LayoutHeader };

export default LayoutHeader;
