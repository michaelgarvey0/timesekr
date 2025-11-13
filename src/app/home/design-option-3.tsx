'use client';

import { Box, Typography, Button, Avatar, Card, CardContent, Chip, Stack, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tabs, Tab, LinearProgress, AvatarGroup, Modal, IconButton, Divider } from '@mui/material';
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
import Image from 'next/image';
import { useState } from 'react';

// DESIGN OPTION 3: Sidebar Navigation
// Left sidebar navigation with main content area

const SIDEBAR_WIDTH = 240;

// Mock data for meetings
const mockOrganizingMeetings = [
  {
    id: 1,
    title: 'Q2 Strategy Planning',
    totalAttendees: 10,
    responded: 6,
    pending: 4,
    status: 'In Progress',
    statusColor: 'warning',
    winningTime: { id: 1, day: 'Thu, Jan 18', time: '2:00 PM', votes: 4 },
    proposedTimes: [
      { id: 1, day: 'Thu, Jan 18', time: '2:00 PM', votes: 4 },
      { id: 2, day: 'Fri, Jan 19', time: '10:00 AM', votes: 2 },
      { id: 3, day: 'Fri, Jan 19', time: '3:00 PM', votes: 1 },
    ],
    attendees: [
      { name: 'Sarah Chen', avatar: 'S', color: '#3b82f6', responded: true },
      { name: 'David Kim', avatar: 'D', color: '#8b5cf6', responded: true },
      { name: 'Emma Wilson', avatar: 'E', color: '#f59e0b', responded: true },
      { name: 'James Rodriguez', avatar: 'J', color: '#ef4444', responded: false },
      { name: 'Lisa Anderson', avatar: 'L', color: '#10b981', responded: true },
      { name: 'Michael Brown', avatar: 'M', color: '#06b6d4', responded: false },
      { name: 'Sophie Taylor', avatar: 'S', color: '#8b5cf6', responded: true },
      { name: 'Robert Lee', avatar: 'R', color: '#f97316', responded: false },
      { name: 'Amanda White', avatar: 'A', color: '#ec4899', responded: true },
      { name: 'Chris Martin', avatar: 'C', color: '#6366f1', responded: false },
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
      { name: 'Sarah Chen', avatar: 'S', color: '#3b82f6', responded: true },
      { name: 'David Kim', avatar: 'D', color: '#8b5cf6', responded: true },
      { name: 'Emma Wilson', avatar: 'E', color: '#f59e0b', responded: true },
      { name: 'James Rodriguez', avatar: 'J', color: '#ef4444', responded: true },
      { name: 'Lisa Anderson', avatar: 'L', color: '#10b981', responded: true },
    ]
  },
];

export default function DesignOption3() {
  const [selectedSection, setSelectedSection] = useState('meetings');
  const [meetingsTab, setMeetingsTab] = useState(0); // 0 = organizing, 1 = invited
  const [selectedMeeting, setSelectedMeeting] = useState<typeof mockOrganizingMeetings[0] | null>(null);

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
          },
        }}
      >
        {/* Logo */}
        <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb' }}>
          <Image src="/images/logomark.svg" alt="timesēkr" width={120} height={32} priority />
        </Box>

        {/* New Meeting Button */}
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
              selected={selectedSection === 'contacts'}
              onClick={() => setSelectedSection('contacts')}
              sx={{ borderRadius: '8px' }}
            >
              <ListItemIcon><ContactsIcon /></ListItemIcon>
              <ListItemText primary="Contacts" />
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

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, bgcolor: '#fafbfc' }}>
        <Box sx={{ maxWidth: 800, mx: 'auto', px: 3, py: 4 }}>
          {/* Section: Meetings */}
          {selectedSection === 'meetings' && (
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                Meetings
              </Typography>

              {/* Meetings Tabs */}
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={meetingsTab} onChange={(e, v) => setMeetingsTab(v)}>
                  <Tab
                    icon={<GroupsIcon />}
                    iconPosition="start"
                    label="Organizing"
                    sx={{ textTransform: 'none', minHeight: 56 }}
                  />
                  <Tab
                    icon={<EventIcon />}
                    iconPosition="start"
                    label="Invited To"
                    sx={{ textTransform: 'none', minHeight: 56 }}
                  />
                </Tabs>
              </Box>

              {/* Tab: Organizing */}
              {meetingsTab === 0 && (
                <Stack spacing={2}>
                  {mockOrganizingMeetings.map((meeting) => (
                    <Card
                      key={meeting.id}
                      sx={{
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': {
                          boxShadow: 3,
                          transform: 'translateY(-2px)',
                        }
                      }}
                      onClick={() => setSelectedMeeting(meeting)}
                    >
                      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1.5 }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {meeting.title}
                            </Typography>
                            <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                <GroupsIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                                {meeting.totalAttendees} attendees
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {meeting.responded}/{meeting.totalAttendees} responded
                              </Typography>
                            </Stack>
                          </Box>
                          <Chip
                            label={meeting.status}
                            color={meeting.statusColor as any}
                            sx={{ fontWeight: 600 }}
                          />
                        </Box>

                        {/* Progress Bar */}
                        <Box sx={{ mb: 1.5 }}>
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

                        {/* Winning Time */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                          <Box sx={{ p: 1.25, bgcolor: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd', flex: 1, mr: 2 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                              <ThumbUpIcon sx={{ fontSize: 12, verticalAlign: 'middle', mr: 0.5 }} />
                              Winning Time ({meeting.winningTime.votes} votes)
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {meeting.winningTime.day} @ {meeting.winningTime.time}
                            </Typography>
                          </Box>
                          <AvatarGroup max={6} sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: '0.875rem' } }}>
                            {meeting.attendees.map((attendee, idx) => (
                              <Avatar
                                key={idx}
                                sx={{
                                  bgcolor: attendee.color,
                                  opacity: attendee.responded ? 1 : 0.4,
                                }}
                              >
                                {attendee.avatar}
                              </Avatar>
                            ))}
                          </AvatarGroup>
                        </Box>

                        {meeting.pending > 0 && (
                          <Chip
                            icon={<HourglassEmptyIcon />}
                            label={`${meeting.pending} pending`}
                            size="small"
                            color="warning"
                            variant="outlined"
                          />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              )}

              {/* Tab: Invited To */}
              {meetingsTab === 1 && (
                <Stack spacing={2}>
                  <Card sx={{ border: '2px solid #fbbf24', bgcolor: '#fffbeb' }}>
                    <CardContent>
                      <Chip label="Action Required" color="warning" size="small" sx={{ mb: 2 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        Design Review
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Organized by Sarah Chen • 3 time options • Due tomorrow
                      </Typography>
                      <Button variant="contained" size="small">
                        Respond Now
                      </Button>
                    </CardContent>
                  </Card>
                </Stack>
              )}
            </Box>
          )}

          {/* Section: Contacts */}
          {selectedSection === 'contacts' && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  Contacts & Connections
                </Typography>
                <Button variant="contained">Add Contact</Button>
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
              boxShadow: 24,
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
                    <Avatar sx={{ bgcolor: attendee.color, mr: 2, width: 36, height: 36 }}>
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
                    Confirm & Send Invitations
                  </Button>
                )}
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<EditIcon />}
                    sx={{ textTransform: 'none' }}
                  >
                    Edit Meeting
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<EmailIcon />}
                    sx={{ textTransform: 'none' }}
                  >
                    Send Reminder
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Modal>
      )}
    </Box>
  );
}
