'use client';

import { Box, Button, Stack, TextField } from '@mui/material';

interface SignupFormProps {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  onCreateAccount: () => void;
}

const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    height: '42px',
  },
};

export default function SignupForm({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phone,
  setPhone,
  password,
  setPassword,
  onCreateAccount,
}: SignupFormProps) {
  return (
    <Stack spacing={2}>
      <TextField
        fullWidth
        size="small"
        label="First Name"
        variant="outlined"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        sx={textFieldStyle}
      />
      <TextField
        fullWidth
        size="small"
        label="Last Name"
        variant="outlined"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        sx={textFieldStyle}
      />
      <TextField
        fullWidth
        size="small"
        label="Phone"
        type="tel"
        variant="outlined"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        sx={textFieldStyle}
      />
      <TextField
        fullWidth
        size="small"
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={textFieldStyle}
      />

      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{ textTransform: 'none', mt: 1 }}
        onClick={onCreateAccount}
      >
        Create Account
      </Button>
    </Stack>
  );
}
