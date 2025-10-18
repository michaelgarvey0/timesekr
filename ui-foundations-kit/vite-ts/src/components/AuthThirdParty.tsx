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
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { TbEye, TbEyeOff, TbLock } from 'react-icons/tb';
import { Logo } from '~/components/Logo';

// auth form with 3rd party integrations included
export function AuthThirdParty() {
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
        <Logo height={20} />
        <Typography
          variant="h1"
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
            mb: 0,
          }}
        >
          <FormControl>
            <FormLabel>Email</FormLabel>
            <FilledInput
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <FilledInput
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="password"
              endAdornment={
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setPasswordVisibility(!passwordVisibility)}
                  edge="end"
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
              label="Remember me?"
            />
            <Box
              component="a"
              href={undefined}
              sx={{
                color: 'primary.600',
                cursor: 'pointer',
              }}
            >
              Forgot password?
            </Box>
          </Box>
          <Button variant="contained" size="large" type="submit" startIcon={<TbLock />}>
            Sign in
          </Button>
          <Box
            role="separator"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'gray.400',
              fontSize: 'sm',
              width: '100%',
              '&::before': {
                content: '""',
                flex: 1,
                height: '1px',
                backgroundColor: 'gray.300',
                marginRight: 2,
              },
              '&::after': {
                content: '""',
                flex: 1,
                height: '1px',
                backgroundColor: 'gray.300',
                marginLeft: 2,
              },
            }}
          >
            Continue with
          </Box>
          <Button startIcon={<FaGoogle />} variant="outlined">
            Sign in with Google
          </Button>
          <Button startIcon={<FaGithub />} variant="outlined">
            Sign in with GitHub
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
