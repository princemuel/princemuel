// 'use client';

// import { clamp, cn, off, on, pixelToRem } from '@/lib';
// import { usePathname } from 'next/navigation';
// import * as React from 'react';
// import { SiteLogo, ThemeSwitch } from '../atoms';
// import { Container } from './container';
// import { DesktopNavigation } from './desktop';
// import styles from './layout.module.scss';
// import { MobileNavigation } from './mobile';

// interface Props {}

// function LayoutHeader(props: Props) {
//   const pathname = usePathname();

//   const isHome = pathname === '/';

//   let headerRef = React.useRef<HTMLDivElement>(null);
//   let logoRef = React.useRef<HTMLDivElement>(null);
//   let initial = React.useRef(true);

//   // const blah = new IntersectionObserver((entries) => {});

//   React.useEffect(() => {
//     const bottomOffset = logoRef.current?.offsetTop ?? 0;
//     const topOffset = 64;

//     function updateProperty(prop: string, value: string) {
//       console.log('setting property', { prop, value });
//       document.documentElement.style.setProperty(prop, value);
//     }

//     function updateHeader() {
//       const { top, height } = headerRef.current?.getBoundingClientRect()!;
//       const verticalScroll = clamp(
//         window.scrollY,
//         0,
//         document.body.scrollHeight - window.innerHeight
//       );

//       if (initial.current) updateProperty('--position', 'sticky');

//       updateProperty('--content-offset', `${pixelToRem(bottomOffset)}rem`);

//       if (initial.current || verticalScroll < bottomOffset) {
//         updateProperty('--height', `${pixelToRem(bottomOffset + height)}rem`);
//         updateProperty(
//           '--bottom-margin',
//           `${pixelToRem(bottomOffset * -1)}rem`
//         );
//       } else if (top + height < topOffset * -1) {
//         const offset = Math.max(height, verticalScroll - topOffset);

//         updateProperty('--height', `${pixelToRem(offset)}rem`);
//         updateProperty('--bottom-margin', `${pixelToRem(height - offset)}rem`);
//       } else if (top === 0) {
//         updateProperty('--height', `${pixelToRem(verticalScroll + height)}rem`);
//         updateProperty(
//           '--bottom-margin',
//           `${pixelToRem(verticalScroll * -1)}rem`
//         );
//       }
//     }

//     function updateLogo() {
//       if (!isHome) return;

//       const scaleFrom = 1;
//       const scaleTo = 36 / 64;
//       const fromX = 0;
//       const toX = 2 / 16;

//       const verticalScroll = bottomOffset - window.scrollY;

//       let scale =
//         (verticalScroll * (scaleFrom - scaleTo)) / bottomOffset + scaleTo;
//       scale = clamp(scale, scaleFrom, scaleTo);

//       let xValue = (verticalScroll * (fromX - toX)) / bottomOffset + toX;
//       xValue = clamp(xValue, fromX, toX);

//       updateProperty(
//         '--logo-transform',
//         `translate3d(${xValue}rem, 0, 0) scale(${scale})`
//       );

//       const borderScale = 1 / (scaleTo / scale);
//       const borderX = (-toX + xValue) * borderScale;
//       const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`;

//       const borderOpacity = scale === scaleTo ? '1' : '0';

//       updateProperty('--border-transform', borderTransform);
//       updateProperty('--border-opacity', borderOpacity);
//     }

//     function update() {
//       updateHeader();
//       updateLogo();

//       initial.current = false;
//     }

//     update();

//     on(window, 'scroll', update, { passive: true });
//     on(window, 'resize', update);

//     return () => {
//       off(window, 'scroll', update, { passive: true });
//       off(window, 'resize', update);
//     };
//   }, [isHome]);

//   return (
//     <React.Fragment>
//       <header
//         className={cn(
//           'relative z-50 flex flex-col',
//           styles.height,
//           styles['bottom-margin']
//         )}
//       >
//         {isHome && (
//           <React.Fragment>
//             <div
//               ref={logoRef}
//               className='order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]'
//             />

//             <Container
//               className={cn('top-0 order-last -mb-3 pt-3', styles.position)}
//             >
//               <div className='relative'>
//                 <figure
//                   className={cn(
//                     'rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10',
//                     'absolute left-0 top-3 origin-left transition-opacity',
//                     styles['border-opacity'],
//                     styles['border-transform']
//                   )}
//                 >
//                   <SiteLogo
//                     size='lg'
//                     className={cn('origin-left', styles['logo-transform'])}
//                   />
//                 </figure>
//               </div>
//             </Container>
//           </React.Fragment>
//         )}

//         <div ref={headerRef} className={cn('top-0 z-10 pt-6', styles.position)}>
//           <Container>
//             <div className='relative flex items-center gap-4'>
//               <div className='flex flex-1'>
//                 {!isHome && (
//                   <figure
//                     aria-label='Prince Muel'
//                     className={cn(
//                       'rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10'
//                     )}
//                   >
//                     <SiteLogo />
//                   </figure>
//                 )}
//               </div>

//               <nav
//                 aria-label='Primary Navigation'
//                 // className='flex flex-1 justify-end md:justify-center'
//               >
//                 <MobileNavigation className='pointer-events-auto md:hidden' />
//                 <DesktopNavigation className='pointer-events-auto hidden md:block' />
//               </nav>

//               <div className='ml-auto hidden md:block'>
//                 <div>
//                   <ThemeSwitch />
//                 </div>
//               </div>
//             </div>
//           </Container>
//         </div>
//       </header>

//       {isHome && <div className={cn(styles['content-offset'])} />}
//     </React.Fragment>
//   );
// }

// // export { LayoutHeader };

// export default LayoutHeader;

export {};
