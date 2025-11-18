'use client';

import { Box, Button, Stack, Typography, IconButton, Alert } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

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
  { id: 'google', name: 'Google Calendar', description: 'Calendar & Contacts', icon: GoogleIcon, color: '#4285F4' },
  { id: 'apple', name: 'Apple Calendar', description: 'iOS App Required', icon: AppleIcon, color: '#000000' },
  { id: 'microsoft', name: 'Microsoft Calendar', description: 'Calendar & Contacts', icon: CalendarTodayIcon, color: '#00A4EF' },
];

const getProviderIcon = (providerId: string) => {
  const provider = calendarProviders.find(p => p.id === providerId);
  return provider ? provider.icon : CalendarTodayIcon;
};

const getProviderName = (providerId: string) => {
  const provider = calendarProviders.find(p => p.id === providerId);
  return provider ? provider.name : providerId;
};

const getProviderColor = (providerId: string) => {
  const provider = calendarProviders.find(p => p.id === providerId);
  return provider ? provider.color : '#000000';
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
          gap: 2,
          mb: connectedCalendars.length > 0 ? 3 : 4,
        }}
      >
        {calendarProviders.map((provider) => {
          const Icon = provider.icon;

          return (
            <Button
              key={provider.id}
              variant="outlined"
              onClick={() => onConnect(provider.id)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                py: 3,
                px: 2,
              }}
            >
              <Icon sx={{ fontSize: 40, color: provider.color }} />
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
              const Icon = getProviderIcon(calendar.provider);
              const providerName = getProviderName(calendar.provider);
              const providerColor = getProviderColor(calendar.provider);

              return (
                <Box
                  key={calendar.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 1.5,
                    border: '1px solid',
                    borderColor: 'grey.300',
                    borderRadius: 1.5,
                    bgcolor: 'background.paper',
                  }}
                >
                  <Icon sx={{ color: providerColor, fontSize: 24, mr: 1.5 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {calendar.email || `${providerName}`}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {providerName}
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
