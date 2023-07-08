import { cn } from '@/lib';
import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'cva';
import { cva } from 'cva';
import * as React from 'react';

const typographyVariants = cva('', {
  // defaultVariants: {
  //   variant: 'primary',
  //   size: 's',
  // },
  variants: {
    variant: {
      primary: 'text-black/90 dark:text-brand-500',
      secondary: 'text-brand-400 dark:text-brand-400',
      outline: '',
    },
    size: {
      s: '',
      xs: 'text-300 leading-200',
      sm: 'text-400 leading-400',
      md: 'text-500 leading-300',
      lg: 'text-600 leading-400',
      xl: 'text-700 leading-500',
    },

    weight: {
      bold: 'font-bold',
      medium: 'font-medium',
      regular: 'font-normal',
    },
  },
  compoundVariants: [
    {
      variant: 'secondary',
      size: 'xs',
      weight: 'bold',
      class: 'tracking-100',
    },
  ],
});

interface TypographyVariants extends VariantProps<typeof typographyVariants> {}
const typography = (variants: TypographyVariants, className = '') =>
  cn(typographyVariants(variants), className);
// const text = (variants: TypographyVariants) => typographyVariants(variants);

interface Props
  extends React.HTMLAttributes<HTMLParagraphElement>,
    TypographyVariants {
  asChild?: boolean;
}

/**
 * This component will render either a paragraph element
 * or the child depending on the props passed to it.
 */

const Typography = ({
  variant,
  weight,
  size,
  className,
  asChild = false,
  ...props
}: Props) => {
  const RenderedElement = asChild ? Slot : 'p';
  return (
    <RenderedElement
      className={typography({ variant, weight, size }, className)}
      {...props}
    />
  );
};

export { Typography };
