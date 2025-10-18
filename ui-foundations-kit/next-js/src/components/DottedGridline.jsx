'use client';
import { Box, useTheme } from '@mui/material';
export function DottedGridline() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'relative',
        '&::after': {
          position: 'absolute',
          zIndex: 0,
          bottom: 0,
          background: `linear-gradient(90deg,${theme.palette.gray['100']},${theme.palette.gray['100']} 50%,transparent 0,transparent)`,
          backgroundSize: '8px 1px',
          content: "''",
          border: 'none',
          height: '1px',
          width: '100%',
        },
      }}
    />
  );
}
export function VerticalDottedGridline() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '&::after': {
          position: 'absolute',
          zIndex: 0,
          top: 0,
          bottom: 0,
          background: `linear-gradient(180deg,${theme.palette.gray['100']},${theme.palette.gray['100']} 50%,transparent 0,transparent)`,
          backgroundSize: '1px 8px',
          content: "''",
          border: 'none',
          height: '100%',
          width: '1px',
        },
      }}
    />
  );
}
