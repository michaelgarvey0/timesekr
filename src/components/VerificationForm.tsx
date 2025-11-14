'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import VerificationCodeInput from './VerificationCodeInput';

interface VerificationFormProps {
  email: string;
  onVerify: () => void;
  onResend: () => void;
}

export default function VerificationForm({ email, onVerify, onResend }: VerificationFormProps) {
  return (
    <Stack spacing={3}>
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
        We sent a verification code to {email}
      </Typography>

      <VerificationCodeInput />

      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{ textTransform: 'none' }}
        onClick={onVerify}
      >
        Verify Email
      </Button>

      <Button
        variant="text"
        fullWidth
        sx={{ textTransform: 'none' }}
        onClick={onResend}
      >
        Resend code
      </Button>
    </Stack>
  );
}
