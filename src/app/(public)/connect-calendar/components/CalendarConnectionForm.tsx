'use client';

import { Box, Button, Stack, Typography, Alert } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CalendarProviderButton from './CalendarProviderButton';
import ConnectedCalendarItem from './ConnectedCalendarItem';

interface ConnectedCalendar {
  provider: string;
  email?: string;
  id: string;
}

interface CalendarConnectionFormProps {
  onConnect: (provider: string) => void;
  onSkip: () => void;
  connectedCalendars: ConnectedCalendar[];
  onRemove: (id: string) => void;
}

const calendarProviders = [
  { id: 'google', name: 'Google Calendar', description: 'Calendar & Contacts', icon: '/images/icons/google.svg' },
  { id: 'apple', name: 'Apple Calendar', description: 'iOS App Required', icon: '/images/icons/apple.svg' },
  { id: 'microsoft', name: 'Microsoft Calendar', description: 'Calendar & Contacts', icon: '/images/icons/microsoft.svg' },
];

const getProviderIcon = (providerId: string) => {
  const provider = calendarProviders.find(p => p.id === providerId);
  return provider ? provider.icon : '/images/icons/google.svg';
};

const getProviderName = (providerId: string) => {
  const provider = calendarProviders.find(p => p.id === providerId);
  return provider ? provider.name : providerId;
};

export default function CalendarConnectionForm({
  onConnect,
  onSkip,
  connectedCalendars,
  onRemove
}: CalendarConnectionFormProps) {

  return (
    <Box>
      {/* Callout alert box */}
      <Alert
        icon={<AutoAwesomeIcon />}
        severity="info"
        sx={{
          mb: 0,
          bgcolor: 'background.accentLight',
          borderColor: 'transparent',
          alignItems: 'center',
          '& .MuiAlert-icon': {
            color: 'primary.main',
          },
        }}
      >
        When everyone connects their calendars, scheduling becomes instant. No back-and-forth needed!
      </Alert>

      {/* Calendar provider buttons */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1.5,
          mt: 6,
          mb: 6,
        }}
      >
        {calendarProviders.map((provider) => (
          <CalendarProviderButton
            key={provider.id}
            id={provider.id}
            name={provider.name}
            description={provider.description}
            icon={provider.icon}
            onClick={onConnect}
          />
        ))}
      </Box>

      {/* Connected calendars list */}
      {connectedCalendars.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
            Connected accounts ({connectedCalendars.length})
          </Typography>
          <Stack spacing={1}>
            {connectedCalendars.map((calendar) => (
              <ConnectedCalendarItem
                key={calendar.id}
                id={calendar.id}
                providerIcon={getProviderIcon(calendar.provider)}
                providerName={getProviderName(calendar.provider)}
                email={calendar.email}
                onRemove={onRemove}
              />
            ))}
          </Stack>
        </Box>
      )}

      <Stack spacing={2} alignItems="center">
        {connectedCalendars.length > 0 && (
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={onSkip}
          >
            Continue
          </Button>
        )}

        <Button
          variant="text"
          onClick={onSkip}
          sx={{ px: 2 }}
        >
          I'll do this later
        </Button>
      </Stack>
    </Box>
  );
}
