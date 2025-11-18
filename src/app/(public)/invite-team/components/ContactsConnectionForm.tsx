'use client';

import { Stack, Box, Typography, Button, Autocomplete, TextField } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

interface ContactsConnectionFormProps {
  onConnect: () => void;
  onSkip: () => void;
}

export default function ContactsConnectionForm({ onConnect, onSkip }: ContactsConnectionFormProps) {
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');

    // Split by common delimiters: newline, comma, semicolon, space
    const emails = pastedText
      .split(/[\n,;\s]+/)
      .map(email => email.trim())
      .filter(email => email.includes('@'));

    setInvitedEmails([...new Set([...invitedEmails, ...emails])]);
  };

  return (
    <Stack spacing={2} alignItems="stretch">
      <Box sx={{ textAlign: 'center', mb: 1 }}>
        <GroupAddIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
        <Typography variant="body2" color="text.secondary">
          Invite your team members to collaborate on meetings
        </Typography>
      </Box>

      <Autocomplete
        multiple
        freeSolo
        options={[]}
        value={invitedEmails}
        onChange={(_, newValue) => {
          // Filter out invalid emails
          const validEmails = newValue.filter(email =>
            typeof email === 'string' && email.includes('@')
          );
          setInvitedEmails(validEmails);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Email addresses"
            placeholder="Type email and press Enter"
            onPaste={handlePaste}
          />
        )}
        ChipProps={{
          size: 'small',
        }}
      />

      <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', px: 2 }}>
        Press Enter after each email, or paste multiple emails at once
      </Typography>

      {invitedEmails.length > 0 && (
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{ textTransform: 'none' }}
          onClick={onConnect}
        >
          Send {invitedEmails.length} Invite{invitedEmails.length !== 1 ? 's' : ''}
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
