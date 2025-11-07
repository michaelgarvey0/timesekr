'use client';

import { Box, Typography, Button, AppBar, Toolbar, IconButton, Menu, MenuItem, Card, CardContent, Chip, Stack, Divider, Tabs, Tab, Grid, Checkbox } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShareIcon from '@mui/icons-material/Share';
import ReplyIcon from '@mui/icons-material/Reply';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NoCalendarHomePage() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedTimes, setSelectedTimes] = useState<number[]>([]);

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

  const toggleTime = (timeId: number) => {
    if (selectedTimes.includes(timeId)) {
      setSelectedTimes(selectedTimes.filter(id => id !== timeId));
    } else {
      setSelectedTimes([...selectedTimes, timeId]);
    }
  };

  const timeOptions = [
    { id: 1, day: 'Wed, Jan 15', time: '10:00 AM' },
    { id: 2, day: 'Thu, Jan 16', time: '2:00 PM' },
    { id: 3, day: 'Fri, Jan 17', time: '1:00 PM' },
  ];

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
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 3 }}>
        {/* Calendar Connection Encouragement Banner */}
        <Card sx={{ mb: 3, border: '2px solid', borderColor: 'primary.main', bgcolor: '#f0f9ff' }}>
          <CardContent sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <AutoAwesomeIcon sx={{ fontSize: 32, color: 'primary.main' }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.25 }}>
                  Connect your calendar for the full experience
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Auto-find available times and add confirmed meetings to your schedule
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<CalendarTodayIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  Connect Calendar
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)}>
            <Tab label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Typography>Action Items</Typography><Chip label="1" size="small" color="error" /></Box>} />
            <Tab label="Organizing" />
            <Tab label="Invited" />
            <Tab label="Upcoming" />
          </Tabs>
        </Box>

        {/* Action Items Tab */}
        {currentTab === 0 && (
          <Box>
            {/* Compact Meeting Request Card */}
            <Card sx={{ mb: 2, border: '1px solid #e5e7eb' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'start', mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Chip
                      icon={<ReplyIcon />}
                      label="Respond Now"
                      size="small"
                      sx={{ mb: 1.5, fontWeight: 600 }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Q1 Planning Session
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Sarah Chen • 5 attendees • 60 min • Due in 2 hours
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block', mb: 1.5 }}>
                  SELECT TIMES THAT WORK FOR YOU:
                </Typography>

                <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
                  {timeOptions.map((option) => (
                    <Grid item xs={12} sm={4} key={option.id}>
                      <Box
                        onClick={() => toggleTime(option.id)}
                        sx={{
                          p: 1.5,
                          border: '2px solid',
                          borderColor: selectedTimes.includes(option.id) ? 'primary.main' : '#e5e7eb',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          bgcolor: selectedTimes.includes(option.id) ? '#f0f9ff' : 'white',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          '&:hover': {
                            borderColor: 'primary.main',
                          }
                        }}
                      >
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                            {option.day}
                          </Typography>
                          <Typography variant="body2" color="primary" sx={{ fontWeight: 700 }}>
                            {option.time}
                          </Typography>
                        </Box>
                        {selectedTimes.includes(option.id) && (
                          <CheckCircleIcon color="primary" sx={{ fontSize: 20 }} />
                        )}
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                <Stack direction="row" spacing={1.5}>
                  <Button
                    variant="contained"
                    disabled={selectedTimes.length === 0}
                    sx={{ textTransform: 'none' }}
                  >
                    Submit ({selectedTimes.length} selected)
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<ShareIcon />}
                    sx={{ textTransform: 'none' }}
                  >
                    Share Calendar
                  </Button>
                  <Button
                    variant="text"
                    sx={{ textTransform: 'none' }}
                  >
                    Decline
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Organizing Tab */}
        {currentTab === 1 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <EventIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              No meetings you're organizing yet
            </Typography>
          </Box>
        )}

        {/* Invited Tab */}
        {currentTab === 2 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <GroupsIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              No other invitations
            </Typography>
          </Box>
        )}

        {/* Upcoming Tab */}
        {currentTab === 3 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
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
          </Box>
        )}
      </Box>
    </Box>
  );
}
