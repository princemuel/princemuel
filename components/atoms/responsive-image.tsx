import { cx } from 'cva';
import Image from 'next/image';

interface Props extends ExtractElementProps<typeof Image> {
  containerClassName?: string;
}

const ResponsiveImage = ({
  alt,
  src,
  className,
  width = 650,
  height = 650,
  priority = false,
  containerClassName,
  ...rest
}: Props) => (
  <figure className={cx('h-full w-full', containerClassName)}>
    <Image
      src={src}
      alt={alt}
      className={cx('', className)}
      width={width}
      height={height}
      priority={priority}
      {...rest}
    />
  </figure>
);

export { ResponsiveImage };
