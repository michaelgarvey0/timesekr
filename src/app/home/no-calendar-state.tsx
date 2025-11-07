'use client';

import { Box, Typography, Button, AppBar, Toolbar, IconButton, Menu, MenuItem, Card, CardContent, Chip, Stack, Divider } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
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
        {/* Calendar Connection Encouragement Banner */}
        <Card sx={{ mb: 3, border: '2px solid', borderColor: 'primary.main', bgcolor: '#f0f9ff' }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'start' }}>
              <AutoAwesomeIcon sx={{ fontSize: 40, color: 'primary.main', mt: 0.5 }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                  Connect your calendar for the full experience
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  You can respond to meeting requests now, but connecting your calendar lets us automatically find times when you're free and add confirmed meetings to your schedule.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    size="medium"
                    startIcon={<CalendarTodayIcon />}
                    sx={{ textTransform: 'none' }}
                  >
                    Connect Google Calendar
                  </Button>
                  <Button
                    variant="outlined"
                    size="medium"
                    startIcon={<CalendarTodayIcon />}
                    sx={{ textTransform: 'none' }}
                  >
                    Connect Microsoft
                  </Button>
                </Stack>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Pending Meeting Request */}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Pending Requests
        </Typography>

        <Card sx={{ mb: 3, border: '1px solid #e5e7eb', cursor: 'pointer', transition: 'all 0.2s', '&:hover': { borderColor: 'primary.main', boxShadow: 2 } }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <EventIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Q1 Planning Session
                  </Typography>
                  <Chip label="Action Needed" color="error" size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  from Sarah Chen
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                2 hours ago
              </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTimeIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  60 minutes • 3 time options
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <GroupsIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  5 attendees
                </Typography>
              </Box>

              <Box sx={{ bgcolor: '#f8fafc', p: 2, borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block', mb: 1 }}>
                  PROPOSED TIMES:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  • Wed, Jan 15 at 10:00 AM
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  • Thu, Jan 16 at 2:00 PM
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  • Fri, Jan 17 at 1:00 PM
                </Typography>
              </Box>
            </Stack>

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                fullWidth
                sx={{ textTransform: 'none' }}
              >
                Respond to Request
              </Button>
              <Button
                variant="outlined"
                sx={{ textTransform: 'none', minWidth: 100 }}
              >
                Decline
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Empty State for Other Sections */}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, mt: 4 }}>
          Your Meetings
        </Typography>
        <Card sx={{ border: '1px solid #e5e7eb', bgcolor: '#fafbfc' }}>
          <CardContent sx={{ p: 5, textAlign: 'center' }}>
            <CalendarTodayIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              No confirmed meetings yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Once you respond to meeting requests, confirmed meetings will appear here
            </Typography>
            <Button
              variant="outlined"
              onClick={() => router.push('/meeting/new')}
              sx={{ textTransform: 'none' }}
            >
              Schedule a Meeting
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
