import * as React from 'react';
import { Avatar, Badge, Box, Typography } from '@mui/material';
// avatar group with badge for total avatars
export default function AvatarGroupBadge({
  images = [
    'https://github.com/gillkyle.png?size=100',
    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100',
    'https://images.unsplash.com/photo-1610069302033-6fee1f5791d2?w=100',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100',
    'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?w=100',
  ],
}) {
  const firstAvatar = images[0];
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
      }}
    >
      <Badge
        color="secondary"
        badgeContent={images.length}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        sx={{
          '.MuiBadge-badge': {
            padding: 0.25,
            height: 'max-content',
            borderRadius: 1,
            transform: 'scale(1) translate(20%, 20%)',
            borderColor: 'background.paper',
            borderWidth: 1,
            borderStyle: 'solid',
            fontSize: 'xs',
            fontWeight: 700,
            color: 'gray.600',
            backgroundColor: 'gray.200',
          },
        }}
      >
        <Avatar
          sx={{
            width: 24,
            height: 24,
            borderRadius: 1,
          }}
          src={firstAvatar}
        />
      </Badge>
      <Typography
        sx={{
          fontSize: 'sm',
        }}
      >
        Kyle Gill, Jamie Nguyen, Trey W...
      </Typography>
    </Box>
  );
}
