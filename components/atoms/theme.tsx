'use client';

import { useLayoutEffect, useRef } from 'react';

interface Props {}

const ThemeSwitch = (props: Props) => {
  const isMounted = useRef(false);

  useLayoutEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return <div>THemeSwitch</div>;
};

export { ThemeSwitch };