import { cn } from '@/lib';
import type { VariantProps } from 'cva';
import { cva } from 'cva';

// light:
// dark:

const textVariants = cva('', {
  defaultVariants: {
    variant: 'primary',
    size: 'base',
    family: 'sans',
    weight: 'regular',
  },
  variants: {
    variant: {
      primary: 'text-gray-900 dark:text-gray-100',
      secondary: 'text-brand-400 dark:text-brand-400',
      outline: 'text-blue-500',
      callout: 'text-orange-800 dark:text-orange-300',
    },
    size: {
      xs: 'text-300 leading-200',
      base: 'text-[0.9rem] leading-5',
      sm: 'text-base',
      md: 'text-lg',
      lg: 'text-2xl',
      xl: 'text-3xl',
      '2xl': '',
      '3xl': 'text-3xl tracking-tight',
      '4xl': 'text-4xl tracking-tight',
    },
    family: {
      sans: 'font-sans',
      accent: 'font-accent',
      mono: 'font-mono',
    },
    weight: {
      bold: 'font-bold',
      semibold: 'font-semibold',
      medium: 'font-medium',
      regular: 'font-normal',
      light: 'font-light',
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

interface TextVariants extends VariantProps<typeof textVariants> {}
const text = (variants: TextVariants, className = '') =>
  cn(textVariants(variants), className);
// const text = (variants: TextVariants) => textVariants(variants);

type Props<E extends React.ElementType = 'p'> = ElementProps<E> & TextVariants;

const Text = <E extends React.ElementType = 'p'>({
  as,
  variant,
  weight,
  family,
  size,
  className,
  children,
  ...rest
}: Props<E>) => {
  const Rendered = as || 'p';

  return (
    <Rendered
      className={text({ variant, weight, size, family }, className)}
      {...rest}
    >
      {children}
    </Rendered>
  );
};

export { Text };
