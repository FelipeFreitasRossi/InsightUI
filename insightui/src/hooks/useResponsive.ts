// src/hooks/useResponsive.ts
import { useState, useEffect } from 'react';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const breakpoints: Record<Breakpoint, number> = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

export const useResponsive = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xl');
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newBreakpoint: Breakpoint = 'xl';

      if (width < breakpoints.sm) newBreakpoint = 'xs';
      else if (width < breakpoints.md) newBreakpoint = 'sm';
      else if (width < breakpoints.lg) newBreakpoint = 'md';
      else if (width < breakpoints.xl) newBreakpoint = 'lg';

      setBreakpoint(newBreakpoint);
      setDimensions({ width, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = breakpoint === 'xs' || breakpoint === 'sm';
  const isTablet = breakpoint === 'md';
  const isDesktop = breakpoint === 'lg' || breakpoint === 'xl';

  return {
    breakpoint,
    dimensions,
    isMobile,
    isTablet,
    isDesktop,
    isXs: breakpoint === 'xs',
    isSm: breakpoint === 'sm',
    isMd: breakpoint === 'md',
    isLg: breakpoint === 'lg',
    isXl: breakpoint === 'xl',
  };
};