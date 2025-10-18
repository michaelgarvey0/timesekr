import {
  Box,
  Button,
  Divider,
  FilledInput,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Stack,
  Switch,
} from '@mui/material';
import * as React from 'react';
import { TbEye, TbEyeOff } from 'react-icons/tb';
import { toast } from 'sonner';
import { DashboardHeader } from '~/components/DashboardHeader';
import { PageContainer } from '~/components/PageContainer';
import { TitleDescriptionBlock } from '~/components/TitleDescriptionBlock';

export function Account() {
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [currentPasswordVisibility, setCurrentPasswordVisibility] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState('');
  const [newPasswordVisibility, setNewPasswordVisibility] = React.useState(false);
  const passwordsMatch = currentPassword === newPassword;

  return (
    <PageContainer>
      <DashboardHeader
        title="Profile"
        subtitle="Manage your account details, notifications, and authentication settings."
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Stack component="form" action="#" method="POST" spacing={2}>
          <TitleDescriptionBlock
            title="Email"
            description="Update your email address associated with with your account. You will
              be sent a new email for verification."
          />
          <Box>
            <FormControl
              sx={{
                minWidth: { xs: 250, sm: 350 },
              }}
            >
              <FormLabel>Update email address</FormLabel>
              <FilledInput name="update-email" placeholder="ally.allen@example.com" />
            </FormControl>
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              borderRadius: 1,
              py: 1.25,
              px: 2,
              textTransform: 'none',
              boxShadow: 2,
              width: 'fit-content',
            }}
            color="primary"
          >
            Re-verify new email
          </Button>
        </Stack>
        <Divider />
        <form action="#" method="POST">
          <TitleDescriptionBlock
            title="Password"
            description="Change your password used for login with this account."
          />
          <Box sx={{ mt: 3 }}>
            <FormControl sx={{ minWidth: { xs: 250, sm: 350 } }}>
              <FormLabel>Current password</FormLabel>
              <FilledInput
                type={currentPasswordVisibility ? 'text' : 'password'}
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="password"
                endAdornment={
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setCurrentPasswordVisibility(!currentPasswordVisibility)}
                    edge="end"
                  >
                    {currentPasswordVisibility ? <TbEye /> : <TbEyeOff />}
                  </IconButton>
                }
              />
            </FormControl>
          </Box>
          <Box sx={{ mt: 2 }}>
            <FormControl sx={{ minWidth: { xs: 250, sm: 350 } }}>
              <FormLabel>New password</FormLabel>
              <FilledInput
                type={newPasswordVisibility ? 'text' : 'password'}
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="password"
                endAdornment={
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setNewPasswordVisibility(!newPasswordVisibility)}
                    edge="end"
                  >
                    {newPasswordVisibility ? <TbEye /> : <TbEyeOff />}
                  </IconButton>
                }
              />
              <FormHelperText sx={{ color: 'red.700' }}>
                {passwordsMatch ? '' : 'Passwords must match'}
              </FormHelperText>
            </FormControl>
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              borderRadius: 1,
              py: 1.25,
              px: 2,
              textTransform: 'none',
              boxShadow: 2,
            }}
            color="primary"
          >
            Save new password
          </Button>
        </form>
        <Divider />
        <TitleDescriptionBlock
          title="Notifications"
          description="Manage the content you get sent to your inbox."
        />
        <Stack spacing={2}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Weekly release log</FormLabel>
            <Switch
              defaultChecked
              onChange={(event) => {
                toast.success(
                  event.target.checked
                    ? 'You will now receive weekly release logs'
                    : 'You will no longer receive weekly release logs',
                );
              }}
            />
          </FormControl>
        </Stack>
        <Divider />
        <Box
          sx={{
            padding: 2,
            borderRadius: 1,
            border: (theme) => `1px solid ${theme.palette.red['300']}`,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TitleDescriptionBlock
            title="Danger Zone"
            description="Permanent modifications to your account that cannot be reversed."
          />
          <Box
            sx={{
              backgroundColor: 'red.50',
              border: (theme) => `1px solid ${theme.palette.red['200']}`,
              borderRadius: 0.5,
              padding: 1.5,
            }}
          >
            <Stack>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    color: 'red.700',
                  }}
                >
                  Delete your account and all associated data
                </Box>
                <Button variant="contained" color="error">
                  Delete your account
                </Button>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </PageContainer>
  );
}
