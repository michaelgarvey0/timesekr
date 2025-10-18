import * as React from 'react';
import { Avatar, AvatarGroup, Box, Typography } from '@mui/material';
// avatar group with non circular avatars
export default function AvatarGroupSquare({
  images = [
    'https://github.com/gillkyle.png?size=100',
    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100',
    'https://images.unsplash.com/photo-1610069302033-6fee1f5791d2?w=100',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100',
    'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?w=100',
  ],
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
      }}
    >
      <AvatarGroup
        max={4}
        spacing="small"
        sx={{
          '.MuiAvatar-root': {
            width: 36,
            height: 36,
            fontSize: 'sm',
            bgcolor: 'gray.300',
            borderRadius: 1,
            boxShadow: 1,
          },
        }}
      >
        {images.map((image) => (
          <Avatar key={image} src={image} />
        ))}
      </AvatarGroup>
      <Typography
        sx={{
          color: 'gray.500',
        }}
      >
        5 people liked this
      </Typography>
    </Box>
  );
}
