import { cn } from '@/lib';
import * as React from 'react';

type DivProps = JSX.IntrinsicElements['div'];

interface OuterProps {}
interface InnerProps {}
interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Container = React.forwardRef<HTMLDivElement, Props>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <Outer ref={forwardedRef} {...props}>
        <Inner>{children}</Inner>
      </Outer>
    );
  }
);

const Outer = React.forwardRef<HTMLDivElement, Props>(
  ({ className, children, ...props }, forwardedRef) => {
    return (
      <div ref={forwardedRef} className={cn('sm:px-8', className)} {...props}>
        <div className='mx-auto w-full max-w-7xl lg:px-8'>{children}</div>
      </div>
    );
  }
);

const Inner = React.forwardRef<HTMLDivElement, Props>(
  ({ className, children, ...props }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        className={cn('relative px-4 sm:px-8 lg:px-12', className)}
        {...props}
      >
        <div className='mx-auto max-w-2xl lg:max-w-5xl'>{children}</div>
      </div>
    );
  }
);

Outer.displayName = 'OuterContainer';
Inner.displayName = 'InnerContainer';
Container.displayName = 'Container';

// @ts-expect-error
Container.OuterContainer = Outer;
// @ts-expect-error
Container.InnerContainer = Inner;
