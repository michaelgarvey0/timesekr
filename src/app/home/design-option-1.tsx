'use client';

import { Box, Typography, Button, Tabs, Tab, AppBar, Toolbar, IconButton, Avatar, Card, CardContent, Chip, Stack, LinearProgress, AvatarGroup, Modal, Divider, List, ListItem, ListItemText } from '@mui/material';
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
      { name: 'Sarah Chen', avatar: 'SC', responded: true },
      { name: 'David Kim', avatar: 'DK', responded: true },
      { name: 'Emma Wilson', avatar: 'EW', responded: true },
      { name: 'James Rodriguez', avatar: 'JR', responded: false },
      { name: 'Lisa Anderson', avatar: 'LA', responded: true },
      { name: 'Michael Brown', avatar: 'MB', responded: false },
      { name: 'Sophie Taylor', avatar: 'ST', responded: true },
      { name: 'Robert Lee', avatar: 'RL', responded: false },
      { name: 'Amanda White', avatar: 'AW', responded: true },
      { name: 'Chris Martin', avatar: 'CM', responded: false },
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
      { name: 'Sarah Chen', avatar: 'SC', responded: true },
      { name: 'David Kim', avatar: 'DK', responded: true },
      { name: 'Emma Wilson', avatar: 'EW', responded: true },
      { name: 'James Rodriguez', avatar: 'JR', responded: true },
      { name: 'Lisa Anderson', avatar: 'LA', responded: true },
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
      { name: 'Sarah Chen', avatar: 'SC', responded: true },
      { name: 'David Kim', avatar: 'DK', responded: true },
      { name: 'Emma Wilson', avatar: 'EW', responded: true },
      { name: 'James Rodriguez', avatar: 'JR', responded: false },
      { name: 'Lisa Anderson', avatar: 'LA', responded: true },
      { name: 'Michael Brown', avatar: 'MB', responded: false },
      { name: 'Sophie Taylor', avatar: 'ST', responded: true },
      { name: 'Robert Lee', avatar: 'RL', responded: false },
    ]
  },
];

export default function DesignOption1() {
  const [currentTab, setCurrentTab] = useState(0);
  const [viewMode, setViewMode] = useState<'organizer' | 'invitee'>('organizer');
  const [selectedMeeting, setSelectedMeeting] = useState<typeof mockOrganizingMeetings[0] | null>(null);
  const [confirmInviteMeeting, setConfirmInviteMeeting] = useState<typeof mockOrganizingMeetings[0] | null>(null);

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
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    '&:hover': {
                      boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)',
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
                          <Avatar key={idx}>
                            {attendee.avatar}
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
              width: { xs: '90%', sm: 600 },
              maxHeight: '90vh',
              overflow: 'auto',
              bgcolor: 'background.paper',
              borderRadius: '12px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
          >
            {/* Modal Header */}
            <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
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

            {/* Proposed Times */}
            <Box sx={{ p: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                Proposed Times
              </Typography>
              <Stack spacing={1.5}>
                {selectedMeeting.proposedTimes.map((time) => (
                  <Box
                    key={time.id}
                    sx={{
                      p: 2,
                      bgcolor: time.id === selectedMeeting.winningTime.id ? '#f0f9ff' : '#f8fafc',
                      border: time.id === selectedMeeting.winningTime.id ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {time.day} @ {time.time}
                      </Typography>
                      {time.id === selectedMeeting.winningTime.id && (
                        <Chip
                          icon={<ThumbUpIcon />}
                          label="Winning"
                          size="small"
                          color="primary"
                          sx={{ mt: 0.5, height: 20, fontSize: '0.75rem' }}
                        />
                      )}
                    </Box>
                    <Chip
                      label={`${time.votes} votes`}
                      size="small"
                      sx={{
                        bgcolor: time.id === selectedMeeting.winningTime.id ? '#3b82f6' : '#e5e7eb',
                        color: time.id === selectedMeeting.winningTime.id ? 'white' : 'text.secondary',
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Box>

            <Divider />

            {/* Attendees */}
            <Box sx={{ p: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                Attendees ({selectedMeeting.totalAttendees})
              </Typography>
              <List sx={{ p: 0 }}>
                {selectedMeeting.attendees.map((attendee, idx) => (
                  <ListItem
                    key={idx}
                    sx={{
                      px: 0,
                      py: 1,
                      borderBottom: idx < selectedMeeting.attendees.length - 1 ? '1px solid #f3f4f6' : 'none',
                    }}
                  >
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 36, height: 36 }}>
                      {attendee.avatar}
                    </Avatar>
                    <ListItemText
                      primary={
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {attendee.name}
                        </Typography>
                      }
                    />
                    <Chip
                      icon={attendee.responded ? <CheckCircleIcon /> : <HourglassEmptyIcon />}
                      label={attendee.responded ? 'Responded' : 'Pending'}
                      size="small"
                      color={attendee.responded ? 'success' : 'warning'}
                      sx={{ minWidth: 100 }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Modal Actions */}
            <Box sx={{ p: 3, borderTop: '1px solid #e5e7eb', bgcolor: '#fafbfc' }}>
              <Stack spacing={1.5}>
                {selectedMeeting.status === 'Ready' && (
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    startIcon={<CheckCircleIcon />}
                    sx={{ textTransform: 'none' }}
                  >
                    Send Invitations
                  </Button>
                )}
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<EditIcon />}
                    sx={{ textTransform: 'none' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<EmailIcon />}
                    sx={{ textTransform: 'none' }}
                  >
                    Send Reminder
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    color="error"
                    startIcon={<CloseIcon />}
                    sx={{ textTransform: 'none' }}
                  >
                    Close Meeting
                  </Button>
                </Stack>
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
