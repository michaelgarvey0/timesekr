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
  const [inputValue, setInputValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedText = e.clipboardData.getData('text');

    // Split by common delimiters: newline, comma, semicolon, space, tab
    const emails = pastedText
      .split(/[\n,;\s\t]+/)
      .map(email => email.trim())
      .filter(email => email.includes('@') && email.length > 0);

    if (emails.length > 0) {
      e.preventDefault();
      setInvitedEmails([...new Set([...invitedEmails, ...emails])]);
      setInputValue('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;

      // Parse CSV - handle both comma and newline separated
      const emails = text
        .split(/[\n,;\s\t]+/)
        .map(email => email.trim())
        .filter(email => email.includes('@') && email.length > 0);

      setInvitedEmails([...new Set([...invitedEmails, ...emails])]);
    };
    reader.readAsText(file);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Box sx={{ maxWidth: 600, width: '100%' }}>
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
            Enter multiple email addresses to invite your team
          </Typography>
        </Box>

        <Autocomplete
          multiple
          freeSolo
          options={[]}
          value={invitedEmails}
          inputValue={inputValue}
          onInputChange={(_, newInputValue, reason) => {
            // Only update input value if user is typing (not when adding chips)
            if (reason === 'input') {
              setInputValue(newInputValue);
            } else if (reason === 'reset') {
              setInputValue('');
            }
          }}
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
              placeholder="colleague@company.com, teammate@company.com"
              onPaste={handlePaste}
              multiline
              minRows={4}
              maxRows={10}
            />
          )}
          ChipProps={{
            size: 'small',
          }}
        />

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="medium"
            startIcon={<UploadFileIcon />}
            fullWidth
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
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', px: 2 }}>
          Paste multiple emails separated by commas or upload a CSV file
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
    </Box>
  );
}
