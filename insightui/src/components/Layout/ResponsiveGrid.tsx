// src/components/Layout/ResponsiveGrid.tsx
import React from 'react';
import { Grid, GridProps, Box } from '@mui/material';
import { useResponsive } from '../../hooks/useResponsive';

interface ResponsiveGridProps extends GridProps {
  children: React.ReactNode;
  mobileColumns?: 1 | 2;
  tabletColumns?: 1 | 2 | 3;
  desktopColumns?: 1 | 2 | 3 | 4 | 5 | 6;
  spacing?: number;
  itemMinWidth?: number;
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  mobileColumns = 1,
  tabletColumns = 2,
  desktopColumns = 3,
  spacing = 3,
  itemMinWidth = 250,
  ...props
}) => {
  const { isMobile, isTablet } = useResponsive();

  const calculateColumns = () => {
    if (isMobile) return mobileColumns;
    if (isTablet) return tabletColumns;
    return desktopColumns;
  };

  const columns = calculateColumns();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${itemMinWidth}px, 1fr))`,
        gap: spacing * 8,
        [theme.breakpoints.down('sm')]: {
          gridTemplateColumns: '1fr',
        },
        ...props.sx,
      }}
    >
      {React.Children.map(children, (child, index) => (
        <Box
          key={index}
          sx={{
            gridColumn: {
              xs: 'span 1',
              sm: `span ${mobileColumns === 2 && index % 2 === 0 ? 2 : 1}`,
              md: `span ${tabletColumns === 3 ? (index % 3 === 0 ? 3 : 1) : 1}`,
              lg: `span 1`,
            },
          }}
        >
          {child}
        </Box>
      ))}
    </Box>
  );
};

export default ResponsiveGrid;