'use client'
import * as React from 'react';
import { Box, Button } from '@mui/material';
// secondary buttons
export default function ButtonSecondary() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <Button color='secondary' variant='contained' size='small'>
        Button
      </Button>
      <Button color='secondary' variant='contained' size='medium'>
        Button
      </Button>
      <Button color='secondary' variant='contained' size='large'>
        Button
      </Button>
    </Box>
  );
}
