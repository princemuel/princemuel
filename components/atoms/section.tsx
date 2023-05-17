import { SectionProvider } from '@/lib';
import * as React from 'react';

export const Section = <E extends React.ElementType = 'section'>({
  as,
  children,
  ...rest
}: ElementProps<E>) => {
  const RenderedElement = as || 'section';

  return (
    <RenderedElement {...rest}>
      <SectionProvider>{children}</SectionProvider>
    </RenderedElement>
  );
};

export const MainContent = Section;
