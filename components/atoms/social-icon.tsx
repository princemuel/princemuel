import { cn } from '@/lib';
import Link from 'next/link';

interface Props {
  id: string;
  url: string;
  icon: IconRFCType;
  alt: string;
  className?: string;
}

const SocialIcon = ({ alt, url, icon: Icon, className }: Props) => {
  return (
    <Link
      //@ts-expect-error
      href={url}
      aria-label={alt}
      target='_blank'
      rel='noopener noreferrer'
      className={cn(className)}
    >
      <span className='sr-only'>{alt}</span>
      <Icon aria-hidden='true' className='icon' />
    </Link>
  );
};

export { SocialIcon };
