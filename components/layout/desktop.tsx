import { links } from '@/common';
import { NavLink } from '../atoms';

interface Props {
  className?: string;
}

const DesktopNavigation = ({ className }: Props) => {
  return (
    <div className={className}>
      <ul className='flex rounded-full bg-white/90 px-3 text-xs font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 lg:text-sm'>
        {links.map((route) => (
          <li key={`desktop-${route.id}`} className='capitalize'>
            <NavLink
              href={route.url}
              className='group relative block px-3 py-2 transition aria-[current="page"]:text-blue-500 hover:text-blue-500 focus:text-blue-500 dark:aria-[current="page"]:text-blue-500 dark:hover:text-blue-500 dark:focus:text-blue-500'
            >
              <span>{route.text}</span>
              <span className='absolute inset-x-1 -bottom-px hidden h-px bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 group-aria-[current="page"]:inline dark:from-blue-400/0 dark:via-blue-400/40 dark:to-blue-400/0' />
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { DesktopNavigation };
