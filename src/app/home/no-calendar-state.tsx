'use client';

import { Box, Typography, Button, AppBar, Toolbar, IconButton, Menu, MenuItem, Card, CardContent, Chip, Stack, Divider, Tabs, Tab, Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar, Drawer, Modal, LinearProgress, Badge } from '@mui/material';
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
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CancelIcon from '@mui/icons-material/Cancel';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SyncIcon from '@mui/icons-material/Sync';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SIDEBAR_WIDTH_EXPANDED = 240;
const SIDEBAR_WIDTH_COLLAPSED = 72;

export default function NoCalendarHomePage() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedTimes, setSelectedTimes] = useState<number[]>([]);
  const [selectedNav, setSelectedNav] = useState('home');
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Default to collapsed

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

  const toggleAttendeeSelection = (email: string) => {
    if (selectedAttendees.includes(email)) {
      setSelectedAttendees(selectedAttendees.filter(e => e !== email));
    } else {
      setSelectedAttendees([...selectedAttendees, email]);
    }
  };

  const selectAllAttendees = () => {
    setSelectedAttendees(mockOrganizingMeeting.attendees.map(a => a.email));
  };

  const deselectAllAttendees = () => {
    setSelectedAttendees([]);
  };

  const handleSendReminder = () => {
    alert(`Sending reminder to ${selectedAttendees.length} attendee(s)`);
    setSelectedAttendees([]);
  };

  const handleSendInvitation = () => {
    alert('Sending invitation regardless of responses...');
    setShowMeetingModal(false);
  };

  const timeOptions = [
    { id: 1, day: 'Wed, Jan 15', time: '10:00 AM' },
    { id: 2, day: 'Thu, Jan 16', time: '2:00 PM' },
    { id: 3, day: 'Fri, Jan 17', time: '1:00 PM' },
  ];

  // Mock contacts with different relationship states
  const mockPendingRequests = [
    { name: 'Alex Johnson', email: 'alex@company.com', avatar: 'A', color: '#3b82f6', sharedCalendar: true },
    { name: 'Maria Garcia', email: 'maria@startup.io', avatar: 'M', color: '#8b5cf6', sharedCalendar: false },
  ];

  const mockConnectedContacts = [
    { name: 'Sarah Chen', email: 'sarah@company.com', avatar: 'S', color: '#2196f3', calendarStatus: 'mutual' }, // Both shared
    { name: 'David Kim', email: 'david@startup.io', avatar: 'D', color: '#4caf50', calendarStatus: 'they-shared' }, // They shared with you
    { name: 'Emma Wilson', email: 'emma@enterprise.com', avatar: 'E', color: '#ff9800', calendarStatus: 'you-shared' }, // You shared with them
    { name: 'James Rodriguez', email: 'james@tech.com', avatar: 'J', color: '#9c27b0', calendarStatus: 'none' }, // No sharing
    { name: 'Lisa Anderson', email: 'lisa@design.co', avatar: 'L', color: '#f44336', calendarStatus: 'mutual' },
  ];

  // Mock organizing meeting with 10 people
  const mockOrganizingMeeting = {
    id: 1,
    title: 'Q2 Strategy Planning',
    duration: '90 min',
    totalAttendees: 10,
    responded: 6,
    pending: 4,
    proposedTimes: 3,
    deadline: 'in 3 days',
    attendees: [
      { name: 'Sarah Chen', email: 'sarah@company.com', status: 'responded', avatar: 'S', color: '#2196f3', votes: 2 },
      { name: 'David Kim', email: 'david@startup.io', status: 'responded', avatar: 'D', color: '#4caf50', votes: 3 },
      { name: 'Emma Wilson', email: 'emma@enterprise.com', status: 'responded', avatar: 'E', color: '#ff9800', votes: 2 },
      { name: 'James Rodriguez', email: 'james@tech.com', status: 'pending', avatar: 'J', color: '#9c27b0', votes: 0 },
      { name: 'Lisa Anderson', email: 'lisa@design.co', status: 'responded', avatar: 'L', color: '#f44336', votes: 1 },
      { name: 'Michael Brown', email: 'michael@corp.com', status: 'pending', avatar: 'M', color: '#00bcd4', votes: 0 },
      { name: 'Sophie Taylor', email: 'sophie@agency.com', status: 'responded', avatar: 'S', color: '#795548', votes: 3 },
      { name: 'Robert Lee', email: 'robert@studio.io', status: 'pending', avatar: 'R', color: '#607d8b', votes: 0 },
      { name: 'Amanda White', email: 'amanda@firm.com', status: 'responded', avatar: 'A', color: '#e91e63', votes: 2 },
      { name: 'Chris Martin', email: 'chris@group.co', status: 'declined', avatar: 'C', color: '#9e9e9e', votes: 0 },
    ]
  };

  const sidebarWidth = sidebarCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          transition: 'width 0.3s ease',
          '& .MuiDrawer-paper': {
            width: sidebarWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid #e5e7eb',
            bgcolor: 'white',
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
          },
        }}
      >
        {/* Logo / Toggle */}
        <Box sx={{ p: sidebarCollapsed ? 1.5 : 3, borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: sidebarCollapsed ? 'center' : 'space-between' }}>
          {!sidebarCollapsed && (
            <Image
              src="/images/logomark.svg"
              alt="timesēkr"
              width={120}
              height={32}
              priority
            />
          )}
          <IconButton
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            size="small"
            sx={{ color: 'text.secondary' }}
          >
            {sidebarCollapsed ? <MenuIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Box>

        {/* New Meeting Button */}
        <Box sx={{ px: 2, py: 2 }}>
          {sidebarCollapsed ? (
            <IconButton
              onClick={() => router.push('/meeting/new')}
              sx={{
                width: '100%',
                height: 48,
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: '8px',
                '&:hover': {
                  bgcolor: 'primary.dark',
                }
              }}
            >
              <EventIcon />
            </IconButton>
          ) : (
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
          )}
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
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
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
              <ListItemIcon sx={{ minWidth: sidebarCollapsed ? 'auto' : 40 }}>
                <HomeIcon />
              </ListItemIcon>
              {!sidebarCollapsed && <ListItemText primary="Home" />}
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={selectedNav === 'contacts'}
              onClick={() => setSelectedNav('contacts')}
              sx={{
                borderRadius: '8px',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
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
              <ListItemIcon sx={{ minWidth: sidebarCollapsed ? 'auto' : 40 }}>
                <ContactsIcon />
              </ListItemIcon>
              {!sidebarCollapsed && <ListItemText primary="Contacts" />}
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={selectedNav === 'calendars'}
              onClick={() => setSelectedNav('calendars')}
              sx={{
                borderRadius: '8px',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
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
              <ListItemIcon sx={{ minWidth: sidebarCollapsed ? 'auto' : 40 }}>
                <CalendarTodayIcon />
              </ListItemIcon>
              {!sidebarCollapsed && <ListItemText primary="My Calendars" />}
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
                  justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
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
                <ListItemIcon sx={{ minWidth: sidebarCollapsed ? 'auto' : 40 }}>
                  <SettingsIcon />
                </ListItemIcon>
                {!sidebarCollapsed && <ListItemText primary="Settings" />}
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  borderRadius: '8px',
                  justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                }}
              >
                <ListItemIcon sx={{ minWidth: sidebarCollapsed ? 'auto' : 40 }}>
                  <LogoutIcon />
                </ListItemIcon>
                {!sidebarCollapsed && <ListItemText primary="Logout" />}
              </ListItemButton>
            </ListItem>
          </List>

          {/* User Profile */}
          <Box sx={{ p: 2, borderTop: '1px solid #e5e7eb' }}>
            {sidebarCollapsed ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                  M
                </Avatar>
              </Box>
            ) : (
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
            )}
          </Box>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, bgcolor: '#fafbfc', overflow: 'auto' }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 3 }}>

        {/* Contacts View */}
        {selectedNav === 'contacts' && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                Contacts
              </Typography>
              <Button
                variant="contained"
                startIcon={<PersonAddAltIcon />}
                sx={{ textTransform: 'none' }}
                onClick={() => alert('Add contact')}
              >
                Add Contact
              </Button>
            </Box>

            {/* Pending Contact Requests */}
            {mockPendingRequests.length > 0 && (
              <Card sx={{ mb: 3, border: '2px solid #3b82f6', bgcolor: '#eff6ff' }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Badge badgeContent={mockPendingRequests.length} color="primary">
                      <PersonAddAltIcon color="primary" />
                    </Badge>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Pending Requests
                    </Typography>
                  </Box>

                  <Stack spacing={2}>
                    {mockPendingRequests.map((request, index) => (
                      <Card key={index} sx={{ bgcolor: 'white' }}>
                        <CardContent sx={{ p: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: request.color, width: 48, height: 48 }}>
                              {request.avatar}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {request.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {request.email}
                              </Typography>
                              {request.sharedCalendar && (
                                <Chip
                                  icon={<CalendarTodayIcon sx={{ fontSize: 14 }} />}
                                  label="Shared calendar with you"
                                  size="small"
                                  sx={{ mt: 0.5, bgcolor: '#dcfce7', color: '#16a34a', fontSize: '0.75rem' }}
                                />
                              )}
                            </Box>
                            <Stack direction="row" spacing={1}>
                              <Button
                                variant="contained"
                                size="small"
                                onClick={() => alert(`Accept ${request.name}`)}
                                sx={{ textTransform: 'none' }}
                              >
                                Accept
                              </Button>
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() => alert(`Decline ${request.name}`)}
                                sx={{ textTransform: 'none' }}
                              >
                                Decline
                              </Button>
                            </Stack>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            )}

            {/* Connected Contacts */}
            <Card>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Connected ({mockConnectedContacts.length})
                </Typography>

                <List sx={{ p: 0 }}>
                  {mockConnectedContacts.map((contact, index) => (
                    <Box key={index}>
                      <ListItem sx={{ px: 0, py: 2 }}>
                        <ListItemIcon sx={{ minWidth: 'auto', mr: 2 }}>
                          <Avatar sx={{ bgcolor: contact.color, width: 48, height: 48 }}>
                            {contact.avatar}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {contact.name}
                            </Typography>
                          }
                          secondary={
                            <Box component="span" sx={{ display: 'block' }}>
                              <Typography variant="body2" color="text.secondary" component="span" sx={{ display: 'block' }}>
                                {contact.email}
                              </Typography>
                              {/* Calendar Sharing Status */}
                              {contact.calendarStatus === 'mutual' && (
                                <Chip
                                  icon={<SwapHorizIcon sx={{ fontSize: 14 }} />}
                                  label="Calendars shared"
                                  size="small"
                                  sx={{ mt: 0.5, bgcolor: '#dcfce7', color: '#16a34a', fontSize: '0.75rem' }}
                                />
                              )}
                              {contact.calendarStatus === 'they-shared' && (
                                <Chip
                                  icon={<CalendarTodayIcon sx={{ fontSize: 14 }} />}
                                  label="They shared with you"
                                  size="small"
                                  sx={{ mt: 0.5, bgcolor: '#e0f2fe', color: '#0284c7', fontSize: '0.75rem' }}
                                />
                              )}
                              {contact.calendarStatus === 'you-shared' && (
                                <Chip
                                  icon={<CalendarTodayIcon sx={{ fontSize: 14 }} />}
                                  label="You shared with them"
                                  size="small"
                                  sx={{ mt: 0.5, bgcolor: '#fef3c7', color: '#d97706', fontSize: '0.75rem' }}
                                />
                              )}
                              {contact.calendarStatus === 'none' && (
                                <Chip
                                  label="No calendar sharing"
                                  size="small"
                                  sx={{ mt: 0.5, bgcolor: '#f1f5f9', color: '#64748b', fontSize: '0.75rem' }}
                                />
                              )}
                            </Box>
                          }
                          secondaryTypographyProps={{ component: 'div' }}
                        />
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {contact.calendarStatus === 'none' && (
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<ShareIcon />}
                              onClick={() => alert(`Share calendar with ${contact.name}`)}
                              sx={{ textTransform: 'none' }}
                            >
                              Share Calendar
                            </Button>
                          )}
                          {contact.calendarStatus === 'they-shared' && (
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<ShareIcon />}
                              onClick={() => alert(`Share calendar with ${contact.name}`)}
                              sx={{ textTransform: 'none' }}
                            >
                              Share Back
                            </Button>
                          )}
                          {contact.calendarStatus === 'you-shared' && (
                            <Chip
                              label="Waiting for them"
                              size="small"
                              sx={{ bgcolor: '#fef3c7', color: '#d97706' }}
                            />
                          )}
                          {contact.calendarStatus === 'mutual' && (
                            <Chip
                              icon={<SyncIcon sx={{ fontSize: 14 }} />}
                              label="Synced"
                              size="small"
                              color="success"
                            />
                          )}
                          <IconButton size="small">
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </ListItem>
                      {index < mockConnectedContacts.length - 1 && <Divider />}
                    </Box>
                  ))}
                </List>
              </CardContent>
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
          <Box>
            <Card
              sx={{
                mb: 2,
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: 2,
                  borderColor: 'primary.main',
                }
              }}
              onClick={() => setShowMeetingModal(true)}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {mockOrganizingMeeting.title}
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        <GroupsIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                        {mockOrganizingMeeting.totalAttendees} attendees
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <AccessTimeIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                        {mockOrganizingMeeting.duration}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Due {mockOrganizingMeeting.deadline}
                      </Typography>
                    </Stack>
                  </Box>
                  <Chip
                    label="In Progress"
                    size="small"
                    color="warning"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>

                {/* Progress Bar */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      Response Rate
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {mockOrganizingMeeting.responded}/{mockOrganizingMeeting.totalAttendees} responded
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(mockOrganizingMeeting.responded / mockOrganizingMeeting.totalAttendees) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 1,
                      bgcolor: '#e5e7eb',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: '#22c55e',
                      }
                    }}
                  />
                </Box>

                {/* Attendee Avatars */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ display: 'flex' }}>
                    {mockOrganizingMeeting.attendees.slice(0, 8).map((attendee, index) => (
                      <Avatar
                        key={index}
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: attendee.color,
                          border: '2px solid white',
                          ml: index > 0 ? -1 : 0,
                          fontSize: '0.875rem',
                          opacity: attendee.status === 'pending' ? 0.5 : 1,
                        }}
                      >
                        {attendee.avatar}
                      </Avatar>
                    ))}
                    {mockOrganizingMeeting.attendees.length > 8 && (
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: '#9ca3af',
                          border: '2px solid white',
                          ml: -1,
                          fontSize: '0.75rem',
                        }}
                      >
                        +{mockOrganizingMeeting.attendees.length - 8}
                      </Avatar>
                    )}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    <Badge badgeContent={mockOrganizingMeeting.pending} color="error" sx={{ mr: 1 }}>
                      <HourglassEmptyIcon sx={{ fontSize: 18 }} />
                    </Badge>
                    {mockOrganizingMeeting.pending} pending
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<EmailIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      alert('Send reminder to all pending');
                    }}
                    sx={{ textTransform: 'none' }}
                  >
                    Remind All
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      alert('Edit meeting');
                    }}
                    sx={{ textTransform: 'none' }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMeetingModal(true);
                    }}
                    sx={{ textTransform: 'none' }}
                  >
                    View Details
                  </Button>
                </Stack>
              </CardContent>
            </Card>
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

      {/* Meeting Details Modal */}
      <Modal
        open={showMeetingModal}
        onClose={() => {
          setShowMeetingModal(false);
          setSelectedAttendees([]);
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 600 },
            maxHeight: '90vh',
            overflow: 'auto',
            bgcolor: 'background.paper',
            borderRadius: '12px',
            boxShadow: 24,
          }}
        >
          {/* Modal Header */}
          <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, bgcolor: 'white', zIndex: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {mockOrganizingMeeting.title}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Typography variant="body2" color="text.secondary">
                    {mockOrganizingMeeting.duration}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Due {mockOrganizingMeeting.deadline}
                  </Typography>
                </Stack>
              </Box>
              <IconButton onClick={() => setShowMeetingModal(false)} size="small">
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Progress Summary */}
            <Box sx={{ mt: 2 }}>
              <LinearProgress
                variant="determinate"
                value={(mockOrganizingMeeting.responded / mockOrganizingMeeting.totalAttendees) * 100}
                sx={{
                  height: 6,
                  borderRadius: 1,
                  bgcolor: '#e5e7eb',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: '#22c55e',
                  }
                }}
              />
              <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  <CheckCircleIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5, color: '#22c55e' }} />
                  {mockOrganizingMeeting.responded} responded
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  <HourglassEmptyIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5, color: '#f59e0b' }} />
                  {mockOrganizingMeeting.pending} pending
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  <CancelIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5, color: '#ef4444' }} />
                  {mockOrganizingMeeting.attendees.filter(a => a.status === 'declined').length} declined
                </Typography>
              </Stack>
            </Box>
          </Box>

          {/* Attendee List */}
          <Box sx={{ p: 3 }}>
            {/* Selection Actions */}
            {selectedAttendees.length > 0 && (
              <Box sx={{ mb: 2, p: 2, bgcolor: '#f0f9ff', borderRadius: '8px' }}>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {selectedAttendees.length} selected
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<EmailIcon />}
                      onClick={handleSendReminder}
                      sx={{ textTransform: 'none' }}
                    >
                      Send Reminder
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={deselectAllAttendees}
                      sx={{ textTransform: 'none' }}
                    >
                      Deselect All
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            )}

            {/* Select/Deselect All */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Attendees ({mockOrganizingMeeting.totalAttendees})
              </Typography>
              <Button
                size="small"
                onClick={selectedAttendees.length === mockOrganizingMeeting.attendees.length ? deselectAllAttendees : selectAllAttendees}
                sx={{ textTransform: 'none', fontSize: '0.75rem' }}
              >
                {selectedAttendees.length === mockOrganizingMeeting.attendees.length ? 'Deselect All' : 'Select All'}
              </Button>
            </Box>

            <List sx={{ p: 0 }}>
              {mockOrganizingMeeting.attendees.map((attendee, index) => (
                <Box key={index}>
                  <ListItem
                    sx={{
                      px: 0,
                      py: 1.5,
                      '&:hover': { bgcolor: '#f8fafc' },
                      borderRadius: '8px',
                    }}
                  >
                    <Checkbox
                      checked={selectedAttendees.includes(attendee.email)}
                      onChange={() => toggleAttendeeSelection(attendee.email)}
                      sx={{ mr: 1 }}
                    />
                    <ListItemIcon sx={{ minWidth: 'auto', mr: 2 }}>
                      <Avatar sx={{ bgcolor: attendee.color, width: 40, height: 40 }}>
                        {attendee.avatar}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {attendee.name}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="caption" color="text.secondary">
                          {attendee.email}
                        </Typography>
                      }
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {attendee.status === 'responded' && (
                        <Chip
                          label={`${attendee.votes} votes`}
                          size="small"
                          sx={{ bgcolor: '#dcfce7', color: '#16a34a', fontWeight: 600 }}
                        />
                      )}
                      <Chip
                        label={attendee.status === 'responded' ? 'Responded' : attendee.status === 'pending' ? 'Pending' : 'Declined'}
                        size="small"
                        color={attendee.status === 'responded' ? 'success' : attendee.status === 'pending' ? 'warning' : 'error'}
                        sx={{ minWidth: 85 }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => alert(`Send individual reminder to ${attendee.name}`)}
                      >
                        <EmailIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Box>
                  </ListItem>
                  {index < mockOrganizingMeeting.attendees.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Box>

          {/* Modal Footer Actions */}
          <Box sx={{ p: 3, borderTop: '1px solid #e5e7eb', bgcolor: '#fafbfc', position: 'sticky', bottom: 0 }}>
            <Stack spacing={1.5}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<SendIcon />}
                onClick={handleSendInvitation}
                sx={{ textTransform: 'none', py: 1.2 }}
              >
                Send Invitation Regardless
              </Button>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<EditIcon />}
                  onClick={() => {
                    setShowMeetingModal(false);
                    alert('Edit meeting');
                  }}
                  sx={{ textTransform: 'none' }}
                >
                  Edit Meeting
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => alert('Cancel meeting')}
                  sx={{ textTransform: 'none', color: '#ef4444', borderColor: '#ef4444' }}
                >
                  Cancel Meeting
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
