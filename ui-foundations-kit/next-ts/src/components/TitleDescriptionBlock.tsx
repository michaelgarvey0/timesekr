'use client'
import { Box } from '@mui/material';

export function TitleDescriptionBlock({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
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
