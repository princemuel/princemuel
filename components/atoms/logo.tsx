import { cn } from '@/lib';
import AvatarImage from '@/public/placeholder.jpg';
import Image from 'next/image';
import Link from 'next/link';

interface Props extends Omit<PropsFrom<typeof Link>, 'href'> {
  size?: 'lg' | 'sm';
}

const SiteLogo = ({ className, size = 'sm', ...props }: Props) => {
  return (
    <Link
      {...props}
      href={'/'}
      className={cn('block h-9 w-9', size === 'lg' && 'h-16 w-16', className)}
    >
      <Image
        src={AvatarImage}
        alt='placeholder'
        sizes={size === 'sm' ? '2.25rem' : '4rem'}
        className={cn(
          'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800'
          // 'h-9 w-9',
          // size === 'lg' && 'h-16 w-16'
        )}
        priority
      />
    </Link>
  );
};

export { SiteLogo };
