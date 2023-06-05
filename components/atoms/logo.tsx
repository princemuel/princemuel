import { icons } from '@/common';
import { cx } from 'cva';
import Link from 'next/link';

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <Link href={'/'} aria-label='Go to Home' legacyBehavior>
      <a className={cx(className)}>
        <span className='sr-only'>Go to Home</span>
        <icons.logo
          aria-hidden='true'
          className='fill-current stroke-transparent'
        />
      </a>
    </Link>
  );
};

export { Logo };
