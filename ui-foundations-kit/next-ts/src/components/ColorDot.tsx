'use client'
import { Box } from '@mui/material';

export function ColorDot({ color, size = 12 }: { color: string; size?: number }) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 16,
        height: 16,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size,
          bgcolor: `${color}.400`,
          opacity: 0.1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: size / 2,
          height: size / 2,
          borderRadius: size / 2,
          bgcolor: `${color}.500`,
        }}
      />
    </Box>
  );
}
