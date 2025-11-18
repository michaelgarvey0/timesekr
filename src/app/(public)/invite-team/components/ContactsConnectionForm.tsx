'use client';

import { Stack, Box, Typography, Button, TextField, Chip } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useState, useRef, KeyboardEvent } from 'react';

interface ContactsConnectionFormProps {
  onConnect: () => void;
  onSkip: () => void;
}

export default function ContactsConnectionForm({ onConnect, onSkip }: ContactsConnectionFormProps) {
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addEmails = (emailsToAdd: string[]) => {
    const validEmails = emailsToAdd
      .map(email => email.trim())
      .filter(email => email.includes('@') && email.length > 0);

    if (validEmails.length > 0) {
      setInvitedEmails([...new Set([...invitedEmails, ...validEmails])]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (inputValue.trim()) {
        addEmails([inputValue]);
        setInputValue('');
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedText = e.clipboardData.getData('text');
    const emails = pastedText.split(/[\n,;\s\t]+/);

    if (emails.length > 1) {
      e.preventDefault();
      addEmails(emails);
      setInputValue('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const emails = text.split(/[\n,;\s\t]+/);
      addEmails(emails);
    };
    reader.readAsText(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setInvitedEmails(invitedEmails.filter(email => email !== emailToRemove));
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
            Enter email addresses and press Enter or comma
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Email addresses"
          placeholder="colleague@company.com"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          multiline
          minRows={4}
          maxRows={10}
        />

        {invitedEmails.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            {invitedEmails.map((email) => (
              <Chip
                key={email}
                label={email}
                onDelete={() => handleRemoveEmail(email)}
                size="small"
              />
            ))}
          </Box>
        )}

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
          Type or paste multiple emails, upload CSV, or press Enter/comma after each
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
