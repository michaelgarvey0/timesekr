'use client';

import { Box, Typography, Button, Grid, AppBar, Toolbar, IconButton, Menu, MenuItem, Chip, LinearProgress, Avatar, Divider, Badge, Stack } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import ContactsIcon from '@mui/icons-material/Contacts';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import WarningIcon from '@mui/icons-material/Warning';
import SendIcon from '@mui/icons-material/Send';
import GroupsIcon from '@mui/icons-material/Groups';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Participant status types
type ParticipantStatus =
  | 'on_platform_calendar_shared'    // ✅ On platform • Calendar shared
  | 'on_platform_responded_manually' // ✅ On platform • Responded manually
  | 'on_platform_not_responded'      // ⏰ On platform • Not responded yet
  | 'invite_sent_not_on_platform'    // 📧 Invite sent • Not on platform
  | 'not_invited_yet';               // ❌ Haven't invited yet

interface Participant {
  name: string;
  status: ParticipantStatus;
  avatar?: string;
}

// 1. ACTION REQUIRED - High Priority
const actionRequired = [
  {
    id: 'action-1',
    type: 'needs_your_response',
    title: 'Weekly Team Standup',
    organizer: 'Sarah Chen',
    deadline: 'Respond by Tomorrow',
    responded: 4,
    total: 6,
    needsCalendarAccess: false,
    suggestedTimes: ['Mon Jan 15 @ 10:00 AM', 'Mon Jan 15 @ 2:00 PM', 'Tue Jan 16 @ 9:00 AM'],
  },
  {
    id: 'action-2',
    type: 'needs_calendar_permission',
    title: 'Q2 Budget Review',
    organizer: 'Mike Thompson',
    deadline: 'Respond by Jan 18',
    responded: 2,
    total: 5,
    needsCalendarAccess: true,
    message: 'Mike is requesting access to see your calendar availability',
  },
  {
    id: 'action-3',
    type: 'add_to_contacts',
    title: 'Product Demo Request',
    organizer: 'Jane Wilson (Acme Corp)',
    mutualConnections: 3,
    message: 'Jane wants to schedule a demo. Add to contacts to share availability?',
    isNewContact: true,
  },
  {
    id: 'action-4',
    type: 'confirm_final_time',
    title: 'Marketing Strategy Session',
    organizer: 'You',
    quorumReached: true,
    winningTime: 'Wed Jan 17 @ 3:00 PM',
    confirmedCount: 5,
    total: 7,
    message: 'Enough people are available! Click to confirm and send calendar invites.',
  },
];

// 2. OUTGOING REQUESTS - You Organized
const outgoingRequests = [
  {
    id: 'out-1',
    type: 'fully_coordinated',
    title: 'Engineering All-Hands',
    total: 8,
    onPlatform: 8,
    calendarShared: 8,
    responded: 8,
    status: 'optimal',
    message: 'Found 3 times that work for everyone!',
    bestTimes: [
      { time: 'Thu Jan 18 @ 10:00 AM', works: 8 },
      { time: 'Fri Jan 19 @ 2:00 PM', works: 8 },
      { time: 'Mon Jan 22 @ 11:00 AM', works: 8 },
    ],
    participants: [
      { name: 'Alice Johnson', status: 'on_platform_calendar_shared' as ParticipantStatus },
      { name: 'Bob Smith', status: 'on_platform_calendar_shared' as ParticipantStatus },
      { name: 'Carol White', status: 'on_platform_calendar_shared' as ParticipantStatus },
      { name: 'Dave Brown', status: 'on_platform_calendar_shared' as ParticipantStatus },
      { name: 'Eve Davis', status: 'on_platform_calendar_shared' as ParticipantStatus },
      { name: 'Frank Miller', status: 'on_platform_calendar_shared' as ParticipantStatus },
      { name: 'Grace Lee', status: 'on_platform_calendar_shared' as ParticipantStatus },
      { name: 'Henry Taylor', status: 'on_platform_calendar_shared' as ParticipantStatus },
    ],
  },
  {
    id: 'out-2',
    type: 'waiting_on_responses',
    title: 'HOA Board Discussion',
    total: 8,
    onPlatform: 5,
    calendarShared: 3,
    responded: 4,
    status: 'mixed',
    message: 'Partial responses - some people still need to respond',
    timeOptions: [
      { time: 'Tue Jan 16 @ 7:00 PM', votes: 3, canWork: 5 },
      { time: 'Wed Jan 17 @ 7:30 PM', votes: 2, canWork: 4 },
      { time: 'Thu Jan 18 @ 6:00 PM', votes: 1, canWork: 3 },
    ],
    participants: [
      { name: 'John Smith', status: 'on_platform_calendar_shared' as ParticipantStatus },
      { name: 'Jane Doe', status: 'on_platform_responded_manually' as ParticipantStatus },
      { name: 'Bob Wilson', status: 'on_platform_not_responded' as ParticipantStatus },
      { name: 'Alice Brown', status: 'invite_sent_not_on_platform' as ParticipantStatus },
      { name: 'Carol Davis', status: 'on_platform_calendar_shared' as ParticipantStatus },
      { name: 'David Evans', status: 'on_platform_not_responded' as ParticipantStatus },
      { name: 'Emma Garcia', status: 'invite_sent_not_on_platform' as ParticipantStatus },
      { name: 'Frank Harris', status: 'on_platform_calendar_shared' as ParticipantStatus },
    ],
  },
  {
    id: 'out-3',
    type: 'cold_start',
    title: 'Neighborhood Watch Meeting',
    total: 12,
    onPlatform: 0,
    calendarShared: 0,
    responded: 0,
    status: 'no_responses',
    message: 'Invites sent - waiting for people to join timesēkr',
    invitesSent: 12,
    invitedDate: '2 days ago',
    participants: [
      { name: 'Tom Anderson', status: 'invite_sent_not_on_platform' as ParticipantStatus },
      { name: 'Lisa Martin', status: 'invite_sent_not_on_platform' as ParticipantStatus },
      { name: 'Mike Thompson', status: 'invite_sent_not_on_platform' as ParticipantStatus },
      { name: 'Sarah Wilson', status: 'invite_sent_not_on_platform' as ParticipantStatus },
      { name: '+ 8 more...', status: 'invite_sent_not_on_platform' as ParticipantStatus },
    ],
  },
  {
    id: 'out-4',
    type: 'waiting_on_responses',
    title: 'Client Presentation',
    total: 4,
    onPlatform: 3,
    calendarShared: 2,
    responded: 3,
    status: 'mostly_ready',
    message: 'Waiting on 1 person',
    timeOptions: [
      { time: 'Mon Jan 15 @ 2:00 PM', votes: 2, canWork: 3 },
      { time: 'Tue Jan 16 @ 3:00 PM', votes: 1, canWork: 2 },
    ],
    participants: [
      { name: 'Robert Chen', status: 'on_platform_calendar_shared' as ParticipantStatus },
      { name: 'Maria Garcia', status: 'on_platform_responded_manually' as ParticipantStatus },
      { name: 'James Wilson', status: 'on_platform_calendar_shared' as ParticipantStatus },
      { name: 'Patricia Moore', status: 'invite_sent_not_on_platform' as ParticipantStatus },
    ],
  },
];

// 3. INCOMING REQUESTS - Others Organized
const incomingRequests = [
  {
    id: 'in-1',
    type: 'auto_confirmed',
    title: '1:1 with Manager',
    organizer: 'Sarah Chen',
    confirmedTime: 'Tomorrow @ 2:00 PM',
    message: 'Automatically added to your calendar',
    calendarAdded: true,
  },
  {
    id: 'in-2',
    type: 'suggested_times',
    title: 'Design Review Session',
    organizer: 'Mike Johnson',
    proposedTimes: [
      { time: 'Wed Jan 17 @ 10:00 AM', worksForYou: true },
      { time: 'Wed Jan 17 @ 2:00 PM', worksForYou: false, conflict: 'Conflicts with "Sprint Planning"' },
      { time: 'Thu Jan 18 @ 11:00 AM', worksForYou: true },
    ],
    needsYourResponse: true,
  },
];

// 4. CONFIRMED & UPCOMING
const confirmedMeetings = [
  {
    id: 'conf-1',
    title: 'Sprint Planning',
    time: 'Today @ 3:00 PM',
    organizer: 'Alex Rivera',
    attendees: 6,
    inMinutes: 180,
  },
  {
    id: 'conf-2',
    title: 'Product Roadmap Review',
    time: 'Tomorrow @ 10:00 AM',
    organizer: 'You',
    attendees: 8,
    inMinutes: 1620,
  },
  {
    id: 'conf-3',
    title: 'Customer Success Meeting',
    time: 'Thu Jan 18 @ 1:00 PM',
    organizer: 'Emily Parker',
    attendees: 4,
    inMinutes: 3900,
  },
];

// 5. NEEDS ATTENTION - Lower Priority
const needsAttention = [
  {
    id: 'attn-1',
    type: 'quorum_not_reached',
    title: 'Optional: Coffee Chat',
    organizer: 'You',
    responded: 2,
    total: 8,
    minRequired: 4,
    message: 'Only 2/8 responded (need 4 minimum)',
  },
  {
    id: 'attn-2',
    type: 'deadline_approaching',
    title: 'Annual Planning Workshop',
    organizer: 'You',
    responded: 3,
    total: 10,
    deadline: 'Deadline in 2 hours',
    message: 'Still waiting on 7 people',
  },
  {
    id: 'attn-3',
    type: 'reschedule_requested',
    title: 'Training Session',
    organizer: 'Linda Martinez',
    originalTime: 'Fri Jan 19 @ 9:00 AM',
    reason: '3 people can no longer make it',
    requestedBy: 'Linda Martinez',
  },
];

const mockRecentActivity = [
  { id: '1', text: 'Sarah responded to Q1 Planning Session', time: '2 hours ago', type: 'response' },
  { id: '2', text: 'Marketing Strategy reached quorum', time: '5 hours ago', type: 'quorum' },
  { id: '3', text: 'New invite: Design Review', time: '1 day ago', type: 'invite' },
  { id: '4', text: 'Mike Thompson joined timesēkr', time: '1 day ago', type: 'joined' },
  { id: '5', text: 'HOA Discussion: 2 new responses', time: '2 days ago', type: 'response' },
];

// Helper function to get status icon and color
const getStatusIcon = (status: ParticipantStatus) => {
  switch (status) {
    case 'on_platform_calendar_shared':
      return { icon: '✅', color: 'success.main', text: 'Calendar shared' };
    case 'on_platform_responded_manually':
      return { icon: '✅', color: 'info.main', text: 'Responded manually' };
    case 'on_platform_not_responded':
      return { icon: '⏰', color: 'warning.main', text: 'Not responded' };
    case 'invite_sent_not_on_platform':
      return { icon: '📧', color: 'text.secondary', text: 'Not on platform' };
    case 'not_invited_yet':
      return { icon: '❌', color: 'error.main', text: 'Not invited' };
  }
};

export default function PopulatedHomePage() {
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
          <Badge badgeContent={actionRequired.length} color="error" sx={{ mr: 2 }}>
            <NotificationsIcon sx={{ color: 'text.secondary' }} />
          </Badge>
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
      <Box sx={{ maxWidth: 1400, width: '100%', mx: 'auto', px: 4, py: 5 }}>
        {/* Hero Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Box>
            <Typography variant="h3" sx={{ mb: 1, fontWeight: 700 }}>
              Welcome back, John 👋
            </Typography>
            <Typography variant="body1" color="text.secondary">
              You have {actionRequired.length} items that need your attention
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            startIcon={<EventIcon />}
            onClick={() => router.push('/meeting/new')}
            sx={{ textTransform: 'none' }}
          >
            Schedule Meeting
          </Button>
        </Box>

        {/* 1. ACTION REQUIRED - Highest Priority */}
        {actionRequired.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <WarningIcon sx={{ color: 'error.main' }} />
              Action Required
              <Chip label={actionRequired.length} size="small" color="error" />
            </Typography>

            {actionRequired.map((item) => (
              <Box
                key={item.id}
                sx={{
                  bgcolor: 'white',
                  borderRadius: '12px',
                  border: '2px solid',
                  borderColor: item.type === 'add_to_contacts' ? 'info.main' : 'error.main',
                  p: 3,
                  mb: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                {item.type === 'needs_your_response' && (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                          <Chip label="Needs Response" size="small" color="error" />
                          <Chip label={item.deadline} size="small" variant="outlined" />
                        </Stack>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          From {item.organizer} • {item.responded}/{item.total} responded
                        </Typography>
                      </Box>
                      <Button variant="contained" color="error" sx={{ textTransform: 'none' }}>
                        Respond Now
                      </Button>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                      Suggested Times:
                    </Typography>
                    {item.suggestedTimes?.map((time, idx) => (
                      <Box key={idx} sx={{ p: 1.5, bgcolor: 'grey.50', borderRadius: '8px', mb: 1 }}>
                        <Typography variant="body2">{time}</Typography>
                      </Box>
                    ))}
                  </>
                )}

                {item.type === 'needs_calendar_permission' && (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                          <Chip icon={<VisibilityIcon />} label="Calendar Access Needed" size="small" color="warning" />
                          <Chip label={item.deadline} size="small" variant="outlined" />
                        </Stack>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          From {item.organizer} • {item.responded}/{item.total} responded
                        </Typography>
                        <Typography variant="body2" sx={{ p: 2, bgcolor: 'warning.50', borderRadius: '8px' }}>
                          {item.message}
                        </Typography>
                      </Box>
                      <Stack spacing={1} sx={{ ml: 2 }}>
                        <Button variant="contained" color="success" size="small" sx={{ textTransform: 'none' }}>
                          Share Calendar
                        </Button>
                        <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                          Respond Manually
                        </Button>
                      </Stack>
                    </Box>
                  </>
                )}

                {item.type === 'add_to_contacts' && (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                          <Chip icon={<PersonAddIcon />} label="New Contact Request" size="small" color="info" />
                          {item.mutualConnections && (
                            <Chip label={`${item.mutualConnections} mutual connections`} size="small" variant="outlined" />
                          )}
                        </Stack>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          From {item.organizer}
                        </Typography>
                        <Typography variant="body2" sx={{ p: 2, bgcolor: 'info.50', borderRadius: '8px' }}>
                          {item.message}
                        </Typography>
                      </Box>
                      <Stack spacing={1} sx={{ ml: 2 }}>
                        <Button variant="contained" color="info" size="small" sx={{ textTransform: 'none' }}>
                          Add & Share
                        </Button>
                        <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                          Decline
                        </Button>
                      </Stack>
                    </Box>
                  </>
                )}

                {item.type === 'confirm_final_time' && (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                          <Chip icon={<CheckCircleIcon />} label="Ready to Confirm!" size="small" color="success" />
                        </Stack>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          Organized by {item.organizer} • {item.confirmedCount}/{item.total} can attend
                        </Typography>
                        <Box sx={{ p: 2, bgcolor: 'success.50', borderRadius: '8px', mb: 2 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.dark' }}>
                            🎉 {item.winningTime}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {item.message}
                        </Typography>
                      </Box>
                      <Button variant="contained" color="success" size="large" sx={{ textTransform: 'none', ml: 2 }}>
                        Confirm & Send Invites
                      </Button>
                    </Box>
                  </>
                )}
              </Box>
            ))}
          </Box>
        )}

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 8 }}>
            {/* 2. OUTGOING REQUESTS - You Organized */}
            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Meetings You're Organizing
              </Typography>

              {outgoingRequests.map((meeting) => (
                <Box
                  key={meeting.id}
                  sx={{
                    bgcolor: 'white',
                    borderRadius: '12px',
                    border: '1px solid',
                    borderColor: meeting.type === 'fully_coordinated' ? 'success.main' :
                                 meeting.type === 'cold_start' ? 'grey.300' : 'warning.main',
                    p: 3,
                    mb: 3,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  }}
                >
                  {/* Header */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {meeting.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {meeting.message}
                      </Typography>
                    </Box>
                    {meeting.type === 'fully_coordinated' && (
                      <Chip icon={<CheckCircleIcon />} label="Optimal!" size="small" color="success" />
                    )}
                    {meeting.type === 'cold_start' && (
                      <Chip icon={<EmailIcon />} label="Cold Start" size="small" />
                    )}
                  </Box>

                  {/* Participation Stats */}
                  <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: '8px' }}>
                    <Stack direction="row" spacing={3}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Participation</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {meeting.responded}/{meeting.total} responded
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">On Platform</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {meeting.onPlatform}/{meeting.total}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Calendar Shared</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {meeting.calendarShared}/{meeting.total}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                  {/* Time Options or Best Times */}
                  {meeting.type === 'fully_coordinated' && meeting.bestTimes && (
                    <>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                        Times that work for everyone:
                      </Typography>
                      {meeting.bestTimes.map((option, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            p: 2,
                            bgcolor: idx === 0 ? 'success.50' : 'grey.50',
                            borderRadius: '8px',
                            mb: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {option.time}
                          </Typography>
                          <Chip label={`${option.works}/${meeting.total} available`} size="small" color="success" />
                        </Box>
                      ))}
                    </>
                  )}

                  {meeting.type === 'waiting_on_responses' && meeting.timeOptions && (
                    <>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                        Leading time options:
                      </Typography>
                      {meeting.timeOptions.map((option, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            p: 2,
                            bgcolor: idx === 0 ? 'primary.50' : 'grey.50',
                            borderRadius: '8px',
                            mb: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {option.time}
                          </Typography>
                          <Stack direction="row" spacing={1}>
                            <Chip label={`${option.votes} votes`} size="small" />
                            <Chip label={`${option.canWork} could work`} size="small" variant="outlined" />
                          </Stack>
                        </Box>
                      ))}
                    </>
                  )}

                  {meeting.type === 'cold_start' && (
                    <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: '8px', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        📧 Invited {meeting.invitesSent} people {meeting.invitedDate}
                      </Typography>
                      <Button size="small" sx={{ mt: 1, textTransform: 'none' }}>
                        Send Reminder
                      </Button>
                    </Box>
                  )}

                  <Divider sx={{ my: 2 }} />

                  {/* Participants List */}
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
                    Participant Status:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {meeting.participants.map((participant, idx) => {
                      const statusInfo = getStatusIcon(participant.status);
                      return (
                        <Box
                          key={idx}
                          sx={{
                            p: 1,
                            pr: 2,
                            bgcolor: 'white',
                            border: '1px solid',
                            borderColor: 'grey.200',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                          }}
                        >
                          <Typography variant="body2">{statusInfo.icon}</Typography>
                          <Typography variant="caption" sx={{ fontWeight: 500 }}>
                            {participant.name}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>

                  <Button variant="text" endIcon={<ArrowForwardIcon />} sx={{ textTransform: 'none' }}>
                    View Details
                  </Button>
                </Box>
              ))}
            </Box>

            {/* 3. INCOMING REQUESTS - Others Organized */}
            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Incoming Requests
              </Typography>

              {incomingRequests.map((meeting) => (
                <Box
                  key={meeting.id}
                  sx={{
                    bgcolor: 'white',
                    borderRadius: '12px',
                    border: '1px solid',
                    borderColor: meeting.type === 'auto_confirmed' ? 'success.main' : 'info.main',
                    p: 3,
                    mb: 2,
                  }}
                >
                  {meeting.type === 'auto_confirmed' && (
                    <>
                      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Chip icon={<CheckCircleIcon />} label="Auto-Confirmed" size="small" color="success" />
                      </Stack>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {meeting.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Organized by {meeting.organizer}
                      </Typography>
                      <Box sx={{ p: 2, bgcolor: 'success.50', borderRadius: '8px', mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.dark' }}>
                          ✅ {meeting.confirmedTime}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {meeting.message}
                      </Typography>
                    </>
                  )}

                  {meeting.type === 'suggested_times' && (
                    <>
                      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Chip label="Needs Your Vote" size="small" color="info" />
                      </Stack>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {meeting.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Organized by {meeting.organizer}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                        Proposed Times:
                      </Typography>
                      {meeting.proposedTimes.map((timeOption, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            p: 2,
                            bgcolor: timeOption.worksForYou ? 'success.50' : 'error.50',
                            borderRadius: '8px',
                            mb: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {timeOption.time}
                            </Typography>
                            {timeOption.conflict && (
                              <Typography variant="caption" color="error.main">
                                {timeOption.conflict}
                              </Typography>
                            )}
                          </Box>
                          {timeOption.worksForYou ? (
                            <CheckCircleIcon sx={{ color: 'success.main' }} />
                          ) : (
                            <WarningIcon sx={{ color: 'error.main' }} />
                          )}
                        </Box>
                      ))}
                      <Button variant="contained" color="info" sx={{ mt: 2, textTransform: 'none' }}>
                        Submit Your Response
                      </Button>
                    </>
                  )}
                </Box>
              ))}
            </Box>

            {/* 5. NEEDS ATTENTION - Lower Priority */}
            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Needs Attention
              </Typography>

              {needsAttention.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    bgcolor: 'white',
                    borderRadius: '12px',
                    border: '1px solid',
                    borderColor: 'grey.300',
                    p: 3,
                    mb: 2,
                  }}
                >
                  {item.type === 'quorum_not_reached' && (
                    <>
                      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Chip icon={<GroupsIcon />} label="Quorum Not Reached" size="small" />
                      </Stack>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Organized by {item.organizer}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.message}
                      </Typography>
                      <Button size="small" sx={{ mt: 2, textTransform: 'none' }}>
                        Send Reminders
                      </Button>
                    </>
                  )}

                  {item.type === 'deadline_approaching' && (
                    <>
                      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Chip icon={<AccessTimeIcon />} label={item.deadline} size="small" color="warning" />
                      </Stack>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Organized by {item.organizer}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.message}
                      </Typography>
                      <Button size="small" sx={{ mt: 2, textTransform: 'none' }}>
                        Send Urgent Reminder
                      </Button>
                    </>
                  )}

                  {item.type === 'reschedule_requested' && (
                    <>
                      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Chip icon={<CalendarTodayIcon />} label="Reschedule Request" size="small" color="info" />
                      </Stack>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Organized by {item.organizer}
                      </Typography>
                      <Box sx={{ p: 2, bgcolor: 'info.50', borderRadius: '8px', mb: 2 }}>
                        <Typography variant="body2">
                          Original time: {item.originalTime}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.reason}
                        </Typography>
                      </Box>
                      <Button variant="contained" size="small" sx={{ textTransform: 'none' }}>
                        Find New Time
                      </Button>
                    </>
                  )}
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, lg: 4 }}>
            {/* 4. CONFIRMED & UPCOMING */}
            <Box sx={{ bgcolor: 'white', borderRadius: '12px', p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Upcoming Meetings
              </Typography>

              {confirmedMeetings.map((meeting, idx) => (
                <Box
                  key={meeting.id}
                  sx={{
                    py: 2,
                    borderBottom: idx < confirmedMeetings.length - 1 ? '1px solid' : 'none',
                    borderColor: 'grey.100',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {meeting.title}
                  </Typography>
                  <Typography variant="body2" color="primary.main" sx={{ mb: 0.5 }}>
                    {meeting.time}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {meeting.organizer} • {meeting.attendees} attendees
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Recent Activity */}
            <Box sx={{ bgcolor: 'white', borderRadius: '12px', p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Recent Activity
              </Typography>

              <Box>
                {mockRecentActivity.map((activity, idx) => (
                  <Box
                    key={activity.id}
                    sx={{
                      py: 2,
                      borderBottom: idx < mockRecentActivity.length - 1 ? '1px solid' : 'none',
                      borderColor: 'grey.100',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 2,
                    }}
                  >
                    <Avatar sx={{ bgcolor: 'primary.50', color: 'primary.main', width: 36, height: 36 }}>
                      <EventIcon sx={{ fontSize: 18 }} />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {activity.text}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
