'use client';

import { Box, Typography, Button, Grid, AppBar, Toolbar, IconButton, Menu, MenuItem } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import ContactsIcon from '@mui/icons-material/Contacts';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EmptyHomePage() {
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
      <Box sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: 4, py: 5 }}>
        {/* Hero Section */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h3" sx={{ mb: 1.5, fontWeight: 700 }}>
            Welcome to timesēkr, John 👋
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
            Let's get you started with scheduling meetings
          </Typography>
        </Box>

        {/* Empty State - Primary Action */}
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: '12px',
            p: 6,
            textAlign: 'center',
            mb: 4,
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: 'primary.50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
            }}
          >
            <EventIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1.5 }}>
            No meetings yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
            Create your first meeting request to find the perfect time with your team
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<EventIcon />}
            onClick={() => router.push('/meeting/new')}
            sx={{ textTransform: 'none', px: 4, py: 1.5 }}
          >
            Schedule Your First Meeting
          </Button>
        </Box>

        {/* Getting Started Cards */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Get Started
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  bgcolor: 'white',
                  borderRadius: '12px',
                  p: 3,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    bgcolor: 'primary.50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <CalendarTodayIcon sx={{ fontSize: 24, color: 'primary.main' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Connect Calendars
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Link your Google, Apple, or Microsoft calendar to check availability
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  bgcolor: 'white',
                  borderRadius: '12px',
                  p: 3,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    bgcolor: 'success.50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <GroupAddIcon sx={{ fontSize: 24, color: 'success.main' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Add Contacts
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Import your contacts to easily invite people to meetings
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  bgcolor: 'white',
                  borderRadius: '12px',
                  p: 3,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    bgcolor: 'warning.50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <AccessTimeIcon sx={{ fontSize: 24, color: 'warning.main' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Set Availability
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Define your meeting preferences and available hours
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
