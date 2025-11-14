'use client';

import { Box, Modal, Typography, Button, Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useState } from 'react';

interface Calendar {
  id: string;
  name: string;
  email: string;
}

interface CalendarSelectionModalProps {
  open: boolean;
  onClose: () => void;
  onAuthorize: (selectedCalendars: Calendar[]) => void;
  provider: string;
}

const mockCalendars: Calendar[] = [
  { id: 'cal-1', name: 'Personal', email: 'john.doe@gmail.com' },
  { id: 'cal-2', name: 'Work', email: 'john.doe@gmail.com' },
  { id: 'cal-3', name: 'Family', email: 'john.doe@gmail.com' },
  { id: 'cal-4', name: 'Work Calendar', email: 'work@company.com' },
  { id: 'cal-5', name: 'Team Events', email: 'work@company.com' },
];

export default function CalendarSelectionModal({ open, onClose, onAuthorize, provider }: CalendarSelectionModalProps) {
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>(['cal-1', 'cal-4']);

  const handleToggle = (calendarId: string) => {
    if (selectedCalendars.includes(calendarId)) {
      setSelectedCalendars(selectedCalendars.filter(id => id !== calendarId));
    } else {
      setSelectedCalendars([...selectedCalendars, calendarId]);
    }
  };

  const handleAuthorize = () => {
    const selected = mockCalendars.filter(cal => selectedCalendars.includes(cal.id));
    onAuthorize(selected);
  };

  const getProviderName = () => {
    if (provider === 'google') return 'Google';
    if (provider === 'apple') return 'Apple';
    if (provider === 'microsoft') return 'Microsoft';
    return provider;
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: 520,
          maxHeight: '80vh',
          bgcolor: 'white',
          borderRadius: '12px',
          boxShadow: 24,
          outline: 'none',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'grey.200' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
            Select calendars to connect
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Choose which {getProviderName()} calendars you'd like to sync with timesēkr
          </Typography>
        </Box>

        {/* Calendar list */}
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          <List sx={{ py: 0 }}>
            {mockCalendars.map((calendar, index) => (
              <ListItem
                key={calendar.id}
                disablePadding
                sx={{
                  borderBottom: index < mockCalendars.length - 1 ? '1px solid' : 'none',
                  borderColor: 'grey.100',
                }}
              >
                <ListItemButton
                  onClick={() => handleToggle(calendar.id)}
                  sx={{
                    py: 2,
                    '&:hover': {
                      bgcolor: 'grey.50',
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Checkbox
                      edge="start"
                      checked={selectedCalendars.includes(calendar.id)}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <CalendarTodayIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={calendar.name}
                    secondary={calendar.email}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      fontSize: '0.95rem',
                    }}
                    secondaryTypographyProps={{
                      fontSize: '0.8rem',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Footer */}
        <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'grey.200', display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              flex: 1,
              textTransform: 'none',
              py: 1.25,
              fontWeight: 500,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAuthorize}
            disabled={selectedCalendars.length === 0}
            sx={{
              flex: 1,
              textTransform: 'none',
              py: 1.25,
              fontWeight: 600,
            }}
          >
            Authorize {selectedCalendars.length > 0 && `(${selectedCalendars.length})`}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
