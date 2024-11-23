import '@/index.css';
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/contexts/theme-context';

interface RootProps {
  children: React.ReactNode;
}

export function Root({ children }: RootProps) {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Helmet>
          <meta content="#000000" name="theme-color" />
          <title>Activity Interval Timer</title>
        </Helmet>
        {children}
      </ThemeProvider>
    </HelmetProvider>
  );
}
