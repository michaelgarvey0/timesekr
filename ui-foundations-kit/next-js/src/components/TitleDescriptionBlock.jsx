'use client';
import { Box } from '@mui/material';
export function TitleDescriptionBlock({ title, description }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
      }}
    >
      <Box component="h3" sx={{ fontSize: 'md', fontWeight: 600, my: 0 }}>
        {title}
      </Box>
      <Box sx={{ fontSize: 'sm', color: 'gray.500' }}>{description}</Box>
    </Box>
  );
}
