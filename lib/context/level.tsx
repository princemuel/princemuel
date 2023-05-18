'use client';

import * as React from 'react';

export const LevelContext = React.createContext<Level>(0);

export const useLevel = () => React.useContext(LevelContext);
