'use client';

import { Box, Typography, Button, AppBar, Toolbar, IconButton, Menu, MenuItem, Card, CardContent, Alert } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NoCalendarHomePage() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSettings = () => {
    handleMenuClose();
    // Navigate to settings
  };

  const handleLogout = () => {
    handleMenuClose();
    router.push('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafbfc' }}>
      {/* Top Navigation */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'grey.200' }}>
        <Toolbar sx={{ py: 1 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Image
              src="/images/logomark.svg"
              alt="timesēkr"
              width={120}
              height={32}
              priority
            />
          </Box>
          <IconButton
            onClick={handleMenuOpen}
            sx={{
              bgcolor: 'grey.100',
              '&:hover': {
                bgcolor: 'grey.200',
              }
            }}
          >
            <AccountCircleIcon sx={{ color: 'primary.main' }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleSettings}>
              <SettingsIcon sx={{ mr: 1.5, fontSize: 20 }} />
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 4 }}>
        {/* Calendar Connection Banner */}
        <Alert
          severity="warning"
          icon={<WarningAmberIcon />}
          sx={{ mb: 3, borderRadius: 2 }}
          action={
            <Button
              color="inherit"
              size="small"
              variant="outlined"
              sx={{ textTransform: 'none' }}
            >
              Connect Now
            </Button>
          }
        >
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
            Connect your calendar to get started
          </Typography>
          <Typography variant="caption">
            timesēkr needs access to your calendar to find available times and schedule meetings automatically
          </Typography>
        </Alert>

        {/* Getting Started Card */}
        <Card sx={{ mb: 3, border: '1px solid #e5e7eb' }}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <CalendarTodayIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              Connect Your Calendar
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
              To use timesēkr, you'll need to connect at least one calendar. This allows us to:
            </Typography>
            <Box sx={{ textAlign: 'left', maxWidth: 400, mx: 'auto', mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                ✓ Find times when you're actually available
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                ✓ Automatically add confirmed meetings to your calendar
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                ✓ Prevent double-booking
              </Typography>
              <Typography variant="body2">
                ✓ See all your meetings in one place
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              startIcon={<CalendarTodayIcon />}
              sx={{ textTransform: 'none', px: 4 }}
            >
              Connect Google Calendar
            </Button>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                size="large"
                startIcon={<CalendarTodayIcon />}
                sx={{ textTransform: 'none', px: 4 }}
              >
                Connect Microsoft Calendar
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Limited Functionality Card */}
        <Card sx={{ border: '1px solid #e5e7eb', bgcolor: '#f8fafc' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
              What you can do without a calendar:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
                <AddIcon sx={{ color: 'primary.main', mt: 0.5 }} />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Create meeting requests
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    You can still send meeting requests, but you'll need to manually enter available times
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
                <AddIcon sx={{ color: 'primary.main', mt: 0.5 }} />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Respond to invites
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Select times that work for you from meeting invites you receive
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Quick Action - Create Meeting Anyway */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="text"
            onClick={() => router.push('/meeting/new')}
            sx={{ textTransform: 'none' }}
          >
            Skip for now and create a meeting manually
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
