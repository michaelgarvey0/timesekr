'use client';

import { Box, Button, Stack, Typography, TextField } from '@mui/material';
import { useState, useRef, KeyboardEvent, ChangeEvent } from 'react';

interface VerificationFormProps {
  email: string;
  onVerify: () => void;
  onResend: () => void;
}

export default function VerificationForm({ email, onVerify, onResend }: VerificationFormProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) {
      value = value.slice(-1);
    }

    // Only allow numbers
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const digits = pastedData.split('').filter(char => /^\d$/.test(char));

    const newCode = [...code];
    digits.forEach((digit, i) => {
      if (i < 6) {
        newCode[i] = digit;
      }
    });
    setCode(newCode);

    // Focus the next empty input or the last one
    const nextEmptyIndex = newCode.findIndex(val => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  return (
    <Stack spacing={3}>
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
        We sent a verification code to {email}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
        {code.map((digit, index) => (
          <TextField
            key={index}
            inputRef={(el) => (inputRefs.current[index] = el)}
            value={digit}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            inputProps={{
              maxLength: 1,
              style: {
                textAlign: 'center',
                fontSize: '1.5rem',
                padding: '12px',
              }
            }}
            sx={{
              width: '48px',
              '& .MuiOutlinedInput-root': {
                height: '56px',
              }
            }}
          />
        ))}
      </Box>

      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{ textTransform: 'none' }}
        onClick={onVerify}
        disabled={code.some(digit => !digit)}
      >
        Verify email
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
