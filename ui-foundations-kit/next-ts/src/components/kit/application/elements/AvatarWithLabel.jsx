import * as React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
export default function AvatarWithLabel({ label = 'Kyle Gill', description = 'UI Designer' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 1,
      }}
    >
      <Avatar src="https://github.com/gillkyle.png?size=100" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
        }}
      >
        <Typography
          sx={{
            lineHeight: 1,
            fontSize: 'sm',
            fontWeight: 500,
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            lineHeight: 1,
            fontSize: 'xs',
            color: 'gray.500',
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
}
