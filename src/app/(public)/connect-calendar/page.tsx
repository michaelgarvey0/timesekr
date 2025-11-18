'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CalendarConnectionForm from './components/CalendarConnectionForm';
import CalendarSelectionModal from './components/CalendarSelectionModal';

interface ConnectedCalendar {
  provider: string;
  email?: string;
  id: string;
}

interface ModalState {
  open: boolean;
  provider: string;
  providerName: string;
  providerIcon: string;
}

const calendarProviders = [
  { id: 'google', name: 'Google Calendar', icon: '/images/icons/google.svg' },
  { id: 'apple', name: 'Apple Calendar', icon: '/images/icons/apple.svg' },
  { id: 'microsoft', name: 'Microsoft Calendar', icon: '/images/icons/microsoft.svg' },
];

// Mock calendar data - in real app this would come from API after OAuth
const mockCalendars = [
  { id: 'cal-1', name: 'Work Calendar' },
  { id: 'cal-2', name: 'Personal Calendar' },
  { id: 'cal-3', name: 'Team Events' },
];

export default function ConnectCalendarPage() {
  const router = useRouter();
  const [connectedCalendars, setConnectedCalendars] = useState<ConnectedCalendar[]>([]);
  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    provider: '',
    providerName: '',
    providerIcon: '',
  });

  const handleConnectCalendar = (provider: string) => {
    // In real app, this would trigger OAuth flow
    // For now, just open the modal
    const providerData = calendarProviders.find(p => p.id === provider);
    if (providerData) {
      setModalState({
        open: true,
        provider: provider,
        providerName: providerData.name,
        providerIcon: providerData.icon,
      });
    }
  };

  const handleCloseModal = () => {
    setModalState(prev => ({ ...prev, open: false }));
  };

  const handleAuthorize = (selectedCalendarIds: string[]) => {
    // Simulate connecting calendars
    const mockEmail = `user@${modalState.provider}.com`;
    const newCalendar: ConnectedCalendar = {
      provider: modalState.provider,
      email: mockEmail,
      id: `${modalState.provider}-${Date.now()}`,
    };
    setConnectedCalendars([...connectedCalendars, newCalendar]);
    handleCloseModal();
  };

  const handleRemoveCalendar = (id: string) => {
    setConnectedCalendars(connectedCalendars.filter(cal => cal.id !== id));
  };

  const handleSkip = () => {
    router.push('/invite-team');
  };

  return (
    <Box sx={{ minHeight: '100vh', p: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: 32, left: 32 }}>
        <Image
          src="/images/logomark.svg"
          alt="timesēkr"
          width={150}
          height={40}
          priority
        />
      </Box>

      <Box sx={{ maxWidth: 600, width: '100%' }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, textAlign: 'center' }}>
          Welcome! Let's connect your calendars
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
          Connect your calendars so we can instantly find meeting times
        </Typography>

        <CalendarConnectionForm
          onConnect={handleConnectCalendar}
          onSkip={handleSkip}
          connectedCalendars={connectedCalendars}
          onRemove={handleRemoveCalendar}
        />
      </Box>

      <CalendarSelectionModal
        open={modalState.open}
        onClose={handleCloseModal}
        providerName={modalState.providerName}
        providerIcon={modalState.providerIcon}
        email={`user@${modalState.provider}.com`}
        calendars={mockCalendars}
        onAuthorize={handleAuthorize}
      />
    </Box>
  );
}
