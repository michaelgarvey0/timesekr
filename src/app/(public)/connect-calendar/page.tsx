'use client';

import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CalendarConnectionForm from './components/CalendarConnectionForm';

interface ConnectedCalendar {
  provider: string;
  email?: string;
  id: string;
}

export default function ConnectCalendarPage() {
  const router = useRouter();
  const [connectedCalendars, setConnectedCalendars] = useState<ConnectedCalendar[]>([]);

  const handleConnectCalendar = (provider: string) => {
    // Simulate connecting a calendar account
    const mockEmail = provider === 'ics' ? undefined : `user@${provider}.com`;
    const newCalendar: ConnectedCalendar = {
      provider,
      email: mockEmail,
      id: `${provider}-${Date.now()}`,
    };
    setConnectedCalendars([...connectedCalendars, newCalendar]);
  };

  const handleRemoveCalendar = (id: string) => {
    setConnectedCalendars(connectedCalendars.filter(cal => cal.id !== id));
  };

  const handleSkip = () => {
    router.push('/invite-team');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', p: 4, position: 'relative' }}>
      <IconButton
        onClick={() => router.back()}
        sx={{ position: 'absolute', top: 16, left: 16 }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Box sx={{ maxWidth: 320, width: '100%' }}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
          <Image
            src="/images/logomark.svg"
            alt="timesēkr"
            width={150}
            height={40}
            priority
          />
        </Box>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
          Connect your calendars
        </Typography>

        <CalendarConnectionForm
          onConnect={handleConnectCalendar}
          onSkip={handleSkip}
          connectedCalendars={connectedCalendars}
          onRemove={handleRemoveCalendar}
        />
      </Box>
    </Box>
  );
}
