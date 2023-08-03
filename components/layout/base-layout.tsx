import * as React from 'react';
import { TailwindIndicator } from '../atoms';
import { LayoutHead } from './layout-header';

interface Props {
  children: React.ReactNode;
}

export function BaseLayout({ children }: Props) {
  return (
    <React.Fragment>
      <LayoutHead />
      {children}
      <TailwindIndicator />
    </React.Fragment>
  );
}
