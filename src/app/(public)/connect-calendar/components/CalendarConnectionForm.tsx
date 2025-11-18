'use client';

import { Box, Button, Stack, Typography, IconButton } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';

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
  { id: 'google', name: 'Google', description: 'Calendar & Contacts', icon: GoogleIcon },
  { id: 'apple', name: 'Apple', description: 'iOS App Required', icon: AppleIcon },
  { id: 'microsoft', name: 'Microsoft', description: 'Calendar & Contacts', icon: CalendarTodayIcon },
];

const getProviderIcon = (providerId: string) => {
  const provider = calendarProviders.find(p => p.id === providerId);
  return provider ? provider.icon : CalendarTodayIcon;
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
      {/* Calendar provider buttons */}
      <Stack spacing={2} sx={{ mb: connectedCalendars.length > 0 ? 3 : 4 }}>
        {calendarProviders.map((provider) => {
          const Icon = provider.icon;

          return (
            <Button
              key={provider.id}
              variant="outlined"
              onClick={() => onConnect(provider.id)}
              startIcon={<Icon />}
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                py: 1.5,
                px: 2,
                textTransform: 'none',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {provider.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {provider.description}
                </Typography>
              </Box>
            </Button>
          );
        })}
      </Stack>

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
                  <Icon sx={{ color: 'primary.main', fontSize: 24, mr: 1.5 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {calendar.email || `${providerName} Calendar`}
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
