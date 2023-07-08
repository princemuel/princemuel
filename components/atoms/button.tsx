'use client';

import { cn } from '@/lib';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'cva';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center font-bold text-white transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default:
          'bg-brand-500 text-white hover:bg-brand-300 focus:bg-brand-300',
        neutral:
          'border border-black bg-white text-black hover:bg-black hover:text-white focus:bg-black focus:text-white',
        destructive:
          'bg-red-500 text-neutral-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-red-50 dark:hover:bg-red-900/90',
        outline:
          'border border-neutral-200 bg-white shadow-sm hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
        secondary:
          'bg-neutral-100 text-neutral-900 shadow-sm hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80',
        ghost:
          'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
        link: 'text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50',
        none: '',
      },
      text: {
        default: 'text-200 uppercase leading-300 tracking-100',
      },
      size: {
        default: 'px-12 py-5',
        sm: 'px-7 py-5',
        md: '',
        lg: '',
        none: null,
      },
      fullWidth: {
        true: 'w-full',
      },
      weight: {
        bold: 'font-bold',
        medium: 'font-medium',
        regular: 'font-normal',
      },
      radius: {
        default: 'rounded-lg',
        pill: 'rounded-pill',
        full: 'rounded-full',
        brand: 'rounded-brand',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      text: 'default',
      weight: 'bold',
    },
    compoundVariants: [
      // {
      //   variant: 'default',
      //   size: 'lg',
      //   fullWidth: true,
      //   weight: 'bold',
      // },
      // {
      //   variant: 'destructive',
      //   size: 'sm',
      //   fullWidth: true,
      // },
    ],
  }
);

interface ButtonVariants extends VariantProps<typeof buttonVariants> {}

const button = (variants: ButtonVariants, className = '') =>
  cn(buttonVariants(variants), className);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  asChild?: boolean;
}

/**
 * This component will render either a button or the child,
 * depending on the props that are passed to it. This make it ideal for
 * use as link as the button props are passed to the nested link.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      weight,
      text,
      size,
      radius,
      className,
      fullWidth,
      asChild = false,
      ...rest
    },
    ref
  ) => {
    const RenderedElement = asChild ? Slot : 'button';
    return (
      <RenderedElement
        className={button(
          { variant, text, size, weight, radius, fullWidth },
          className
        )}
        ref={ref}
        {...rest}
      />
    );
  }
);

Button.displayName = 'Button';

// only these two exports below are needed
export { Button, button }; ///////////////
// only these two exports above are needed
