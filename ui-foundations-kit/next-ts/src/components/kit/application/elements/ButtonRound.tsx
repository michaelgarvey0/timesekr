'use client'
import * as React from 'react';
import { Box, Button } from '@mui/material';
// round buttons
export default function ButtonRound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <Button
        color='primary'
        variant='contained'
        size='small'
        sx={{
          borderRadius: 99,
        }}
      >
        Button
      </Button>
      <Button
        color='primary'
        variant='contained'
        size='medium'
        sx={{
          borderRadius: 99,
        }}
      >
        Button
      </Button>
      <Button
        color='primary'
        variant='contained'
        size='large'
        sx={{
          borderRadius: 99,
        }}
      >
        Button
      </Button>
    </Box>
  );
}
