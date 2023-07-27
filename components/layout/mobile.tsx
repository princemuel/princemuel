// 'use client';

import { links } from '@/common';
import { Popover, Transition } from '@headlessui/react';
import { AlignJustify, X } from 'lucide-react';
import { Fragment } from 'react';
import { NavLink, Text, ThemeSwitch } from '../atoms';

interface Props {
  className?: string;
}

const MobileNavigation = ({ className }: Props) => {
  return (
    <Popover className={className}>
      <Popover.Button className='ring-1 ring-zinc-900/5 backdrop-blur dark:ring-white/10 dark:hover:ring-white/20'>
        <span className='sr-only'>Menu</span>
        <AlignJustify className='stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400' />
      </Popover.Button>

      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter='transition duration-100 ease-out'
          enterFrom='transform scale-95 opacity-0'
          enterTo='transform scale-100 opacity-100'
          leave='transition duration-75 ease-out'
          leaveFrom='transform scale-100 opacity-100'
          leaveTo='transform scale-95 opacity-0'
        >
          <Popover.Overlay className='fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80' />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter='transition duration-100 ease-out'
          enterFrom='transform scale-95 opacity-0'
          enterTo='transform scale-100 opacity-100'
          leave='transition duration-75 ease-out'
          leaveFrom='transform scale-100 opacity-100'
          leaveTo='transform scale-95 opacity-0'
        >
          <Popover.Panel
            className='fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800'
            focus
          >
            <div className='flex flex-row-reverse items-center justify-between'>
              <Popover.Button aria-label='Close menu' className='-m-1 p-1'>
                <X className='h-6 w-6 text-zinc-500 dark:text-zinc-400' />
              </Popover.Button>

              <Text as='h2' variant={'outline'} weight={'bold'}>
                Navigation
              </Text>
            </div>

            <div className='mt-6'>
              <ul className='-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300'>
                {links.map((route) => {
                  return (
                    <Popover.Button
                      as={NavLink}
                      key={`mobile-${route.id}`}
                      href={route.url}
                      className='block py-2 capitalize'
                    >
                      {route.text}
                    </Popover.Button>
                  );
                })}
              </ul>
            </div>

            <div className='mt-6'>
              <div className='flex items-center justify-between'>
                <Text>Switch theme</Text>
                <ThemeSwitch />
              </div>
            </div>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
};

export { MobileNavigation };
