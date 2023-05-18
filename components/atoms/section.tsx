'use client';

import { LevelContext, useLevel } from '@/lib';
import * as React from 'react';

export const Section = <E extends React.ElementType = 'section'>({
  as,
  children,
  ...rest
}: ElementProps<E>) => {
  const level = useLevel();
  const RenderedElement = as || 'section';

  return (
    <RenderedElement {...rest}>
      <LevelContext.Provider value={(level + 1) as Level}>
        {children}
      </LevelContext.Provider>
    </RenderedElement>
  );
};
