'use client';

import { Stack, Box, Typography, Button, TextField, Chip } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

interface ContactsConnectionFormProps {
  onConnect: () => void;
  onSkip: () => void;
}

export default function ContactsConnectionForm({ onConnect, onSkip }: ContactsConnectionFormProps) {
  const [email, setEmail] = useState('');
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);

  const handleAddEmail = () => {
    if (email && email.includes('@')) {
      setInvitedEmails([...invitedEmails, email]);
      setEmail('');
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setInvitedEmails(invitedEmails.filter(e => e !== emailToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddEmail();
    }
  };

  return (
    <Stack spacing={2} alignItems="stretch">
      <Box sx={{ textAlign: 'center', mb: 1 }}>
        <GroupAddIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
        <Typography variant="body2" color="text.secondary">
          Invite your team members to collaborate on meetings
        </Typography>
      </Box>

      <TextField
        fullWidth
        size="small"
        label="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="colleague@company.com"
      />

      <Button
        variant="outlined"
        size="large"
        startIcon={<SendIcon />}
        fullWidth
        sx={{ textTransform: 'none' }}
        onClick={handleAddEmail}
        disabled={!email || !email.includes('@')}
      >
        Add Email
      </Button>

      {invitedEmails.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, py: 1 }}>
          {invitedEmails.map((invitedEmail) => (
            <Chip
              key={invitedEmail}
              label={invitedEmail}
              onDelete={() => handleRemoveEmail(invitedEmail)}
              size="small"
            />
          ))}
        </Box>
      )}

      {invitedEmails.length > 0 && (
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{ textTransform: 'none' }}
          onClick={onConnect}
        >
          Send Invites
        </Button>
      )}

      <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', px: 2 }}>
        Invites will be sent via email to join your team
      </Typography>

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
