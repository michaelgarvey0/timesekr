'use client'
import {
  Box,
  Button,
  Checkbox,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { TbEye, TbEyeOff, TbLock } from 'react-icons/tb';
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
export default function AuthDual() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordVisibility, setPasswordVisibility] = React.useState(false);
  const handleLogin = async (email: string | null) => {
    // add login logic here
    console.log(email);
  };
  return (
    <Box
      sx={{
        flex: 1,
        height: '100%',
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: '1fr 1fr',
        },
        alignItems: 'center',
        gap: 2,
        width: '100%',
      }}
    >
      <Box
        sx={{
          paddingX: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-start' },
          gap: 2,
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: {
              xs: 'center',
              md: 'left',
            },
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: {
              xs: 'center',
              md: 'flex-start',
            },
            height: 'max-content',
            maxWidth: '420px',
            width: '100%',
            gap: 3,
          }}
        >
          <Stack
            spacing={2}
            component='form'
            onSubmit={(event: React.SyntheticEvent) => {
              event.preventDefault();
              const formData = new FormData(event.target as HTMLFormElement);
              const email = formData.get('email') as string;
              handleLogin(email);
            }}
            sx={{
              maxWidth: '24rem',
              width: '100%',
              mb: 0,
            }}
          >
            <FormControl>
              <FormLabel>Email</FormLabel>
              <FilledInput
                type='email'
                name='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete='email'
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <FilledInput
                type='password'
                name='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete='password'
                endAdornment={
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={() => setPasswordVisibility(!passwordVisibility)}
                    edge='end'
                  >
                    {passwordVisibility ? <TbEye /> : <TbEyeOff />}
                  </IconButton>
                }
              />
            </FormControl>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 'sm',
                flexWrap: 'wrap',
              }}
            >
              <FormControlLabel
                sx={{
                  '.MuiFormControlLabel-label': {
                    fontSize: 'sm',
                  },
                }}
                control={<Checkbox defaultChecked />}
                label='Remember me?'
              />
              <Box
                component='a'
                href={undefined}
                sx={{
                  color: 'primary.600',
                  cursor: 'pointer',
                }}
              >
                Forgot password?
              </Box>
            </Box>
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
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 6,
          height: '100%',
          width: '100%',
          backgroundColor: 'gray.100',
          borderLeft: theme => `1px solid ${theme.palette.gray['200']}`,
        }}
      >
        <Box
          sx={{
            color: 'gray.600',
            maxWidth: '24ch',
            fontSize: 'xl',
          }}
        >
          <Box
            sx={{
              fontSize: '64px',
              lineHeight: 1,
              fontFamily: 'cursive',
              fontWeight: 600,
            }}
          >{`"`}</Box>
          {`This is the best UI Kit money can buy. Hands down.`}
          <Box sx={{ mt: 2, fontWeight: 600, fontSize: 'lg' }}>
            - A Real User
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
