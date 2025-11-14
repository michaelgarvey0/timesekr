'use client';

import { Box, Typography, Button, TextField, Card, CardContent, Stack, Chip, IconButton, Alert, Divider } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

interface InvitedPerson {
  email: string;
  name?: string;
}

export default function InvitePeopleOnboardingPage() {
  const router = useRouter();
  const [invitedPeople, setInvitedPeople] = useState<InvitedPerson[]>([]);
  const [emailInput, setEmailInput] = useState('');
  const [bulkInput, setBulkInput] = useState('');
  const [showBulkInput, setShowBulkInput] = useState(false);
  const [invitationsSent, setInvitationsSent] = useState(false);

  const handleAddEmail = () => {
    if (emailInput && emailInput.includes('@')) {
      const trimmedEmail = emailInput.trim().toLowerCase();
      // Check if already added
      if (!invitedPeople.some(p => p.email === trimmedEmail)) {
        setInvitedPeople([...invitedPeople, { email: trimmedEmail }]);
        setEmailInput('');
      }
    }
  };

  const handleRemoveEmail = (email: string) => {
    setInvitedPeople(invitedPeople.filter(p => p.email !== email));
  };

  const handleParseBulk = () => {
    const lines = bulkInput.split(/[\n,;]/).filter(line => line.trim());
    const newPeople: InvitedPerson[] = [];

    lines.forEach(line => {
      const trimmed = line.trim();
      // Simple email regex
      const emailMatch = trimmed.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
      if (emailMatch) {
        const email = emailMatch[1].toLowerCase();
        // Check if not already added
        if (!invitedPeople.some(p => p.email === email) && !newPeople.some(p => p.email === email)) {
          newPeople.push({ email });
        }
      }
    });

    setInvitedPeople([...invitedPeople, ...newPeople]);
    setBulkInput('');
    setShowBulkInput(false);
  };

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        // Parse CSV - expecting email as first column or email header
        const lines = text.split('\n');
        const newPeople: InvitedPerson[] = [];

        lines.forEach((line, index) => {
          if (index === 0 && line.toLowerCase().includes('email')) return; // Skip header

          const columns = line.split(',');
          const emailColumn = columns[0]?.trim();

          if (emailColumn && emailColumn.includes('@')) {
            const email = emailColumn.toLowerCase();
            if (!invitedPeople.some(p => p.email === email) && !newPeople.some(p => p.email === email)) {
              newPeople.push({ email });
            }
          }
        });

        setInvitedPeople([...invitedPeople, ...newPeople]);
      };
      reader.readAsText(file);
    }
  };

  const handleSendInvites = () => {
    // Simulate sending invites
    setInvitationsSent(true);
    setTimeout(() => {
      router.push('/home');
    }, 2000);
  };

  const handleSkip = () => {
    router.push('/home');
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      px: 4,
      py: 8,
      bgcolor: '#fafbfc',
    }}>
      <Box sx={{ maxWidth: 680, width: '100%' }}>
        {/* Welcome message */}
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mb: 1.5, fontWeight: 700, fontSize: '2.25rem' }}>
            Invite your team 👥
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
            Get everyone on board to unlock the power of instant scheduling
          </Typography>
        </Box>

        {/* Value prop callout */}
        <Box
          sx={{
            p: 3,
            mb: 5,
            bgcolor: 'white',
            borderRadius: '12px',
            border: '1px solid',
            borderColor: 'grey.200',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            textAlign: 'center',
          }}
        >
          <Box sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: 'primary.50',
            mb: 1.5,
          }}>
            <AutoAwesomeIcon sx={{ color: 'primary.main', fontSize: 24 }} />
          </Box>
          <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary', lineHeight: 1.6 }}>
            The more people who connect their calendars, the faster scheduling becomes. Invite your colleagues, clients, and regular contacts.
          </Typography>
        </Box>

        {/* Main Card */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 4 }}>
            {invitationsSent ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <AutoAwesomeIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  Invitations Sent!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  We've sent invites to {invitedPeople.length} {invitedPeople.length === 1 ? 'person' : 'people'}
                </Typography>
              </Box>
            ) : (
              <>
                {/* Add Individual */}
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Add People
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Enter email address"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddEmail();
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleAddEmail}
                    startIcon={<PersonAddIcon />}
                    sx={{ textTransform: 'none', minWidth: 100 }}
                  >
                    Add
                  </Button>
                </Stack>

                <Divider sx={{ my: 3 }} />

                {/* Bulk Actions */}
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 2, color: 'text.secondary' }}>
                  Or add multiple at once:
                </Typography>

                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                  <Button
                    variant="outlined"
                    startIcon={<ContentPasteIcon />}
                    onClick={() => setShowBulkInput(!showBulkInput)}
                    sx={{ textTransform: 'none', flex: 1 }}
                  >
                    Paste Emails
                  </Button>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<UploadFileIcon />}
                    sx={{ textTransform: 'none', flex: 1 }}
                  >
                    Upload CSV
                    <input
                      type="file"
                      hidden
                      accept=".csv"
                      onChange={handleCSVUpload}
                    />
                  </Button>
                </Stack>

                {/* Bulk Text Input */}
                {showBulkInput && (
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Paste emails separated by commas, semicolons, or new lines&#10;&#10;Example:&#10;john@company.com, sarah@company.com&#10;mike@external.com"
                      value={bulkInput}
                      onChange={(e) => setBulkInput(e.target.value)}
                      sx={{ mb: 1 }}
                    />
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Button
                        size="small"
                        onClick={() => {
                          setBulkInput('');
                          setShowBulkInput(false);
                        }}
                        sx={{ textTransform: 'none' }}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={handleParseBulk}
                        disabled={!bulkInput.trim()}
                        sx={{ textTransform: 'none' }}
                      >
                        Parse & Add
                      </Button>
                    </Stack>
                  </Box>
                )}

                {/* Invited People List */}
                {invitedPeople.length > 0 && (
                  <>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
                      Ready to invite ({invitedPeople.length})
                    </Typography>
                    <Box sx={{ maxHeight: 200, overflow: 'auto', mb: 2 }}>
                      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                        {invitedPeople.map((person) => (
                          <Chip
                            key={person.email}
                            label={person.email}
                            onDelete={() => handleRemoveEmail(person.email)}
                            deleteIcon={<CloseIcon />}
                            sx={{ mb: 1 }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  </>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        {!invitationsSent && (
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleSkip}
              sx={{ textTransform: 'none', py: 1.5 }}
            >
              Skip for now
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSendInvites}
              disabled={invitedPeople.length === 0}
              sx={{ textTransform: 'none', py: 1.5 }}
            >
              Send Invites ({invitedPeople.length})
            </Button>
          </Stack>
        )}
      </Box>
    </Box>
  );
}
