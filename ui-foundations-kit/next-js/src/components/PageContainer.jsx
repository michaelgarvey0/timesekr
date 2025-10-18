'use client';
import { Container } from '@mui/material';
import * as React from 'react';
export function PageContainer({ fullWidth, maxWidth = undefined, children, customSx = {} }) {
  return (
    <Container
      data-tour="page-container"
      maxWidth={fullWidth ? false : maxWidth}
      component="main"
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        position: 'relative',
        mt: 4,
        mb: { xs: 6, sm: 4 },
        ...customSx,
      }}
    >
      {children}
    </Container>
  );
}
