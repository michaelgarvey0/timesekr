import {
  Box,
  Button,
  FilledInput,
  FormControl,
  FormLabel,
  Stack,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { TbLock } from 'react-icons/tb';
const Logo = () => (
  <Box
    sx={{
      fontSize: '2xl',
      fontWeight: 800,
      color: 'gray.700',
    }}
  >
    ❍
  </Box>
);
export default function AuthForgot() {
  const [email, setEmail] = React.useState('');
  const handleReset = async (email: string | null) => {
    // add reset password logic here
    console.log(email);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        width: '100%',
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
        <Logo />
        <Typography
          variant='h1'
          sx={{
            fontSize: { xs: '2xl', sm: '3xl' },
            lineHeight: 1.25,
          }}
        >
          Forgot your Password?
        </Typography>
        <Typography
          sx={{
            maxWidth: '36ch',
          }}
        >
          Enter your email address, and {`we'll`} email you a link to reset your
          password.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'max-content',
          borderRadius: 2,
          borderStyle: 'solid',
          borderWidth: 1,
          maxWidth: '420px',
          width: '100%',
          gap: 3,
          p: { xs: 0, sm: 4 },
          borderColor: { xs: 'transparent', sm: 'gray.200' },
          boxShadow: { xs: 0, sm: 1 },
          bgcolor: { xs: 'none', sm: 'background.paper' },
        }}
      >
        <Stack
          spacing={2}
          component='form'
          onSubmit={(event: React.SyntheticEvent) => {
            event.preventDefault();
            const formData = new FormData(event.target as HTMLFormElement);
            const email = formData.get('email') as string;
            handleReset(email);
          }}
          sx={{
            maxWidth: '24rem',
            width: '100%',
            mb: 0,
          }}
        >
          <FormControl>
            <FormLabel>Email Address</FormLabel>
            <FilledInput
              type='email'
              name='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete='email'
            />
          </FormControl>
          <Button
            variant='contained'
            size='large'
            type='submit'
            startIcon={<TbLock />}
          >
            Sign in
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
