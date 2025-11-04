'use client';

import { Box, Button, Typography, TextField, Link } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const textFieldStyle = {};

export default function SignupPage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Right side - Email Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <Box sx={{ maxWidth: 320, width: '100%' }}>
          <Typography variant="h2" component="h1" sx={{ mb: 1, textAlign: 'center' }}>
            timesēkr
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
            Create your account
          </Typography>

          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="First Name"
              variant="outlined"
              sx={textFieldStyle}
            />
            <TextField
              fullWidth
              size="small"
              label="Last Name"
              variant="outlined"
              sx={textFieldStyle}
            />
            <TextField
              fullWidth
              size="small"
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={textFieldStyle}
            />
            <TextField
              fullWidth
              size="small"
              label="Phone"
              type="tel"
              variant="outlined"
              sx={textFieldStyle}
            />
            <TextField
              fullWidth
              size="small"
              label="Password"
              type="password"
              variant="outlined"
              sx={textFieldStyle}
            />

            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{ textTransform: 'none', mt: 1 }}
            >
              Create Account
            </Button>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
            Already have an account?{' '}
            <Link href="/" underline="hover">
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
