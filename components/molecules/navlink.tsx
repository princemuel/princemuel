'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

interface Props extends ExtractElementProps<typeof Link> {}

/**
 * This component adds route-aware properties to the Next.js'
 * default Link component similar to the NavLink component in
 * React-Router
 * @returns JSX.Element
 */
const NavLink = ({ href, children, ...props }: Props) => {
  const pathname = usePathname();
  const child = React.Children.only(children) as React.ReactElement;

  href =
    href &&
    href !== '/' &&
    (href as __next_route_internal_types__.RouteImpl<string>).endsWith('/')
      ? ((href as __next_route_internal_types__.RouteImpl<string>).slice(
          0,
          -1
        ) as __next_route_internal_types__.RouteImpl<string>)
      : (href as __next_route_internal_types__.RouteImpl<string>);

  const isCurrentPath = href === pathname || pathname?.startsWith(href + '/');

  return (
    <Link href={href} passHref {...props} legacyBehavior>
      {React.cloneElement(child, {
        className: clsx(child?.props?.className),
        'aria-current': isCurrentPath ? 'page' : 'false',
      })}
    </Link>
  );
};

export { NavLink };
