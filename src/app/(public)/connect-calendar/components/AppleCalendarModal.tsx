'use client';

import { Box, Typography, Button, Stack } from '@mui/material';
import Modal from '@/components/Modal';
import { border } from '@/theme/tokens';

interface AppleCalendarModalProps {
  open: boolean;
  onClose: () => void;
  providerIcon: string;
}

export default function AppleCalendarModal({
  open,
  onClose,
  providerIcon,
}: AppleCalendarModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      customMaxWidth={700}
      actions={
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Box>
      }
    >
      {/* Header Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
        <img
          src={providerIcon}
          alt="Apple Calendar"
          style={{
            width: '72px',
            height: '72px',
            objectFit: 'contain',
            marginBottom: '16px'
          }}
        />
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, textAlign: 'center' }}>
          Connect Apple Calendar
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          Use your iPhone to connect your calendars
        </Typography>
      </Box>

      {/* QR Code Section */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Box
          sx={{
            width: 200,
            height: 200,
            bgcolor: 'grey.100',
            borderRadius: `${border.radius.md}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid',
            borderColor: 'grey.300',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            QR Code
          </Typography>
        </Box>
      </Box>

      {/* Two Column Layout */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
        {/* Left Column - iPhone Mockup */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box
            sx={{
              width: 200,
              height: 400,
              bgcolor: 'grey.100',
              borderRadius: `${border.radius.lg}px`,
              border: '1px solid',
              borderColor: 'grey.300',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              iPhone Mockup
            </Typography>
          </Box>
        </Box>

        {/* Right Column - Steps */}
        <Stack spacing={3}>
          {/* Step 1 */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                flexShrink: 0,
              }}
            >
              1
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                Scan the QR code with your iPhone
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Open your iPhone camera and point it at the QR code above to get started.
              </Typography>
            </Box>
          </Box>

          {/* Step 2 */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                flexShrink: 0,
              }}
            >
              2
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                Download the Timesekr app
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Follow the link to download the Timesekr app from the App Store.
              </Typography>
            </Box>
          </Box>

          {/* Step 3 */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                flexShrink: 0,
              }}
            >
              3
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                Grant calendar access
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Allow the app to access your calendars when prompted to complete the connection.
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
}
