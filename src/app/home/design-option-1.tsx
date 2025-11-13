'use client';

import { Box, Typography, Button, Tabs, Tab, AppBar, Toolbar, IconButton, Avatar, Card, CardContent, Chip, Stack, LinearProgress, AvatarGroup, Modal, Divider, List, ListItem, ListItemText, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ContactsIcon from '@mui/icons-material/Contacts';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import RemoveIcon from '@mui/icons-material/Remove';
import Image from 'next/image';
import { useState } from 'react';

// DESIGN OPTION 1: Clean Horizontal Tabs
// All sections accessible via top-level tabs

// Mock data for meetings organized by user
const mockOrganizingMeetings = [
  {
    id: 1,
    title: 'Q2 Strategy Planning',
    totalAttendees: 10,
    responded: 6,
    pending: 4,
    status: 'Pending',
    statusColor: 'warning',
    winningTime: { id: 1, day: 'Thu, Jan 18', time: '2:00 PM', votes: 4 },
    proposedTimes: [
      { id: 1, day: 'Thu, Jan 18', time: '2:00 PM', votes: 4 },
      { id: 2, day: 'Fri, Jan 19', time: '10:00 AM', votes: 2 },
      { id: 3, day: 'Fri, Jan 19', time: '3:00 PM', votes: 1 },
    ],
    attendees: [
      { email: 'sarah.chen@company.com', firstName: 'Sarah', lastName: 'Chen', onPlatform: true, responded: true, availability: { 1: 'available', 2: 'unavailable', 3: null } },
      { email: 'david.kim@company.com', firstName: 'David', lastName: 'Kim', onPlatform: true, responded: true, availability: { 1: 'available', 2: 'available', 3: null } },
      { email: 'emma.wilson@company.com', firstName: 'Emma', lastName: 'Wilson', onPlatform: true, responded: true, availability: { 1: 'available', 2: null, 3: 'unavailable' } },
      { email: 'james.rodriguez@client.com', onPlatform: false, responded: false, availability: { 1: null, 2: null, 3: null } },
      { email: 'lisa.anderson@company.com', firstName: 'Lisa', lastName: 'Anderson', onPlatform: true, responded: true, availability: { 1: 'available', 2: null, 3: 'available' } },
      { email: 'mike.brown@partner.com', onPlatform: false, responded: false, availability: { 1: null, 2: null, 3: null } },
      { email: 'sophie.taylor@company.com', firstName: 'Sophie', lastName: 'Taylor', onPlatform: true, responded: true, availability: { 1: 'unavailable', 2: 'available', 3: null } },
      { email: 'robert.lee@external.com', onPlatform: false, responded: false, availability: { 1: null, 2: null, 3: null } },
      { email: 'amanda.white@company.com', firstName: 'Amanda', lastName: 'White', onPlatform: true, responded: true, availability: { 1: 'unavailable', 2: 'unavailable', 3: null } },
      { email: 'chris.martin@vendor.com', onPlatform: false, responded: true, availability: { 1: 'available', 2: null, 3: null } },
    ]
  },
  {
    id: 2,
    title: 'Team Sync',
    totalAttendees: 5,
    responded: 5,
    pending: 0,
    status: 'Ready',
    statusColor: 'success',
    winningTime: { id: 1, day: 'Mon, Jan 15', time: '10:00 AM', votes: 5 },
    proposedTimes: [
      { id: 1, day: 'Mon, Jan 15', time: '10:00 AM', votes: 5 },
      { id: 2, day: 'Mon, Jan 15', time: '2:00 PM', votes: 3 },
    ],
    attendees: [
      { email: 'sarah.chen@company.com', firstName: 'Sarah', lastName: 'Chen', onPlatform: true, responded: true, availability: { 1: 'available', 2: 'available' } },
      { email: 'david.kim@company.com', firstName: 'David', lastName: 'Kim', onPlatform: true, responded: true, availability: { 1: 'available', 2: 'available' } },
      { email: 'emma.wilson@company.com', firstName: 'Emma', lastName: 'Wilson', onPlatform: true, responded: true, availability: { 1: 'available', 2: 'available' } },
      { email: 'james@external.com', onPlatform: false, responded: true, availability: { 1: 'available', 2: 'unavailable' } },
      { email: 'lisa.anderson@company.com', firstName: 'Lisa', lastName: 'Anderson', onPlatform: true, responded: true, availability: { 1: 'available', 2: 'available' } },
    ]
  },
];

// Mock data for meetings user is invited to
const mockInvitedMeetings = [
  {
    id: 3,
    title: 'Design Review',
    organizer: 'Sarah Chen',
    totalAttendees: 8,
    responded: 5,
    pending: 3,
    status: 'Action Required',
    statusColor: 'warning',
    winningTime: { id: 1, day: 'Wed, Jan 17', time: '3:00 PM', votes: 3 },
    proposedTimes: [
      { id: 1, day: 'Wed, Jan 17', time: '3:00 PM', votes: 3 },
      { id: 2, day: 'Thu, Jan 18', time: '11:00 AM', votes: 2 },
      { id: 3, day: 'Thu, Jan 18', time: '4:00 PM', votes: 1 },
    ],
    attendees: [
      { email: 'sarah.chen@company.com', firstName: 'Sarah', lastName: 'Chen', onPlatform: true, responded: true, availability: { 1: 'available', 2: 'available', 3: 'unavailable' } },
      { email: 'david.kim@company.com', firstName: 'David', lastName: 'Kim', onPlatform: true, responded: true, availability: { 1: 'available', 2: null, 3: null } },
      { email: 'emma.wilson@company.com', firstName: 'Emma', lastName: 'Wilson', onPlatform: true, responded: true, availability: { 1: 'available', 2: 'unavailable', 3: null } },
      { email: 'james.rodriguez@client.com', onPlatform: false, responded: false, availability: { 1: null, 2: null, 3: null } },
      { email: 'lisa.anderson@company.com', firstName: 'Lisa', lastName: 'Anderson', onPlatform: true, responded: true, availability: { 1: 'unavailable', 2: 'available', 3: null } },
      { email: 'mike.brown@partner.com', onPlatform: false, responded: false, availability: { 1: null, 2: null, 3: null } },
      { email: 'sophie.taylor@company.com', firstName: 'Sophie', lastName: 'Taylor', onPlatform: true, responded: true, availability: { 1: 'unavailable', 2: null, 3: 'available' } },
      { email: 'robert.lee@external.com', onPlatform: false, responded: false, availability: { 1: null, 2: null, 3: null } },
    ]
  },
];

export default function DesignOption1() {
  const [currentTab, setCurrentTab] = useState(0);
  const [viewMode, setViewMode] = useState<'organizer' | 'invitee'>('organizer');
  const [selectedMeeting, setSelectedMeeting] = useState<typeof mockOrganizingMeetings[0] | null>(null);
  const [confirmInviteMeeting, setConfirmInviteMeeting] = useState<typeof mockOrganizingMeetings[0] | null>(null);

  // Helper functions for attendee display
  const getAttendeeDisplayName = (attendee: any) => {
    if (attendee.onPlatform && attendee.firstName && attendee.lastName) {
      return `${attendee.firstName} ${attendee.lastName}`;
    }
    return attendee.email || 'Unknown';
  };

  const getAttendeeInitials = (attendee: any) => {
    if (attendee.onPlatform && attendee.firstName && attendee.lastName) {
      return `${attendee.firstName[0]}${attendee.lastName[0]}`;
    }
    return attendee.email ? attendee.email[0].toUpperCase() : '?';
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafbfc' }}>
      {/* Top Nav */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <Box sx={{ maxWidth: 900, mx: 'auto', width: '100%', px: 3 }}>
          <Toolbar sx={{ px: 0 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Image src="/images/logomark.svg" alt="timesēkr" width={120} height={32} priority />
            </Box>
            <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>M</Avatar>
          </Toolbar>
        </Box>
      </AppBar>

      {/* Main Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white' }}>
        <Box sx={{ maxWidth: 900, mx: 'auto', px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Tabs value={currentTab} onChange={(e, v) => setCurrentTab(v)}>
            <Tab icon={<EventIcon />} iconPosition="start" label="Meetings" sx={{ textTransform: 'none', minHeight: 64 }} />
            <Tab icon={<ContactsIcon />} iconPosition="start" label="People" sx={{ textTransform: 'none', minHeight: 64 }} />
            <Tab icon={<AccessTimeIcon />} iconPosition="start" label="My Time" sx={{ textTransform: 'none', minHeight: 64 }} />
          </Tabs>
          <Button variant="contained" startIcon={<EventIcon />} sx={{ textTransform: 'none' }}>
            New Meeting
          </Button>
        </Box>
      </Box>

      {/* Content Area */}
      <Box sx={{ maxWidth: 900, mx: 'auto', px: 3, py: 4 }}>
        {/* TAB 1: Meetings */}
        {currentTab === 0 && (
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Meetings
            </Typography>
            <Stack spacing={2}>
              {(viewMode === 'organizer' ? mockOrganizingMeetings : mockInvitedMeetings).map((meeting) => (
                <Card
                  key={meeting.id}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.3)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                  onClick={() => setSelectedMeeting(meeting)}
                >
                  <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                    {/* Status Chip at Top Left */}
                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={meeting.status}
                        color={meeting.statusColor as any}
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>

                    {/* Title and Avatars */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2.5 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {meeting.title}
                        </Typography>
                        <Stack direction="row" spacing={2}>
                          {viewMode === 'invitee' && 'organizer' in meeting && (
                            <Typography variant="body2" color="text.secondary">
                              Organized by {(meeting as typeof mockInvitedMeetings[0]).organizer}
                            </Typography>
                          )}
                          <Typography variant="body2" color="text.secondary">
                            <GroupsIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                            {meeting.totalAttendees} attendees
                          </Typography>
                        </Stack>
                      </Box>
                      <AvatarGroup max={6} sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: '0.875rem', bgcolor: 'primary.main' } }}>
                        {meeting.attendees.map((attendee, idx) => (
                          <Avatar key={idx} sx={{ bgcolor: attendee.onPlatform ? 'primary.main' : '#94a3b8' }}>
                            {getAttendeeInitials(attendee)}
                          </Avatar>
                        ))}
                      </AvatarGroup>
                    </Box>

                    {/* Proposed Times */}
                    <Box sx={{ mb: 2.5 }}>
                      <Stack direction="row" spacing={1.5}>
                        {meeting.proposedTimes.map((time) => {
                          const isWinningTime = time.id === meeting.winningTime.id;
                          return (
                            <Box
                              key={time.id}
                              sx={{
                                flex: 1,
                                py: 1.5,
                                px: 1.5,
                                bgcolor: isWinningTime ? '#f0f9ff' : '#f8fafc',
                                border: isWinningTime ? '2px solid #3b82f6' : '1px solid transparent',
                                borderRadius: '6px',
                                textAlign: 'center',
                                position: 'relative',
                              }}
                            >
                              <Typography variant="body2" sx={{ fontWeight: isWinningTime ? 600 : 500, mb: 0.25, color: isWinningTime ? '#1e40af' : 'inherit' }}>
                                {time.day} @ {time.time}
                              </Typography>
                              <Typography variant="caption" color={isWinningTime ? 'primary' : 'text.secondary'} sx={{ display: 'block', fontWeight: isWinningTime ? 600 : 400 }}>
                                {time.votes}/{meeting.totalAttendees} available
                              </Typography>
                              {isWinningTime && (
                                <Chip
                                  label="Best"
                                  size="small"
                                  color="primary"
                                  sx={{ position: 'absolute', top: -8, right: -8, height: 20, fontSize: '0.7rem', fontWeight: 600 }}
                                />
                              )}
                            </Box>
                          );
                        })}
                      </Stack>
                    </Box>

                    {/* Progress Bar */}
                    <Box sx={{ mb: 2.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          Response Progress
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          {meeting.responded}/{meeting.totalAttendees}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(meeting.responded / meeting.totalAttendees) * 100}
                        sx={{
                          height: 6,
                          borderRadius: 1,
                          bgcolor: '#e5e7eb',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: meeting.status === 'Ready' ? '#22c55e' : '#f59e0b',
                          }
                        }}
                      />
                    </Box>

                    {/* Action Buttons at Bottom */}
                    <Stack direction="row" spacing={1.5}>
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{ textTransform: 'none', minHeight: '42px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMeeting(meeting);
                        }}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ textTransform: 'none', minHeight: '42px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmInviteMeeting(meeting);
                        }}
                      >
                        Send Invite
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        )}

        {/* TAB 2: People */}
        {currentTab === 1 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                People
              </Typography>
              <Button variant="contained">Add Person</Button>
            </Box>
            <Stack spacing={2}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#3b82f6' }}>S</Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>Sarah Chen</Typography>
                      <Typography variant="body2" color="text.secondary">sarah@company.com</Typography>
                    </Box>
                    <Chip label="Connected" size="small" color="success" />
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Box>
        )}

        {/* TAB 3: My Time */}
        {currentTab === 2 && (
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              My Availability
            </Typography>
            <Card>
              <CardContent>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>Connect Calendar</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Connect your calendar to automatically manage your availability
                </Typography>
                <Button variant="contained" startIcon={<CalendarTodayIcon />}>
                  Connect Google Calendar
                </Button>
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>

      {/* View Mode Toggle */}
      <Box sx={{ position: 'fixed', bottom: 80, right: 20, zIndex: 999 }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => setViewMode(viewMode === 'organizer' ? 'invitee' : 'organizer')}
          sx={{ textTransform: 'none' }}
        >
          {viewMode === 'organizer' ? 'Switch to Invitee View' : 'Switch to Organizer View'}
        </Button>
      </Box>

      {/* Meeting Details Modal */}
      {selectedMeeting && (
        <Modal
          open={true}
          onClose={() => setSelectedMeeting(null)}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '95%', sm: '90%', md: 1400 },
              maxHeight: '85vh',
              bgcolor: 'background.paper',
              borderRadius: '12px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Fixed Modal Header */}
            <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexShrink: 0 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {selectedMeeting.title}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Typography variant="body2" color="text.secondary">
                    {selectedMeeting.totalAttendees} attendees
                  </Typography>
                  <Chip
                    label={selectedMeeting.status}
                    size="small"
                    color={selectedMeeting.statusColor as any}
                  />
                </Stack>
              </Box>
              <IconButton onClick={() => setSelectedMeeting(null)} size="small">
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Scrollable Content Area */}
            <Box sx={{ overflowY: 'auto', flex: 1 }}>
              {/* Response Progress */}
              <Box sx={{ p: 3, bgcolor: '#f8fafc' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Response Progress</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedMeeting.responded}/{selectedMeeting.totalAttendees} responded
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(selectedMeeting.responded / selectedMeeting.totalAttendees) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 1,
                    bgcolor: '#e5e7eb',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: selectedMeeting.status === 'Ready' ? '#22c55e' : '#f59e0b',
                    }
                  }}
                />
              </Box>

              {/* Availability Grid */}
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Availability Grid
                  </Typography>
                  {selectedMeeting.responded < selectedMeeting.totalAttendees && (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<EmailIcon />}
                      sx={{ textTransform: 'none' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Nudging ${selectedMeeting.totalAttendees - selectedMeeting.responded} non-responders`);
                      }}
                    >
                      Nudge All Pending ({selectedMeeting.totalAttendees - selectedMeeting.responded})
                    </Button>
                  )}
                </Box>
                <Box sx={{ mb: 2, display: 'flex', gap: 3, justifyContent: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', bgcolor: '#dcfce7' }}>
                      <CheckIcon sx={{ fontSize: 14, color: '#16a34a' }} />
                    </Box>
                    <Typography variant="caption" color="text.secondary">Available</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', bgcolor: '#fee2e2' }}>
                      <ClearIcon sx={{ fontSize: 14, color: '#dc2626' }} />
                    </Box>
                    <Typography variant="caption" color="text.secondary">Unavailable</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', bgcolor: '#f3f4f6' }}>
                      <RemoveIcon sx={{ fontSize: 14, color: '#9ca3af' }} />
                    </Box>
                    <Typography variant="caption" color="text.secondary">Not Selected</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, border: '1px solid #e5e7eb' }} />
                    <Typography variant="caption" color="text.secondary">No Response</Typography>
                  </Box>
                </Box>
                <Box sx={{ overflowX: 'auto' }}>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, bgcolor: '#f8fafc', borderBottom: '2px solid #e5e7eb', position: 'sticky', left: 0, bgcolor: '#f8fafc', zIndex: 1 }}>
                          Attendee
                        </TableCell>
                        {selectedMeeting.proposedTimes.map((time) => (
                          <TableCell
                            key={time.id}
                            align="center"
                            sx={{
                              fontWeight: 600,
                              bgcolor: time.id === selectedMeeting.winningTime.id ? '#f0f9ff' : '#f8fafc',
                              borderBottom: '2px solid #e5e7eb',
                              minWidth: 160,
                            }}
                          >
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                {time.day}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {time.time}
                              </Typography>
                            </Box>
                            {time.id === selectedMeeting.winningTime.id && (
                              <Chip
                                label="Best"
                                size="small"
                                color="primary"
                                sx={{ mt: 1, height: 20, fontSize: '0.65rem', fontWeight: 600 }}
                              />
                            )}
                          </TableCell>
                        ))}
                        <TableCell sx={{ fontWeight: 600, bgcolor: '#f8fafc', borderBottom: '2px solid #e5e7eb', minWidth: 100 }} align="center">
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedMeeting.attendees.map((attendee, idx) => (
                        <TableRow
                          key={idx}
                          sx={{
                            '&:hover': { bgcolor: '#fafbfc' },
                          }}
                        >
                          <TableCell sx={{ position: 'sticky', left: 0, bgcolor: 'white', zIndex: 1, borderBottom: '1px solid #f3f4f6' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Avatar sx={{ bgcolor: attendee.onPlatform ? 'primary.main' : '#94a3b8', width: 32, height: 32, fontSize: '0.75rem' }}>
                                {getAttendeeInitials(attendee)}
                              </Avatar>
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.25 }}>
                                  {getAttendeeDisplayName(attendee)}
                                </Typography>
                                {!attendee.onPlatform && (
                                  <Typography variant="caption" color="text.secondary">
                                    Email only
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          </TableCell>
                          {selectedMeeting.proposedTimes.map((time) => {
                            const availability = attendee.availability?.[time.id];
                            const isWinningTime = time.id === selectedMeeting.winningTime.id;
                            return (
                              <TableCell
                                key={time.id}
                                align="center"
                                sx={{
                                  bgcolor: isWinningTime ? '#f0f9ff' : 'inherit',
                                  borderBottom: '1px solid #f3f4f6',
                                }}
                              >
                                {availability === 'available' && (
                                  <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', bgcolor: '#dcfce7' }}>
                                    <CheckIcon sx={{ fontSize: 18, color: '#16a34a' }} />
                                  </Box>
                                )}
                                {availability === 'unavailable' && (
                                  <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', bgcolor: '#fee2e2' }}>
                                    <ClearIcon sx={{ fontSize: 18, color: '#dc2626' }} />
                                  </Box>
                                )}
                                {!availability && attendee.responded && (
                                  <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', bgcolor: '#f3f4f6' }}>
                                    <RemoveIcon sx={{ fontSize: 18, color: '#9ca3af' }} />
                                  </Box>
                                )}
                                {!availability && !attendee.responded && (
                                  <Box sx={{ width: 32, height: 32 }} />
                                )}
                              </TableCell>
                            );
                          })}
                          <TableCell align="center" sx={{ borderBottom: '1px solid #f3f4f6' }}>
                            {!attendee.responded && (
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<EmailIcon />}
                                sx={{ textTransform: 'none', minWidth: 80 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  alert(`Nudging ${getAttendeeDisplayName(attendee)}`);
                                }}
                              >
                                Nudge
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Box>
            </Box>

            {/* Fixed Modal Footer */}
            <Box sx={{ p: 3, borderTop: '1px solid #e5e7eb', bgcolor: '#fafbfc', flexShrink: 0 }}>
              <Stack direction="row" spacing={1.5}>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  sx={{ textTransform: 'none', flex: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<EmailIcon />}
                  sx={{ textTransform: 'none', flex: 1 }}
                >
                  Send Reminder
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<CloseIcon />}
                  sx={{ textTransform: 'none', flex: 1 }}
                >
                  Close Meeting
                </Button>
              </Stack>
            </Box>
          </Box>
        </Modal>
      )}

      {/* Confirmation Modal for Send Invite */}
      {confirmInviteMeeting && (
        <Modal
          open={true}
          onClose={() => setConfirmInviteMeeting(null)}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: 500 },
              bgcolor: 'background.paper',
              borderRadius: '12px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              p: 4,
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <CheckCircleIcon sx={{ fontSize: 56, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                Send Meeting Invitation?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                You're about to send invitations for:
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                {confirmInviteMeeting.title}
              </Typography>
              <Box
                sx={{
                  p: 3,
                  bgcolor: '#f0f9ff',
                  border: '2px solid #3b82f6',
                  borderRadius: '12px',
                  mb: 2,
                }}
              >
                <Typography variant="caption" color="primary" sx={{ display: 'block', mb: 1, fontWeight: 600 }}>
                  Selected Time
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e40af', mb: 0.5 }}>
                  {confirmInviteMeeting.winningTime.day} @ {confirmInviteMeeting.winningTime.time}
                </Typography>
                <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                  {confirmInviteMeeting.winningTime.votes}/{confirmInviteMeeting.totalAttendees} attendees available
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Calendar invitations will be sent to all {confirmInviteMeeting.totalAttendees} attendees.
              </Typography>
            </Box>
            <Stack spacing={1.5}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{ textTransform: 'none', minHeight: '48px' }}
                onClick={() => {
                  // Handle send invite logic here
                  setConfirmInviteMeeting(null);
                }}
              >
                Confirm & Send Invitations
              </Button>
              <Button
                variant="outlined"
                fullWidth
                size="large"
                sx={{ textTransform: 'none', minHeight: '48px' }}
                onClick={() => setConfirmInviteMeeting(null)}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </Modal>
      )}
    </Box>
  );
}
