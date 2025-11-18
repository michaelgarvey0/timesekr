'use client';

import { Box, Typography, Checkbox, FormControlLabel, Stack, Button } from '@mui/material';
import { useState } from 'react';
import Modal from '@/components/Modal';

interface Calendar {
  id: string;
  name: string;
}

interface CalendarSelectionModalProps {
  open: boolean;
  onClose: () => void;
  providerName: string;
  providerIcon: string;
  email: string;
  calendars: Calendar[];
  onAuthorize: (selectedIds: string[]) => void;
}

export default function CalendarSelectionModal({
  open,
  onClose,
  providerName,
  providerIcon,
  email,
  calendars,
  onAuthorize
}: CalendarSelectionModalProps) {
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>(
    calendars.map(cal => cal.id) // Default: all selected
  );

  const handleToggle = (calendarId: string) => {
    setSelectedCalendars(prev =>
      prev.includes(calendarId)
        ? prev.filter(id => id !== calendarId)
        : [...prev, calendarId]
    );
  };

  const handleAuthorize = () => {
    onAuthorize(selectedCalendars);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      maxWidth="sm"
      actions={
        <Stack direction="row" spacing={2} width="100%" justifyContent="flex-end">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAuthorize}>
            Authorize
          </Button>
        </Stack>
      }
    >
      <Box sx={{ textAlign: 'center' }}>
        <img
          src={providerIcon}
          alt={providerName}
          style={{
            width: '72px',
            height: '72px',
            objectFit: 'contain',
            marginBottom: '24px'
          }}
        />

        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Select Calendars to Connect
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          We found {calendars.length} calendar{calendars.length !== 1 ? 's' : ''} from {email}. Select which are relevant to your availability below.
        </Typography>
      </Box>

      <Stack spacing={1}>
        {calendars.map(calendar => (
          <FormControlLabel
            key={calendar.id}
            control={
              <Checkbox
                checked={selectedCalendars.includes(calendar.id)}
                onChange={() => handleToggle(calendar.id)}
              />
            }
            label={calendar.name}
          />
        ))}
      </Stack>
    </Modal>
  );
}
