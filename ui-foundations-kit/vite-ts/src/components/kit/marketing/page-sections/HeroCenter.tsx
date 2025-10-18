import * as React from 'react';
import { Box, Typography } from '@mui/material';

export default function HeroCenter({
  decorative = 'All-in-One',
  title = "The Developer's Toolkit",
  subtitle = 'A terminal, editor, screenshot tool, file explorer, and database GUI, all—of course—powered by artificial intelligence.',
}: {
  decorative?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        flex: 1,
        height: '60vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 2,
        my: 6,
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          color: 'primary.500',
          fontWeight: 600,
          fontSize: 'sm',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}
      >
        {decorative}
      </Box>
      <Typography
        variant='h1'
        sx={{
          fontSize: { xs: '4xl', sm: '5xl', md: '6xl' },
          fontWeight: 800,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: 'lg',
          color: 'gray.500',
          maxWidth: '54ch',
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}
