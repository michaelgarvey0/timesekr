'use client';

import { Box, Typography, Button, AppBar, Toolbar, IconButton, Menu, MenuItem, Card, CardContent, Chip, Stack, Divider, Tabs, Tab, Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar, Drawer } from '@mui/material';
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
import HomeIcon from '@mui/icons-material/Home';
import ContactsIcon from '@mui/icons-material/Contacts';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SIDEBAR_WIDTH = 240;

export default function NoCalendarHomePage() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedTimes, setSelectedTimes] = useState<number[]>([]);
  const [selectedNav, setSelectedNav] = useState('home');

  const handleLogout = () => {
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
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            boxSizing: 'border-box',
            borderRight: '1px solid #e5e7eb',
            bgcolor: 'white',
          },
        }}
      >
        {/* Logo */}
        <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb' }}>
          <Image
            src="/images/logomark.svg"
            alt="timesēkr"
            width={120}
            height={32}
            priority
          />
        </Box>

        {/* New Meeting Button */}
        <Box sx={{ px: 2, py: 2 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<EventIcon />}
            onClick={() => router.push('/meeting/new')}
            sx={{
              textTransform: 'none',
              py: 1.5,
              fontWeight: 600,
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
            New Meeting
          </Button>
        </Box>

        <Divider />

        {/* Navigation */}
        <List sx={{ px: 2, py: 2 }}>
          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={selectedNav === 'home'}
              onClick={() => setSelectedNav('home')}
              sx={{
                borderRadius: '8px',
                '&.Mui-selected': {
                  bgcolor: '#f0f9ff',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: '#e0f2fe',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                },
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={selectedNav === 'contacts'}
              onClick={() => setSelectedNav('contacts')}
              sx={{
                borderRadius: '8px',
                '&.Mui-selected': {
                  bgcolor: '#f0f9ff',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: '#e0f2fe',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                },
              }}
            >
              <ListItemIcon>
                <ContactsIcon />
              </ListItemIcon>
              <ListItemText primary="Contacts" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={selectedNav === 'calendars'}
              onClick={() => setSelectedNav('calendars')}
              sx={{
                borderRadius: '8px',
                '&.Mui-selected': {
                  bgcolor: '#f0f9ff',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: '#e0f2fe',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                },
              }}
            >
              <ListItemIcon>
                <CalendarTodayIcon />
              </ListItemIcon>
              <ListItemText primary="My Calendars" />
            </ListItemButton>
          </ListItem>
        </List>

        {/* Profile Section at Bottom */}
        <Box sx={{ mt: 'auto', borderTop: '1px solid #e5e7eb' }}>
          <List sx={{ px: 2, py: 2 }}>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                selected={selectedNav === 'settings'}
                onClick={() => setSelectedNav('settings')}
                sx={{
                  borderRadius: '8px',
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                }}
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout} sx={{ borderRadius: '8px' }}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>

          {/* User Profile */}
          <Box sx={{ p: 2, borderTop: '1px solid #e5e7eb' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                M
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem' }} noWrap>
                  Michael Garvey
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  michael@example.com
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, bgcolor: '#fafbfc', overflow: 'auto' }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 3 }}>

        {/* Contacts View */}
        {selectedNav === 'contacts' && (
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
              Contacts
            </Typography>

            {/* Add Contact Button */}
            <Box sx={{ mb: 3 }}>
              <Button
                variant="contained"
                startIcon={<ContactsIcon />}
                sx={{ textTransform: 'none' }}
              >
                Add Contact
              </Button>
            </Box>

            {/* Contact List */}
            <Card>
              <List>
                {[
                  { name: 'Sarah Chen', email: 'sarah@company.com', avatar: 'S', color: '#2196f3' },
                  { name: 'David Kim', email: 'david@startup.io', avatar: 'D', color: '#4caf50' },
                  { name: 'Emma Wilson', email: 'emma@enterprise.com', avatar: 'E', color: '#ff9800' },
                  { name: 'James Rodriguez', email: 'james@tech.com', avatar: 'J', color: '#9c27b0' },
                  { name: 'Lisa Anderson', email: 'lisa@design.co', avatar: 'L', color: '#f44336' },
                ].map((contact, index) => (
                  <Box key={index}>
                    <ListItem>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: contact.color, width: 40, height: 40 }}>
                          {contact.avatar}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={contact.name}
                        secondary={contact.email}
                      />
                    </ListItem>
                    {index < 4 && <Divider />}
                  </Box>
                ))}
              </List>
            </Card>
          </Box>
        )}

        {/* My Calendars View */}
        {selectedNav === 'calendars' && (
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
              My Calendars
            </Typography>

            {/* Connection Cards */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              {/* Google Calendar */}
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CalendarTodayIcon sx={{ fontSize: 32, color: '#4285f4', mr: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Google Calendar
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Connect your Google Calendar to automatically sync your availability and add confirmed meetings.
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ textTransform: 'none' }}
                  >
                    Connect Google Calendar
                  </Button>
                </CardContent>
              </Card>

              {/* Microsoft Outlook */}
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CalendarTodayIcon sx={{ fontSize: 32, color: '#0078d4', mr: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Microsoft Outlook
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Connect your Outlook calendar to automatically sync your availability and add confirmed meetings.
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ textTransform: 'none' }}
                  >
                    Connect Outlook Calendar
                  </Button>
                </CardContent>
              </Card>
            </Box>

            {/* Benefits Section */}
            <Card sx={{ mt: 3, bgcolor: '#f0f9ff' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Why connect your calendar?
                </Typography>
                <Stack spacing={1.5}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CheckCircleIcon color="primary" />
                    <Typography variant="body2">
                      Automatically find times that work for everyone
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CheckCircleIcon color="primary" />
                    <Typography variant="body2">
                      Confirmed meetings added to your calendar instantly
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CheckCircleIcon color="primary" />
                    <Typography variant="body2">
                      Never double-book or miss a meeting again
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CheckCircleIcon color="primary" />
                    <Typography variant="body2">
                      Your calendar data stays private and secure
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Home View (existing content) */}
        {selectedNav === 'home' && (
          <Box>
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

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 1.5, mb: 2.5 }}>
                  {timeOptions.map((option) => (
                    <Box
                      key={option.id}
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
                  ))}
                </Box>

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
        )}
        </Box>
      </Box>
    </Box>
  );
}
