'use client';

import { Box, Modal, Typography, Button, TextField, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

interface GoogleSSOModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function GoogleSSOModal({ open, onClose, onSuccess }: GoogleSSOModalProps) {
  const handleSignIn = () => {
    // Simulate a brief loading delay
    setTimeout(() => {
      onSuccess();
    }, 500);
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
          width: 450,
          bgcolor: 'white',
          borderRadius: '8px',
          boxShadow: 24,
          outline: 'none',
        }}
      >
        {/* Header */}
        <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid', borderColor: 'grey.200' }}>
          <GoogleIcon sx={{ fontSize: 40, color: '#4285f4', mb: 1.5 }} />
          <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>
            Sign in with Google
          </Typography>
          <Typography variant="body2" color="text.secondary">
            We'll access your calendar and contacts
          </Typography>
        </Box>

        {/* Body */}
        <Box sx={{ p: 4 }}>
          <TextField
            fullWidth
            placeholder="Email or phone"
            variant="outlined"
            size="medium"
            defaultValue="john.doe@gmail.com"
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleSignIn}
            sx={{
              textTransform: 'none',
              py: 1.5,
              fontSize: '0.95rem',
              fontWeight: 500,
              bgcolor: '#1a73e8',
              '&:hover': {
                bgcolor: '#1765cc',
              }
            }}
          >
            Continue
          </Button>

          <Divider sx={{ my: 3 }}>
            <Typography variant="caption" color="text.secondary">
              OR
            </Typography>
          </Divider>

          <Button
            variant="outlined"
            fullWidth
            sx={{
              textTransform: 'none',
              py: 1.5,
              fontSize: '0.95rem',
              fontWeight: 500,
              color: 'text.primary',
              borderColor: 'grey.300',
            }}
          >
            Create account
          </Button>
        </Box>

        {/* Footer */}
        <Box sx={{ px: 3, py: 2, bgcolor: 'grey.50', borderTop: '1px solid', borderColor: 'grey.200' }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
            To continue, Google will share your name, email, calendar data, and contacts with timesēkr.
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}
