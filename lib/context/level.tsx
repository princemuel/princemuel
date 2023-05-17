'use client';

import * as React from 'react';

const LevelContext = React.createContext<Level>(0);

interface Props {
  children: React.ReactNode;
  value: Level;
}

export const LevelProvider = ({ children, value }: Props) => {
  return (
    <LevelContext.Provider value={(value + 1) as Level}>
      {children}
    </LevelContext.Provider>
  );
};

export const useLevel = () => {
  const level = React.useContext(LevelContext);
  if (level == undefined) {
    throw new Error('useLevel must be used in a LevelProvider');
  }
  return level;
};

export const SectionProvider = ({ children }: Omit<Props, 'value'>) => {
  const level = useLevel();
  return (
    <React.Fragment>
      <LevelProvider value={level}>{children}</LevelProvider>
    </React.Fragment>
  );
};
