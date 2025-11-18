'use client';

import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { border } from '@/theme/tokens';

interface ConnectedCalendarItemProps {
  id: string;
  providerIcon: string;
  providerName: string;
  email?: string;
  onRemove: (id: string) => void;
}

export default function ConnectedCalendarItem({
  id,
  providerIcon,
  providerName,
  email,
  onRemove
}: ConnectedCalendarItemProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 1.5,
        border: '1px solid',
        borderColor: 'grey.300',
        borderRadius: `${border.radius.md}px`,
        bgcolor: 'background.paper',
      }}
    >
      <img
        src={providerIcon}
        alt={providerName}
        style={{
          width: '32px',
          height: '32px',
          objectFit: 'contain',
          marginRight: '12px',
          imageRendering: 'crisp-edges'
        }}
      />
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {email || providerName}
        </Typography>
      </Box>
      <IconButton
        size="small"
        onClick={() => onRemove(id)}
        sx={{
          '&:hover': {
            color: 'error.main',
          }
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
