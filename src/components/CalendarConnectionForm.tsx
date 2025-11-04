'use client';

import { Box, Button, Stack, Typography, Chip } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LinkIcon from '@mui/icons-material/Link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcon from '@mui/icons-material/Add';

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
  { id: 'google', name: 'Google Calendar', icon: GoogleIcon },
  { id: 'apple', name: 'Apple Calendar', icon: AppleIcon },
  { id: 'microsoft', name: 'Microsoft Calendar', icon: CalendarTodayIcon },
  { id: 'yahoo', name: 'Yahoo Calendar', icon: CalendarTodayIcon },
  { id: 'ics', name: '.ICS Link', icon: LinkIcon },
];

export default function CalendarConnectionForm({
  onConnect,
  onSkip,
  connectedCalendars,
  onRemove
}: CalendarConnectionFormProps) {
  const getConnectedCount = (providerId: string) => {
    return connectedCalendars.filter(cal => cal.provider === providerId).length;
  };

  const getConnectedForProvider = (providerId: string) => {
    return connectedCalendars.filter(cal => cal.provider === providerId);
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Box sx={{ textAlign: 'center', mb: 1 }}>
        <CalendarTodayIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
        <Typography variant="body2" color="text.secondary">
          We'll use your calendars to find available meeting times
        </Typography>
      </Box>

      {calendarProviders.map((provider) => {
        const Icon = provider.icon;
        const connected = getConnectedForProvider(provider.id);
        const hasConnected = connected.length > 0;

        return (
          <Box key={provider.id} sx={{ width: '100%' }}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Icon />}
              fullWidth
              sx={{
                textTransform: 'none',
                borderColor: hasConnected ? 'primary.main' : undefined,
                color: hasConnected ? 'primary.main' : undefined,
                fontWeight: hasConnected ? 500 : 400,
              }}
              onClick={() => onConnect(provider.id)}
            >
              {provider.name}
              {hasConnected && (
                <CheckCircleIcon sx={{ ml: 'auto', fontSize: 20 }} />
              )}
            </Button>

            {hasConnected && (
              <Box sx={{ mt: 1.5, pl: 2 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 1 }}>
                  {connected.map((cal) => (
                    <Chip
                      key={cal.id}
                      label={cal.email || `${provider.name} Account`}
                      onDelete={() => onRemove(cal.id)}
                      size="small"
                      sx={{
                        bgcolor: 'primary.50',
                        borderColor: 'primary.main',
                        '& .MuiChip-deleteIcon': {
                          color: 'primary.main',
                          '&:hover': {
                            color: 'primary.dark',
                          },
                        },
                      }}
                    />
                  ))}
                </Box>
                <Button
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => onConnect(provider.id)}
                  sx={{ textTransform: 'none' }}
                >
                  Add another
                </Button>
              </Box>
            )}
          </Box>
        );
      })}

      {connectedCalendars.length > 0 && (
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{ textTransform: 'none', mt: 2 }}
          onClick={onSkip}
        >
          Continue
        </Button>
      )}

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
