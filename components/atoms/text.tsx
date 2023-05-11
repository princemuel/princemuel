const Text = <E extends React.ElementType = 'p'>({
  as,
  children,
  ...rest
}: ElementProps<E>) => {
  const Rendered = as || 'p';
  return <Rendered {...rest}>{children}</Rendered>;
};

export { Text };
