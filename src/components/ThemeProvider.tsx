
import React from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  );
};

export default ThemeProvider;
