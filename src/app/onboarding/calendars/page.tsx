'use client';

import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CalendarConnectionForm from '@/components/CalendarConnectionForm';
import GoogleSSOModal from '@/components/GoogleSSOModal';
import CalendarSelectionModal from '@/components/CalendarSelectionModal';
import AppleCalendarModal from '@/components/AppleCalendarModal';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

interface ConnectedCalendar {
  provider: string;
  email?: string;
  id: string;
}

export default function CalendarsOnboardingPage() {
  const router = useRouter();
  const [connectedCalendars, setConnectedCalendars] = useState<ConnectedCalendar[]>([]);
  const [showSSOModal, setShowSSOModal] = useState(false);
  const [showCalendarSelection, setShowCalendarSelection] = useState(false);
  const [showAppleModal, setShowAppleModal] = useState(false);
  const [currentProvider, setCurrentProvider] = useState<string>('');

  const handleConnectCalendar = (provider: string) => {
    setCurrentProvider(provider);

    if (provider === 'google') {
      setShowSSOModal(true);
    } else if (provider === 'apple') {
      setShowAppleModal(true);
    } else {
      // For Microsoft, go straight to calendar selection for now
      setShowCalendarSelection(true);
    }
  };

  const handleSSOSuccess = () => {
    setShowSSOModal(false);
    setShowCalendarSelection(true);
  };

  const handleCalendarAuthorize = (selectedCalendars: any[]) => {
    // Add each selected calendar to the connected list
    const newCalendars = selectedCalendars.map(cal => ({
      provider: currentProvider,
      email: cal.email,
      id: `${currentProvider}-${cal.id}-${Date.now()}`,
    }));

    setConnectedCalendars([...connectedCalendars, ...newCalendars]);
    setShowCalendarSelection(false);
    setCurrentProvider('');
  };

  const handleRemoveCalendar = (id: string) => {
    setConnectedCalendars(connectedCalendars.filter(cal => cal.id !== id));
  };

  const handleSkip = () => {
    router.push('/onboarding/invite');
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      px: 4,
      py: 8,
      bgcolor: '#fafbfc',
    }}>
      <Box sx={{ maxWidth: 680, width: '100%' }}>
        {/* Welcome message */}
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mb: 1.5, fontWeight: 700, fontSize: '2.25rem' }}>
            Welcome! Let's get you set up 👋
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
            Connect your calendar and contacts to start scheduling instantly
          </Typography>
        </Box>

        {/* Value prop callout - cleaner design */}
        <Box
          sx={{
            p: 3,
            mb: 5,
            bgcolor: 'white',
            borderRadius: '12px',
            border: '1px solid',
            borderColor: 'grey.200',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            textAlign: 'center',
          }}
        >
          <Box sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: 'primary.50',
            mb: 1.5,
          }}>
            <AutoAwesomeIcon sx={{ color: 'primary.main', fontSize: 24 }} />
          </Box>
          <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary', lineHeight: 1.6 }}>
            When everyone connects, scheduling becomes instant. We'll access your calendar for availability and contacts for quick meeting setup.
          </Typography>
        </Box>

        <CalendarConnectionForm
          onConnect={handleConnectCalendar}
          onSkip={handleSkip}
          connectedCalendars={connectedCalendars}
          onRemove={handleRemoveCalendar}
        />

        {/* Modals */}
        <GoogleSSOModal
          open={showSSOModal}
          onClose={() => setShowSSOModal(false)}
          onSuccess={handleSSOSuccess}
        />

        <AppleCalendarModal
          open={showAppleModal}
          onClose={() => {
            setShowAppleModal(false);
            setCurrentProvider('');
          }}
          onFakeConnect={() => {
            // Simulate Apple Calendar connections
            const mockAppleCalendars = [
              { provider: 'apple', email: 'john@icloud.com', id: 'apple-1' },
              { provider: 'apple', email: 'john@icloud.com', id: 'apple-2' },
            ];
            setConnectedCalendars([...connectedCalendars, ...mockAppleCalendars]);
          }}
        />

        <CalendarSelectionModal
          open={showCalendarSelection}
          onClose={() => {
            setShowCalendarSelection(false);
            setCurrentProvider('');
          }}
          onAuthorize={handleCalendarAuthorize}
          provider={currentProvider}
        />
      </Box>
    </Box>
  );
}
