'use client'
import * as React from 'react';
import { Box } from '@mui/material';
// Badge component that uses a small dot as its adornment
function SimpleBadge({
  children,
  color = 'green.600',
  bgcolor = 'green.50',
  startAdornment = (
    <Box
      role='decoration'
      sx={{
        bgcolor: 'green.500',
        borderRadius: 999,
        height: '6px',
        width: '6px',
      }}
    />
  ),
  size = 'md',
  borderRadius = 999,
}: {
  children: React.ReactNode;
  color?: string;
  bgcolor?: string;
  startAdornment?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  borderRadius?: number;
}) {
  return (
    <Box
      sx={{
        color: color,
        bgcolor: bgcolor,
        borderRadius: borderRadius,
        gap: 0.5,
        fontWeight: 600,
        fontSize: 12 * sizeFactors[size],
        px: 1 * sizeFactors[size],
        py: 0.25 * sizeFactors[size],
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.1s ease-in-out',
      }}
    >
      {startAdornment && startAdornment}
      {children}
    </Box>
  );
}
// Example component implementing SimpleBadge
export default function Example({
  items = [
    ['green.50', 'green.700', 'sm'],
    ['green.50', 'green.700', 'md'],
  ],
}: {
  items: [string, string, string][];
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      {items.map((item: any, index: number) => {
        return (
          <SimpleBadge
            key={index}
            bgcolor={item[0]}
            color={item[1]}
            size={item[2]}
          >
            All systems online
          </SimpleBadge>
        );
      })}
    </Box>
  );
}
const sizeFactors = {
  sm: 0.85,
  md: 1,
  lg: 1.25,
};
