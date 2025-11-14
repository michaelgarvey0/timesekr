'use client';

import { Box, Typography, Button, Avatar, Card, CardContent, Chip, Stack, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tabs, Tab, LinearProgress, AvatarGroup, Modal, IconButton, Divider, Table, TableHead, TableBody, TableRow, TableCell, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
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
import MeetingDetailsModal from './MeetingDetailsModal';
import InviteeResponseForm from './InviteeResponseForm';

// DESIGN OPTION 3: Sidebar Navigation
// Left sidebar navigation with main content area

const SIDEBAR_WIDTH = 240;

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
    winningTime: { id: 1, day: 'Thu, Jan 18', time: '2:00 PM', endTime: '3:00 PM', votes: 4 },
    proposedTimes: [
      { id: 1, day: 'Thu, Jan 18', time: '2:00 PM', endTime: '3:00 PM', votes: 4 },
      { id: 2, day: 'Fri, Jan 19', time: '10:00 AM', endTime: '11:00 AM', votes: 2 },
      { id: 3, day: 'Fri, Jan 19', time: '3:00 PM', endTime: '4:00 PM', votes: 1 },
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
    winningTime: { id: 1, day: 'Mon, Jan 15', time: '10:00 AM', endTime: '11:00 AM', votes: 5 },
    proposedTimes: [
      { id: 1, day: 'Mon, Jan 15', time: '10:00 AM', endTime: '11:00 AM', votes: 5 },
      { id: 2, day: 'Mon, Jan 15', time: '2:00 PM', endTime: '3:00 PM', votes: 3 },
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
    winningTime: { id: 1, day: 'Wed, Jan 17', time: '3:00 PM', endTime: '4:00 PM', votes: 3 },
    proposedTimes: [
      { id: 1, day: 'Wed, Jan 17', time: '3:00 PM', endTime: '4:00 PM', votes: 3 },
      { id: 2, day: 'Thu, Jan 18', time: '11:00 AM', endTime: '12:00 PM', votes: 2 },
      { id: 3, day: 'Thu, Jan 18', time: '4:00 PM', endTime: '5:00 PM', votes: 1 },
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

export default function DesignOption3({ cardView = 'detailed', viewMode = 'organizer', isMobile = false }: { cardView?: 'detailed' | 'compact'; viewMode?: 'organizer' | 'invitee'; isMobile?: boolean }) {
  const [selectedSection, setSelectedSection] = useState('meetings');
  const [selectedMeeting, setSelectedMeeting] = useState<typeof mockOrganizingMeetings[0] | null>(null);
  const [confirmInviteMeeting, setConfirmInviteMeeting] = useState<typeof mockOrganizingMeetings[0] | null>(null);

  // Invitee response state
  const [inviteeResponses, setInviteeResponses] = useState<{ [meetingId: number]: { [timeId: number]: boolean } }>({});
  const [cannotMakeAny, setCannotMakeAny] = useState<{ [meetingId: number]: boolean }>({});
  const [submittedMeetings, setSubmittedMeetings] = useState<{ [meetingId: number]: boolean }>({});
  const [editMode, setEditMode] = useState<{ [meetingId: number]: boolean }>({});

  // Helper functions for attendee display (used in card avatars)
  const getAttendeeInitials = (attendee: any) => {
    if (attendee.onPlatform && attendee.firstName && attendee.lastName) {
      return `${attendee.firstName[0]}${attendee.lastName[0]}`;
    }
    return attendee.email ? attendee.email[0].toUpperCase() : '?';
  };

  const handleInviteeResponse = (meetingId: number, timeId: number, checked: boolean) => {
    setInviteeResponses(prev => ({
      ...prev,
      [meetingId]: {
        ...(prev[meetingId] || {}),
        [timeId]: checked
      }
    }));
    if (cannotMakeAny[meetingId]) {
      setCannotMakeAny(prev => ({ ...prev, [meetingId]: false }));
    }
  };

  const handleCannotMakeAny = (meetingId: number, checked: boolean) => {
    setCannotMakeAny(prev => ({ ...prev, [meetingId]: checked }));
    if (checked) {
      setInviteeResponses(prev => ({ ...prev, [meetingId]: {} }));
    }
  };

  const handleSubmitResponse = (meeting: any) => {
    console.log('Submitting response for meeting:', meeting.id, {
      responses: inviteeResponses[meeting.id],
      cannotMakeAny: cannotMakeAny[meeting.id]
    });
    setSubmittedMeetings(prev => ({ ...prev, [meeting.id]: true }));
    setEditMode(prev => ({ ...prev, [meeting.id]: false }));
  };

  // Compact Card Renderer
  const renderCompactCard = (meeting: any) => {
    return (
      <Card
        key={meeting.id}
        sx={{
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transform: 'translateY(-1px)',
          }
        }}
        onClick={() => viewMode === 'organizer' ? setSelectedMeeting(meeting) : undefined}
      >
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
            {/* Left: Title + Status */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {meeting.title}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  label={viewMode === 'invitee' && submittedMeetings[meeting.id] ? 'Responded' : meeting.status}
                  color={viewMode === 'invitee' && submittedMeetings[meeting.id] ? 'success' : meeting.statusColor as any}
                  size="small"
                  sx={{ fontWeight: 600, height: 20, fontSize: '0.7rem' }}
                />
                {viewMode === 'invitee' && 'organizer' in meeting && (
                  <Typography variant="caption" color="text.secondary">
                    {(meeting as typeof mockInvitedMeetings[0]).organizer}
                  </Typography>
                )}
              </Stack>
            </Box>

            {/* Middle: Key Info */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                {meeting.winningTime.day}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {meeting.winningTime.time} - {meeting.winningTime.endTime}
              </Typography>
            </Box>

            {/* Right: Quick Action */}
            <Box>
              <Button
                variant="contained"
                size="small"
                sx={{ textTransform: 'none', minWidth: 80 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (viewMode === 'organizer') {
                    setConfirmInviteMeeting(meeting);
                  } else {
                    setSelectedMeeting(meeting);
                  }
                }}
              >
                {viewMode === 'organizer' ? 'Send' : 'Respond'}
              </Button>
            </Box>
          </Box>

          {/* Response progress indicator */}
          {viewMode === 'organizer' && (
            <Box sx={{ mt: 1.5 }}>
              <LinearProgress
                variant="determinate"
                value={(meeting.responded / meeting.totalAttendees) * 100}
                sx={{
                  height: 4,
                  borderRadius: 1,
                  bgcolor: '#e5e7eb',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: meeting.status === 'Ready' ? '#22c55e' : '#f59e0b',
                  }
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                {meeting.responded}/{meeting.totalAttendees} responded
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      height: isMobile ? '100%' : 'auto',
      minHeight: isMobile ? undefined : '100vh',
    }}>
      {/* Left Sidebar - Desktop Only */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: SIDEBAR_WIDTH,
              boxSizing: 'border-box',
              borderRight: '1px solid #e5e7eb',
            },
          }}
        >
          {/* Logo */}
          <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb' }}>
            <Image src="/images/logomark.svg" alt="timesēkr" width={120} height={32} priority />
          </Box>

          {/* New Meeting Button */}
          {viewMode === 'organizer' && (
            <Box sx={{ px: 2, py: 2 }}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<EventIcon />}
                sx={{ textTransform: 'none', py: 1.5 }}
              >
                New Meeting
              </Button>
            </Box>
          )}

          {/* Navigation */}
          <List sx={{ px: 2, flex: 1 }}>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                selected={selectedSection === 'meetings'}
                onClick={() => setSelectedSection('meetings')}
                sx={{ borderRadius: '8px' }}
              >
                <ListItemIcon><EventIcon /></ListItemIcon>
                <ListItemText primary="Meetings" />
                <Chip label="3" size="small" color="error" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                selected={selectedSection === 'people'}
                onClick={() => setSelectedSection('people')}
                sx={{ borderRadius: '8px' }}
              >
                <ListItemIcon><ContactsIcon /></ListItemIcon>
                <ListItemText primary="People" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                selected={selectedSection === 'availability'}
                onClick={() => setSelectedSection('availability')}
                sx={{ borderRadius: '8px' }}
              >
                <ListItemIcon><AccessTimeIcon /></ListItemIcon>
                <ListItemText primary="My Time" />
              </ListItemButton>
            </ListItem>
          </List>

          {/* User Profile at Bottom */}
          <Box sx={{ p: 2, borderTop: '1px solid #e5e7eb' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>M</Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
                  Michael Garvey
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  michael@example.com
                </Typography>
              </Box>
            </Box>
          </Box>
        </Drawer>
      )}

      {/* Mobile Top Header */}
      {isMobile && (
        <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e5e7eb', flexShrink: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5 }}>
            <Image src="/images/logomark.svg" alt="timesēkr" width={100} height={27} priority />
            <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontSize: '0.875rem' }}>M</Avatar>
          </Box>
        </Box>
      )}

      {/* Main Content */}
      <Box sx={{
        flex: 1,
        bgcolor: '#fafbfc',
        overflow: isMobile ? 'auto' : undefined,
      }}>
        <Box sx={{ maxWidth: isMobile ? '100%' : 800, mx: 'auto', px: isMobile ? 2 : 3, py: isMobile ? 2 : 4 }}>
          {/* Section: Meetings */}
          {selectedSection === 'meetings' && (
            <Box>
              <Typography variant={isMobile ? 'h6' : 'h4'} sx={{ fontWeight: 700, mb: isMobile ? 2 : 3 }}>
                Meetings
              </Typography>

              <Stack spacing={2}>
                {(viewMode === 'organizer' ? mockOrganizingMeetings : mockInvitedMeetings).map((meeting) =>
                  cardView === 'compact' ? renderCompactCard(meeting) : (
                  <Card
                    key={meeting.id}
                    sx={{
                      cursor: viewMode === 'organizer' ? 'pointer' : 'default',
                      transition: 'all 0.2s',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
                      '&:hover': viewMode === 'organizer' ? {
                        boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.3)',
                        transform: 'translateY(-2px)',
                      } : {}
                    }}
                    onClick={viewMode === 'organizer' ? () => setSelectedMeeting(meeting) : undefined}
                  >
                    <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                      {/* Status Chip at Top Left + Avatars at Top Right */}
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                        <Chip
                          label={viewMode === 'invitee' && submittedMeetings[meeting.id] ? 'Responded' : meeting.status}
                          color={viewMode === 'invitee' && submittedMeetings[meeting.id] ? 'success' : meeting.statusColor as any}
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                        {viewMode === 'organizer' && (
                          <AvatarGroup max={6} sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: '0.875rem', bgcolor: 'primary.main' } }}>
                            {meeting.attendees.map((attendee, idx) => (
                              <Avatar key={idx} sx={{ bgcolor: attendee.onPlatform ? 'primary.main' : '#94a3b8' }}>
                                {getAttendeeInitials(attendee)}
                              </Avatar>
                            ))}
                          </AvatarGroup>
                        )}
                      </Box>

                      {/* Title */}
                      <Box sx={{ mb: 2.5 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {meeting.title}
                        </Typography>
                        <Stack direction="row" spacing={2}>
                          {viewMode === 'invitee' && 'organizer' in meeting && (
                            <Typography variant="body2" color="text.secondary">
                              Organized by {(meeting as typeof mockInvitedMeetings[0]).organizer}
                            </Typography>
                          )}
                          {viewMode === 'organizer' && (
                            <Typography variant="body2" color="text.secondary">
                              <GroupsIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                              {meeting.totalAttendees} attendees
                            </Typography>
                          )}
                        </Stack>
                      </Box>

                      {viewMode === 'organizer' ? (
                        <>

                          {/* Proposed Times (Read-only for organizer) */}
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
                                      {time.day}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: isWinningTime ? 600 : 500, mb: 0.25, color: isWinningTime ? '#1e40af' : 'inherit' }}>
                                      {time.time} - {time.endTime}
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
                        </>
                      ) : (
                        <InviteeResponseForm
                          meeting={meeting}
                          inviteeResponses={inviteeResponses[meeting.id] || {}}
                          cannotMakeAny={cannotMakeAny[meeting.id] || false}
                          isSubmitted={submittedMeetings[meeting.id] || false}
                          isEditing={editMode[meeting.id] || !submittedMeetings[meeting.id]}
                          onResponseChange={(timeId, checked) => handleInviteeResponse(meeting.id, timeId, checked)}
                          onCannotMakeAnyChange={(checked) => handleCannotMakeAny(meeting.id, checked)}
                          onEdit={() => setEditMode(prev => ({ ...prev, [meeting.id]: true }))}
                          onSubmit={() => handleSubmitResponse(meeting)}
                        />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Box>
          )}

          {/* Section: People */}
          {selectedSection === 'people' && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  People
                </Typography>
                <Button variant="contained">Add Person</Button>
              </Box>
              <Stack spacing={2}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: '#3b82f6', width: 48, height: 48 }}>S</Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>Sarah Chen</Typography>
                        <Typography variant="body2" color="text.secondary">sarah@company.com</Typography>
                      </Box>
                      <Chip label="Connected" size="small" color="success" />
                    </Box>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: '#8b5cf6', width: 48, height: 48 }}>D</Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>David Kim</Typography>
                        <Typography variant="body2" color="text.secondary">david@startup.io</Typography>
                      </Box>
                      <Chip label="Connected" size="small" color="success" />
                    </Box>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: '#f59e0b', width: 48, height: 48 }}>E</Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>Emma Wilson</Typography>
                        <Typography variant="body2" color="text.secondary">emma@enterprise.com</Typography>
                      </Box>
                      <Chip label="Connected" size="small" color="success" />
                    </Box>
                  </CardContent>
                </Card>
              </Stack>
            </Box>
          )}

          {/* Section: My Time / Availability */}
          {selectedSection === 'availability' && (
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
                My Availability
              </Typography>
              <Card>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <CalendarTodayIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    No Calendar Connected
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Connect your calendar to automatically manage your availability and sync meetings
                  </Typography>
                  <Button variant="contained" startIcon={<CalendarTodayIcon />} sx={{ textTransform: 'none' }}>
                    Connect Google Calendar
                  </Button>
                </CardContent>
              </Card>
            </Box>
          )}
        </Box>
      </Box>

      {/* Mobile Bottom Tab Bar */}
      {isMobile && (
        <Box sx={{ bgcolor: 'white', borderTop: '1px solid #e5e7eb', flexShrink: 0 }}>
          <List sx={{ display: 'flex', p: 0 }}>
            <ListItemButton
              selected={selectedSection === 'meetings'}
              onClick={() => setSelectedSection('meetings')}
              sx={{ flex: 1, flexDirection: 'column', py: 1.5, minHeight: 64 }}
            >
              <EventIcon sx={{ fontSize: 24, mb: 0.5 }} />
              <Typography variant="caption">Meetings</Typography>
            </ListItemButton>
            <ListItemButton
              selected={selectedSection === 'people'}
              onClick={() => setSelectedSection('people')}
              sx={{ flex: 1, flexDirection: 'column', py: 1.5, minHeight: 64 }}
            >
              <ContactsIcon sx={{ fontSize: 24, mb: 0.5 }} />
              <Typography variant="caption">People</Typography>
            </ListItemButton>
            <ListItemButton
              selected={selectedSection === 'availability'}
              onClick={() => setSelectedSection('availability')}
              sx={{ flex: 1, flexDirection: 'column', py: 1.5, minHeight: 64 }}
            >
              <AccessTimeIcon sx={{ fontSize: 24, mb: 0.5 }} />
              <Typography variant="caption">My Time</Typography>
            </ListItemButton>
          </List>
        </Box>
      )}

      {/* Floating Action Button - Mobile */}
      {isMobile && viewMode === 'organizer' && (
        <Box sx={{ position: 'fixed', bottom: 80, right: 16, zIndex: 1000 }}>
          <Button
            variant="contained"
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              minWidth: 'unset',
              p: 0,
              boxShadow: 3,
            }}
          >
            <EventIcon />
          </Button>
        </Box>
      )}

      {/* Meeting Details Modal */}
      {selectedMeeting && viewMode === 'organizer' && (
        <MeetingDetailsModal
          meeting={selectedMeeting}
          onClose={() => setSelectedMeeting(null)}
        />
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
                  {confirmInviteMeeting.winningTime.day}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e40af', mb: 0.5 }}>
                  {confirmInviteMeeting.winningTime.time} - {confirmInviteMeeting.winningTime.endTime}
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
