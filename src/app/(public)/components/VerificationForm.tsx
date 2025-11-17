'use client';

import { Box, Button, Stack, Typography, TextField } from '@mui/material';
import { useState } from 'react';

interface VerificationFormProps {
  email: string;
  onVerify: () => void;
  onResend: () => void;
}

export default function VerificationForm({ email, onVerify, onResend }: VerificationFormProps) {
  const [code, setCode] = useState('');

  return (
    <Stack spacing={3}>
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
        We sent a verification code to {email}
      </Typography>

      <TextField
        fullWidth
        size="small"
        label="Verification Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter 6-digit code"
        inputProps={{
          maxLength: 6,
          style: { textAlign: 'center', letterSpacing: '0.5em', fontSize: '1.5rem' }
        }}
      />

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
