'use client';

import { Box, Typography, Button, Stack } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import ContactsIcon from '@mui/icons-material/Contacts';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsIcon from '@mui/icons-material/Settings';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', p: 4 }}>
      <Box sx={{ maxWidth: 400, width: '100%' }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
          <Image
            src="/images/logomark.svg"
            alt="timesēkr"
            width={150}
            height={40}
            priority
          />
        </Box>

        <Typography variant="h5" sx={{ mb: 1, textAlign: 'center', fontWeight: 500 }}>
          Welcome to timesēkr
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
          Let's get started
        </Typography>

        <Stack spacing={2}>
          <Button
            variant="contained"
            size="large"
            startIcon={<EventIcon />}
            fullWidth
            onClick={() => router.push('/meeting/new')}
            sx={{
              textTransform: 'none',
              justifyContent: 'flex-start',
              px: 3,
            }}
          >
            Schedule Meeting
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<ContactsIcon />}
            fullWidth
            sx={{
              textTransform: 'none',
              justifyContent: 'flex-start',
              px: 3,
            }}
          >
            Manage Contacts
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<AccessTimeIcon />}
            fullWidth
            sx={{
              textTransform: 'none',
              justifyContent: 'flex-start',
              px: 3,
            }}
          >
            Add Availability
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<SettingsIcon />}
            fullWidth
            sx={{
              textTransform: 'none',
              justifyContent: 'flex-start',
              px: 3,
            }}
          >
            Preferences
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
