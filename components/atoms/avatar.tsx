import { cn } from '@/lib';
import NextImage from 'next/image';

interface Props {
  alt?: string;
  interactive?: boolean;
  size?: 'small' | 'large';
  src?: string;
}

export function Avatar({
  src = '/placeholder.jpg',
  alt = 'A Photo of Prince Muel',
  size = 'small',
  interactive = false,
}: Props) {
  return (
    <div
      className={cn(
        'rounded-full bg-gradient-to-tl from-purple-700/60 to-rose-400/60 shadow-lg ring-4 ring-purple-500/10',
        size === 'small' && 'p-[2px]',
        size === 'large' && 'p-[3px]',
        interactive &&
          'group transform transition ease-out hover:scale-105 hover:from-purple-700 hover:to-rose-400 hover:shadow-rose-500/25 active:translate-y-px'
      )}
    >
      <figure
        className={cn(
          'rounded-full p-px',
          size === 'small' && 'h-9 w-9',
          size === 'large' && 'h-16 w-16',
          interactive && 'transition duration-300 group-hover:scale-105'
        )}
      >
        <NextImage
          src={src}
          alt={alt}
          quality={95}
          priority={true}
          className='rounded-full'
          width={size === 'small' ? 36 : 64}
          height={size === 'small' ? 36 : 64}
        />
      </figure>
    </div>
  );
}
