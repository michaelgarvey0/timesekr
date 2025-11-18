'use client';

import { Box, Button, Stack, Typography, IconButton, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Image from 'next/image';
import { border } from '@/theme/tokens';

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
          mb: 4,
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
          mb: connectedCalendars.length > 0 ? 3 : 4,
        }}
      >
        {calendarProviders.map((provider) => {
          return (
            <Button
              key={provider.id}
              variant="outlined"
              onClick={() => onConnect(provider.id)}
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
                src={provider.icon}
                width={72}
                height={72}
                alt={provider.name}
                style={{ objectFit: 'contain' }}
              />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem', mb: 0.5 }}>
                  {provider.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                  {provider.description}
                </Typography>
              </Box>
            </Button>
          );
        })}
      </Box>

      {/* Connected calendars list */}
      {connectedCalendars.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
            Connected accounts ({connectedCalendars.length})
          </Typography>
          <Stack spacing={1}>
            {connectedCalendars.map((calendar) => {
              const providerIcon = getProviderIcon(calendar.provider);
              const providerName = getProviderName(calendar.provider);

              return (
                <Box
                  key={calendar.id}
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
                  <Image
                    src={providerIcon}
                    width={32}
                    height={32}
                    alt={providerName}
                    style={{ objectFit: 'contain', marginRight: '12px' }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {calendar.email || `${providerName}`}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={() => onRemove(calendar.id)}
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
            })}
          </Stack>
        </Box>
      )}

      <Stack spacing={2}>
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
          fullWidth
          onClick={onSkip}
        >
          I'll do this later
        </Button>
      </Stack>
    </Box>
  );
}
