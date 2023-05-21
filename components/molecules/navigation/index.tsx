'use client';

import { useMedia } from '@/lib';
import { NavDesktop } from './nav.desktop';
import { NavMobile } from './nav.mobile';

interface Props {}

export function Navigation(props: Props) {
  const isMobile = useMedia('(max-width: 48em)', true);

  return <>{isMobile ? <NavMobile /> : <NavDesktop />}</>;
}
