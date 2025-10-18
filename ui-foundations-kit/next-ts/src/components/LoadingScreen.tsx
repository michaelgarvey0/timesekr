'use client'
import { Box } from '@mui/material';
import { Logo } from '~/components/Logo';

export function LoadingScreen() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        overflowX: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Logo animate height={24} />
    </Box>
  );
}
