'use client';

import { Button, Box, Typography } from '@mui/material';
import Image from 'next/image';

interface CalendarProviderButtonProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  onClick: (id: string) => void;
}

export default function CalendarProviderButton({
  id,
  name,
  description,
  icon,
  onClick
}: CalendarProviderButtonProps) {
  return (
    <Button
      variant="outlined"
      onClick={() => onClick(id)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        p: 3,
        borderColor: 'grey.300',
        boxShadow: 2,
      }}
    >
      <Image
        src={icon}
        width={72}
        height={72}
        alt={name}
        style={{ objectFit: 'contain' }}
      />
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem', mb: 0.5 }}>
          {name}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
          {description}
        </Typography>
      </Box>
    </Button>
  );
}
