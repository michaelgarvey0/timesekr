'use client'
import { Box, Button, FilledInput, FormLabel, Link, Stack, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import * as React from 'react';
import { Logo } from '~/components/Logo';

export function AuthMagicLink() {
  const [email, setEmail] = React.useState('');
  const handleLogin = async (email: string | null) => {
    // add login logic here
    console.log(email);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 1,
        }}
      >
        <Logo height={20} />
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2xl', sm: '3xl' },
          }}
        >
          Welcome back to UI Kit
        </Typography>
        <Typography>
          Sign in, or{' '}
          <Link
            href={undefined}
            sx={{
              textDecoration: 'none',
            }}
          >
            create an account
          </Link>
        </Typography>
      </Box>
      <Stack
        spacing={2.5}
        component="form"
        onSubmit={(event: React.SyntheticEvent) => {
          event.preventDefault();
          const formData = new FormData(event.target as HTMLFormElement);
          const email = formData.get('email') as string;
          handleLogin(email);
        }}
        sx={{
          maxWidth: '24rem',
          width: '100%',
        }}
      >
        <FormLabel sx={visuallyHidden}>Email</FormLabel>
        <FilledInput
          placeholder="Your email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <Button variant="contained" size="large" type="submit">
          Send magic link
        </Button>
        <Link
          href={undefined}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            color: 'gray.400',
            fontSize: 'xs',
          }}
        >
          Return to home
        </Link>
      </Stack>
    </Box>
  );
}
