'use client';

import { Box, Typography } from '@mui/material';
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
    <Box sx={{ minHeight: '100vh', p: 4 }}>
      <Box sx={{ mb: 6 }}>
        <Image
          src="/images/logomark.svg"
          alt="timesēkr"
          width={150}
          height={40}
          priority
        />
      </Box>

      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
          Welcome! Let's connect your calendars
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Connect your calendars so we can instantly find meeting times
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
