'use client';

import { Box, Button, Stack, Divider, TextField } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  onContinue: () => void;
}

export default function LoginForm({ email, setEmail, onContinue }: LoginFormProps) {
  return (
    <Stack spacing={2}>
      <Button
        variant="outlined"
        size="large"
        startIcon={<GoogleIcon />}
        fullWidth
        sx={{ textTransform: 'none' }}
      >
        Continue with Google
      </Button>

      <Button
        variant="outlined"
        size="large"
        startIcon={<AppleIcon />}
        fullWidth
        sx={{ textTransform: 'none' }}
      >
        Continue with Apple
      </Button>

      <Divider>or</Divider>

      <TextField
        fullWidth
        size="small"
        placeholder="Enter your email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            height: '42px',
          },
        }}
      />

      <Button
        variant="contained"
        size="large"
        fullWidth
        disabled={!email}
        sx={{ textTransform: 'none' }}
        onClick={onContinue}
      >
        Continue with Email
      </Button>
    </Stack>
  );
}
