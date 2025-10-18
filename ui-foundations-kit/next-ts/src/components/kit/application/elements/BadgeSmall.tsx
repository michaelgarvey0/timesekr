'use client'
import * as React from 'react';
import { Box } from '@mui/material';
// Smaller badge component
function SimpleBadge({
  children,
  color = 'gray.600',
  bgcolor = 'gray.50',
  startAdornment = null,
  size = 'sm',
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
    ['primary.50', 'primary.700'],
    ['secondary.50', 'secondary.700'],
    ['success.50', 'success.700'],
    ['warning.50', 'warning.700'],
    ['error.50', 'error.700'],
  ],
}: {
  items: [string, string][];
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
      }}
    >
      {items.map((item: any, index: number) => {
        return (
          <SimpleBadge key={index} bgcolor={item[0]} color={item[1]}>
            Badge
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
