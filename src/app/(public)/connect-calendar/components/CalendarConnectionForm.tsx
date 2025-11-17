'use client';

import { Box, Button, Stack, Typography, IconButton, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
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
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2.5,
          width: '100%',
          mb: connectedCalendars.length > 0 ? 4 : 5,
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
                width: '100%',
                height: 140,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                p: 3,
                textTransform: 'none',
                borderRadius: '12px',
                border: '1.5px solid',
                borderColor: 'grey.300',
                bgcolor: 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: 'grey.50',
                  borderColor: 'grey.400',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }
              }}
            >
              <Icon sx={{
                fontSize: 44,
                color: 'text.secondary',
              }} />
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    lineHeight: 1.3,
                    mb: 0.5,
                  }}
                >
                  {provider.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    display: 'block',
                  }}
                >
                  {provider.description}
                </Typography>
              </Box>
            </Button>
          );
        })}
      </Box>

      {/* Connected calendars list */}
      {connectedCalendars.length > 0 && (
        <Box
          sx={{
            mb: 4,
            bgcolor: 'white',
            border: '1px solid',
            borderColor: 'grey.200',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ px: 3, py: 2, bgcolor: 'grey.50', borderBottom: '1px solid', borderColor: 'grey.200' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Connected Accounts ({connectedCalendars.length})
            </Typography>
          </Box>
          <List sx={{ py: 0 }}>
            {connectedCalendars.map((calendar, index) => {
              const Icon = getProviderIcon(calendar.provider);
              const providerName = getProviderName(calendar.provider);

              return (
                <ListItem
                  key={calendar.id}
                  sx={{
                    borderBottom: index < connectedCalendars.length - 1 ? '1px solid' : 'none',
                    borderColor: 'grey.100',
                    py: 2,
                  }}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => onRemove(calendar.id)}
                      sx={{
                        '&:hover': {
                          bgcolor: 'error.50',
                          color: 'error.main',
                        }
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  }
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Icon sx={{ color: 'primary.main', fontSize: 28 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={calendar.email || `${providerName} Calendar`}
                    secondary={providerName}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      fontSize: '0.95rem',
                    }}
                    secondaryTypographyProps={{
                      fontSize: '0.8rem',
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>
      )}

      <Stack spacing={2} alignItems="center">
        {connectedCalendars.length > 0 && (
          <Button
            variant="contained"
            size="large"
            sx={{
              textTransform: 'none',
              px: 6,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.2)',
              '&:hover': {
                boxShadow: '0 4px 16px rgba(25, 118, 210, 0.3)',
              }
            }}
            onClick={onSkip}
          >
            Continue
          </Button>
        )}

        <Button
          variant="text"
          sx={{
            textTransform: 'none',
            color: 'text.secondary',
            fontSize: '0.95rem',
            fontWeight: 500,
            '&:hover': {
              bgcolor: 'transparent',
              color: 'text.primary',
            }
          }}
          onClick={onSkip}
        >
          I'll do this later
        </Button>
      </Stack>
    </Box>
  );
}
