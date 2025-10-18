import * as React from 'react';
import { Avatar, Box } from '@mui/material';
export default function SquareAvatar({
  images = [
    'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?w=100',
    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100',
    'https://images.unsplash.com/photo-1610069302033-6fee1f5791d2?w=100',
  ],
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
      }}
    >
      {images.map((image) => (
        <Avatar
          key={image}
          src={image}
          sx={{
            borderRadius: 1,
          }}
        />
      ))}
    </Box>
  );
}
