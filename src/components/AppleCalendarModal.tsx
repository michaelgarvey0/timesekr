'use client';

import { Box, Modal, Typography, Button, CircularProgress } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState, useEffect } from 'react';

interface AppleCalendarModalProps {
  open: boolean;
  onClose: () => void;
  onFakeConnect?: () => void;
}

export default function AppleCalendarModal({ open, onClose, onFakeConnect }: AppleCalendarModalProps) {
  const deepLink = 'https://timesekr.app/connect/apple/abc123';
  const [isConnected, setIsConnected] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setIsConnected(false);
    }
  }, [open]);

  const handleFakeConnect = () => {
    // Simulate webhook detecting connection
    setIsConnected(true);

    // After showing success, close modal and update parent
    setTimeout(() => {
      if (onFakeConnect) {
        onFakeConnect();
      }
      onClose();
    }, 2000);
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
          bgcolor: 'white',
          borderRadius: '12px',
          boxShadow: 24,
          outline: 'none',
        }}
      >
        {isConnected ? (
          // Success state
          <Box sx={{ p: 6, textAlign: 'center' }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'success.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                animation: 'scaleIn 0.3s ease-out',
                '@keyframes scaleIn': {
                  '0%': { transform: 'scale(0)' },
                  '100%': { transform: 'scale(1)' },
                },
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 48, color: 'white' }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
              Connected! 🎉
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Your Apple calendar and contacts have been successfully connected
            </Typography>
          </Box>
        ) : (
          <>
            {/* Header */}
            <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid', borderColor: 'grey.200' }}>
              <AppleIcon sx={{ fontSize: 48, color: 'text.primary', mb: 1.5 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                Connect Apple Calendar & Contacts
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Use your iPhone to connect
              </Typography>
            </Box>

            {/* Body */}
            <Box sx={{ p: 4 }}>
          {/* QR Code placeholder */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 200,
                height: 200,
                bgcolor: 'grey.100',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid',
                borderColor: 'grey.300',
              }}
            >
              <QrCode2Icon sx={{ fontSize: 120, color: 'text.secondary' }} />
            </Box>
          </Box>

          {/* Steps */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'flex-start' }}>
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  flexShrink: 0,
                }}
              >
                1
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.25 }}>
                  Scan the QR code with your iPhone
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                  Open your Camera app and point it at the code
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'flex-start' }}>
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  flexShrink: 0,
                }}
              >
                2
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.25 }}>
                  Download the timesēkr app
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                  You'll be taken to the App Store if you don't have it yet
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  flexShrink: 0,
                }}
              >
                3
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.25 }}>
                  Grant calendar and contacts access
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                  The app will prompt you to connect both automatically
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Divider with "OR" */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 3 }}>
            <Box sx={{ flex: 1, height: '1px', bgcolor: 'grey.300' }} />
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
              OR
            </Typography>
            <Box sx={{ flex: 1, height: '1px', bgcolor: 'grey.300' }} />
          </Box>

          {/* Link option */}
          <Button
            variant="outlined"
            fullWidth
            startIcon={<PhoneIphoneIcon />}
            sx={{
              textTransform: 'none',
              py: 1.5,
              fontSize: '0.95rem',
              fontWeight: 500,
              borderColor: 'grey.300',
            }}
            onClick={() => {
              // In real implementation, this would open the deep link
              window.open(deepLink, '_blank');
            }}
          >
            Open on iPhone
          </Button>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: 'block',
              textAlign: 'center',
              mt: 1.5,
              fontSize: '0.75rem',
            }}
          >
            Make sure you're viewing this on your iPhone
          </Typography>
        </Box>

            {/* Footer */}
            <Box sx={{ px: 3, py: 2.5, borderTop: '1px solid', borderColor: 'grey.200', display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="text"
                onClick={onClose}
                sx={{
                  textTransform: 'none',
                  color: 'text.secondary',
                  fontWeight: 500,
                }}
              >
                Close
              </Button>
              {onFakeConnect && (
                <Button
                  variant="contained"
                  onClick={handleFakeConnect}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    bgcolor: 'success.main',
                    '&:hover': {
                      bgcolor: 'success.dark',
                    }
                  }}
                >
                  [Fake] Simulate Connection
                </Button>
              )}
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}
