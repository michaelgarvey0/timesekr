'use client';

import { Stack, Box, Typography, Button, Autocomplete, TextField } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useState, useRef } from 'react';

interface ContactsConnectionFormProps {
  onConnect: () => void;
  onSkip: () => void;
}

export default function ContactsConnectionForm({ onConnect, onSkip }: ContactsConnectionFormProps) {
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const emails = text
        .split(/[\n,;\s\t]+/)
        .map(email => email.trim())
        .filter(email => email.includes('@') && email.length > 0);

      setInvitedEmails([...new Set([...invitedEmails, ...emails])]);
    };
    reader.readAsText(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Box sx={{ width: 600 }}>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
        Invite your team
      </Typography>

      <Stack spacing={2} alignItems="stretch">
        <Box sx={{ textAlign: 'center', mb: 1 }}>
          <GroupAddIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
            Add your team members
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Type emails and press Enter, or paste multiple at once
          </Typography>
        </Box>

        <Autocomplete
          multiple
          freeSolo
          options={[]}
          value={invitedEmails}
          onChange={(_, newValue) => {
            const validEmails = newValue.filter(email =>
              typeof email === 'string' && email.includes('@')
            );
            setInvitedEmails(validEmails);
          }}
          onPaste={(e) => {
            const pastedText = e.clipboardData.getData('text');
            const emails = pastedText
              .split(/[\n,;\s\t]+/)
              .map(email => email.trim())
              .filter(email => email.includes('@') && email.length > 0);

            if (emails.length > 1) {
              e.preventDefault();
              setInvitedEmails([...new Set([...invitedEmails, ...emails])]);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Email addresses"
              placeholder="Type or paste emails here"
              autoComplete="off"
            />
          )}
          sx={{
            '& .MuiAutocomplete-inputRoot': {
              minHeight: 120,
              alignItems: 'flex-start',
              paddingTop: 1,
            },
          }}
        />

        <Button
          variant="outlined"
          size="medium"
          startIcon={<UploadFileIcon />}
          sx={{ textTransform: 'none' }}
          onClick={() => fileInputRef.current?.click()}
        >
          Upload CSV
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.txt"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />

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
          sx={{ textTransform: 'none' }}
          onClick={onSkip}
        >
          I'll do this later
        </Button>
      </Stack>
    </Box>
  );
}
