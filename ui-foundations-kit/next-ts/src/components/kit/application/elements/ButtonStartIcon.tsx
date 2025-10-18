'use client'
import * as React from 'react';
import { Box, Button } from '@mui/material';
import { TbTrash } from 'react-icons/tb';
// start icon buttons
export default function ButtonStartIcon() {
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
        color='error'
        variant='contained'
        size='small'
        startIcon={<TbTrash />}
      >
        Delete
      </Button>
      <Button
        color='error'
        variant='contained'
        size='medium'
        startIcon={<TbTrash />}
      >
        Delete
      </Button>
      <Button
        color='error'
        variant='contained'
        size='large'
        startIcon={<TbTrash />}
      >
        Delete
      </Button>
    </Box>
  );
}
