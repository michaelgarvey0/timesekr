'use client';
import { Box } from '@mui/material';
import { Logo } from '../components/Logo';
export function Footer() {
  return (
    <Box
      sx={{
        fontSize: 'sm',
        color: 'gray.400',
        display: 'flex',
        alignItems: { xs: 'center', sm: 'flex-start' },
        justifyContent: { xs: 'center', sm: 'flex-start' },
        flexDirection: 'column',
        gap: 0.5,
        width: '100%',
        px: { xs: 0, sm: 2 },
      }}
    >
      <Logo width={120} />
      <Box>
        © 2022 UI Foundations. All rights reserved. · Logos by{' '}
        <Box
          component="a"
          href="https://clearbit.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            opacity: 0.75,
            textDecoration: 'none',
            color: 'gray.400',
          }}
        >
          Clearbit
        </Box>{' '}
        ·{' '}
        <Box
          component="a"
          href="/docs/privacy"
          sx={{ opacity: 0.75, textDecoration: 'none', color: 'gray.400' }}
        >
          Privacy
        </Box>
      </Box>
    </Box>
  );
}
