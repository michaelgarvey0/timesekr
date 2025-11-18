'use client';

import { Box, Button, Stack, Divider, TextField, SvgIcon } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

// Microsoft icon component
function MicrosoftIcon(props: any) {
  return (
    <SvgIcon {...props} viewBox="0 0 21 21">
      <rect x="1" y="1" width="9" height="9" fill="currentColor"/>
      <rect x="1" y="11" width="9" height="9" fill="currentColor"/>
      <rect x="11" y="1" width="9" height="9" fill="currentColor"/>
      <rect x="11" y="11" width="9" height="9" fill="currentColor"/>
    </SvgIcon>
  );
}

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

      <Button
        variant="outlined"
        size="large"
        startIcon={<MicrosoftIcon />}
        fullWidth
        sx={{ textTransform: 'none' }}
      >
        Continue with Microsoft
      </Button>

      <Divider>or</Divider>

      <TextField
        fullWidth
        size="small"
        placeholder="Enter your email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button
        variant="contained"
        size="large"
        fullWidth
        disabled={!email}
        sx={{ textTransform: 'none' }}
        onClick={onContinue}
      >
        Continue with email
      </Button>
    </Stack>
  );
}
