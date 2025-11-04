'use client';

import { Stack, Box, Typography, Button } from '@mui/material';
import ContactsIcon from '@mui/icons-material/Contacts';
import LinkIcon from '@mui/icons-material/Link';

interface ContactsConnectionFormProps {
  onConnect: () => void;
  onSkip: () => void;
}

export default function ContactsConnectionForm({ onConnect, onSkip }: ContactsConnectionFormProps) {
  return (
    <Stack spacing={2} alignItems="center">
      <Box sx={{ textAlign: 'center', mb: 1 }}>
        <ContactsIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
        <Typography variant="body2" color="text.secondary">
          Link your contacts to easily add attendees to meetings
        </Typography>
      </Box>

      <Button
        variant="outlined"
        size="large"
        startIcon={<LinkIcon />}
        fullWidth
        sx={{ textTransform: 'none' }}
        onClick={onConnect}
      >
        Link Contacts
      </Button>

      <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', px: 2 }}>
        We'll never contact anyone without your permission.{' '}
        <Button
          variant="text"
          size="small"
          sx={{ textTransform: 'none', minWidth: 'auto', p: 0, verticalAlign: 'baseline' }}
        >
          Privacy Policy
        </Button>
      </Typography>

      <Button
        variant="text"
        fullWidth
        sx={{ textTransform: 'none', mt: 1 }}
        onClick={onSkip}
      >
        I'll do this later
      </Button>
    </Stack>
  );
}
