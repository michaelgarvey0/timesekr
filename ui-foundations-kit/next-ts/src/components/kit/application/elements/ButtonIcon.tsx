'use client'
import * as React from 'react';
import { Box, IconButton } from '@mui/material';
import { TbHeart, TbSend, TbTrash } from 'react-icons/tb';
// icon buttons
export default function ButtonIcon() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <IconButton color='primary' size='small'>
        <TbHeart />
      </IconButton>
      <IconButton color='error' size='medium'>
        <TbTrash />
      </IconButton>
      <IconButton color='secondary' size='large'>
        <TbSend />
      </IconButton>
    </Box>
  );
}
