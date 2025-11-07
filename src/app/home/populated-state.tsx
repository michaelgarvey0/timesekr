'use client';

import { Box, Typography, Button, Grid, AppBar, Toolbar, IconButton, Menu, MenuItem, Chip, Avatar, Badge, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import WarningIcon from '@mui/icons-material/Warning';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Participant status types
type ParticipantStatus =
  | 'on_platform_calendar_shared'
  | 'on_platform_responded_manually'
  | 'on_platform_not_responded'
  | 'invite_sent_not_on_platform'
  | 'not_invited_yet';

interface Participant {
  name: string;
  status: ParticipantStatus;
  avatar?: string;
}

// Mock data
const actionRequired = [
  {
    id: 'action-1',
    type: 'needs_your_response',
    title: 'Weekly Team Standup',
    organizer: 'Sarah Chen',
    deadline: 'Tomorrow',
    responded: 4,
    total: 6,
    topTime: 'Mon Jan 15 @ 10:00 AM',
    allTimes: ['Mon Jan 15 @ 10:00 AM', 'Mon Jan 15 @ 2:00 PM', 'Tue Jan 16 @ 9:00 AM'],
  },
  {
    id: 'action-2',
    type: 'needs_calendar_permission',
    title: 'Q2 Budget Review',
    organizer: 'Mike Thompson',
    deadline: 'Jan 18',
  },
  {
    id: 'action-3',
    type: 'add_to_contacts',
    title: 'Product Demo Request',
    organizer: 'Jane Wilson',
    company: 'Acme Corp',
    mutualConnections: 3,
  },
  {
    id: 'action-4',
    type: 'confirm_final_time',
    title: 'Marketing Strategy',
    winningTime: 'Wed Jan 17 @ 3:00 PM',
    confirmedCount: 5,
    total: 7,
  },
];

const outgoingRequests = [
  {
    id: 'out-1',
    type: 'fully_coordinated',
    title: 'Engineering All-Hands',
    total: 8,
    responded: 8,
    status: '🎉 Everyone ready!',
    bestTime: 'Thu Jan 18 @ 10:00 AM',
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
    responded: 4,
    onPlatform: 5,
    topTime: 'Tue Jan 16 @ 7:00 PM',
    topVotes: 3,
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
    title: 'Neighborhood Watch',
    total: 12,
    responded: 0,
    invitedDate: '2 days ago',
  },
  {
    id: 'out-4',
    type: 'waiting_on_responses',
    title: 'Client Presentation',
    total: 4,
    responded: 3,
    onPlatform: 3,
    topTime: 'Mon Jan 15 @ 2:00 PM',
    topVotes: 2,
    participants: [
      { name: 'Robert Chen', status: 'on_platform_calendar_shared' as ParticipantStatus },
      { name: 'Maria Garcia', status: 'on_platform_responded_manually' as ParticipantStatus },
      { name: 'James Wilson', status: 'on_platform_calendar_shared' as ParticipantStatus },
      { name: 'Patricia Moore', status: 'invite_sent_not_on_platform' as ParticipantStatus },
    ],
  },
];

const incomingRequests = [
  {
    id: 'in-1',
    type: 'auto_confirmed',
    title: '1:1 with Manager',
    organizer: 'Sarah Chen',
    time: 'Tomorrow @ 2:00 PM',
  },
  {
    id: 'in-2',
    type: 'needs_vote',
    title: 'Design Review',
    organizer: 'Mike Johnson',
    timeOptions: 3,
    conflicts: 1,
  },
];

const upcoming = [
  { id: '1', title: 'Sprint Planning', time: 'Today @ 3:00 PM', attendees: 6, inMinutes: 180 },
  { id: '2', title: 'Product Roadmap', time: 'Tomorrow @ 10:00 AM', attendees: 8 },
  { id: '3', title: 'Customer Success', time: 'Thu @ 1:00 PM', attendees: 4 },
];

const needsAttention = [
  { id: '1', type: 'quorum', title: 'Coffee Chat', responded: 2, total: 8, minRequired: 4 },
  { id: '2', type: 'deadline', title: 'Annual Planning', deadline: '2 hours', responded: 3, total: 10 },
  { id: '3', type: 'reschedule', title: 'Training Session', requestedBy: 'Linda M.' },
];

const getStatusIcon = (status: ParticipantStatus) => {
  switch (status) {
    case 'on_platform_calendar_shared': return '✅';
    case 'on_platform_responded_manually': return '✅';
    case 'on_platform_not_responded': return '⏰';
    case 'invite_sent_not_on_platform': return '📧';
    case 'not_invited_yet': return '❌';
  }
};

export default function PopulatedHomePage() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
            <Image src="/images/logomark.svg" alt="timesēkr" width={120} height={32} priority />
          </Box>
          <Badge badgeContent={actionRequired.length} color="error" sx={{ mr: 2 }}>
            <NotificationsIcon sx={{ color: 'text.secondary' }} />
          </Badge>
          <IconButton onClick={handleMenuOpen} sx={{ bgcolor: 'grey.100', '&:hover': { bgcolor: 'grey.200' } }}>
            <AccountCircleIcon sx={{ color: 'primary.main' }} />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>
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
      <Box sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: 3, py: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>Dashboard</Typography>
            <Typography variant="body2" color="text.secondary">{actionRequired.length} items need attention</Typography>
          </Box>
          <Button variant="contained" startIcon={<EventIcon />} onClick={() => router.push('/meeting/new')} sx={{ textTransform: 'none' }}>
            New Meeting
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 8 }}>
            {/* ACTION REQUIRED */}
            {actionRequired.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  Action Required <Chip label={actionRequired.length} size="small" color="error" />
                </Typography>

                {actionRequired.map((item) => (
                  <Box key={item.id} sx={{ mb: 2 }}>
                    {/* Needs Response - Compact horizontal layout */}
                    {item.type === 'needs_your_response' && (
                      <Box sx={{ bgcolor: 'white', borderRadius: '8px', border: '2px solid #ff4444', p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>{item.title}</Typography>
                          <Typography variant="caption" color="text.secondary">{item.organizer} • {item.responded}/{item.total} responded • Due {item.deadline}</Typography>
                          <Typography variant="body2" color="primary.main" sx={{ mt: 0.5 }}>Top choice: {item.topTime}</Typography>
                        </Box>
                        <Stack spacing={1}>
                          <Button variant="contained" color="error" size="small" sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}>Respond</Button>
                          <Button variant="text" size="small" onClick={() => setSelectedMeeting(item)} sx={{ textTransform: 'none' }}>Details</Button>
                        </Stack>
                      </Box>
                    )}

                    {/* Calendar Permission - Icon-focused layout */}
                    {item.type === 'needs_calendar_permission' && (
                      <Box sx={{ bgcolor: 'white', borderRadius: '8px', border: '2px solid #ff9800', p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <VisibilityIcon sx={{ fontSize: 40, color: 'warning.main' }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>{item.title}</Typography>
                          <Typography variant="caption" color="text.secondary">{item.organizer} wants calendar access • Due {item.deadline}</Typography>
                        </Box>
                        <Stack spacing={1} direction="row">
                          <Button variant="contained" color="success" size="small" sx={{ textTransform: 'none' }}>Share</Button>
                          <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>Decline</Button>
                        </Stack>
                      </Box>
                    )}

                    {/* Add Contact - Profile card style */}
                    {item.type === 'add_to_contacts' && (
                      <Box sx={{ bgcolor: 'white', borderRadius: '8px', border: '2px solid #2196f3', p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ width: 48, height: 48, bgcolor: 'info.main' }}>
                          {item.organizer.charAt(0)}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>{item.organizer}</Typography>
                          <Typography variant="caption" color="text.secondary">{item.company} • {item.mutualConnections} mutual connections</Typography>
                          <Typography variant="body2" sx={{ mt: 0.5 }}>{item.title}</Typography>
                        </Box>
                        <Stack spacing={1} direction="row">
                          <Button variant="contained" color="info" size="small" sx={{ textTransform: 'none' }}>Accept</Button>
                          <Button variant="text" size="small" sx={{ textTransform: 'none' }}>Ignore</Button>
                        </Stack>
                      </Box>
                    )}

                    {/* Confirm Time - Celebration layout */}
                    {item.type === 'confirm_final_time' && (
                      <Box sx={{ bgcolor: '#f0fdf4', borderRadius: '8px', border: '2px solid #22c55e', p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <CheckCircleIcon sx={{ color: 'success.main' }} />
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>Ready to lock in: {item.title}</Typography>
                        </Box>
                        <Typography variant="h6" color="success.dark" sx={{ mb: 1 }}>🎉 {item.winningTime}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Typography variant="caption" color="text.secondary">{item.confirmedCount}/{item.total} can attend</Typography>
                          <Button variant="contained" color="success" sx={{ textTransform: 'none' }}>Confirm & Send</Button>
                        </Box>
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            )}

            {/* YOUR MEETINGS - Different layouts for each state */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Your Meetings</Typography>

              {outgoingRequests.map((meeting) => (
                <Box key={meeting.id} sx={{ mb: 2 }}>
                  {/* Fully Coordinated - Success banner style */}
                  {meeting.type === 'fully_coordinated' && (
                    <Box sx={{ bgcolor: 'white', borderRadius: '8px', border: '1px solid', borderColor: 'success.main', overflow: 'hidden' }}>
                      <Box sx={{ bgcolor: 'success.50', px: 2, py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{meeting.title}</Typography>
                          <Typography variant="caption">{meeting.status}</Typography>
                        </Box>
                        <Chip label={`${meeting.responded}/${meeting.total}`} size="small" color="success" />
                      </Box>
                      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="primary.main">{meeting.bestTime}</Typography>
                        <Stack direction="row" spacing={1}>
                          <Button size="small" sx={{ textTransform: 'none' }}>Confirm</Button>
                          <IconButton size="small" onClick={() => setSelectedMeeting(meeting)}><ArrowForwardIcon fontSize="small" /></IconButton>
                        </Stack>
                      </Box>
                    </Box>
                  )}

                  {/* Waiting on Responses - Progress bar style */}
                  {meeting.type === 'waiting_on_responses' && (
                    <Box sx={{ bgcolor: 'white', borderRadius: '8px', border: '1px solid', borderColor: 'grey.200', p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{meeting.title}</Typography>
                        <Typography variant="caption" color="text.secondary">{meeting.responded}/{meeting.total}</Typography>
                      </Box>
                      <Box sx={{ height: 4, bgcolor: 'grey.100', borderRadius: 1, mb: 1, overflow: 'hidden' }}>
                        <Box sx={{ height: '100%', width: `${(meeting.responded / meeting.total) * 100}%`, bgcolor: 'warning.main' }} />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="caption" color="text.secondary">Top: {meeting.topTime} ({meeting.topVotes} votes)</Typography>
                        <Button size="small" endIcon={<ArrowForwardIcon />} onClick={() => setSelectedMeeting(meeting)} sx={{ textTransform: 'none' }}>View</Button>
                      </Box>
                    </Box>
                  )}

                  {/* Cold Start - Minimalist waiting style */}
                  {meeting.type === 'cold_start' && (
                    <Box sx={{ bgcolor: 'white', borderRadius: '8px', border: '1px solid', borderColor: 'grey.200', p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{meeting.title}</Typography>
                        <Typography variant="caption" color="text.secondary">📧 Waiting for {meeting.total} people • Sent {meeting.invitedDate}</Typography>
                      </Box>
                      <Button size="small" variant="outlined" sx={{ textTransform: 'none' }}>Remind</Button>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>

            {/* INCOMING */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Incoming</Typography>

              {incomingRequests.map((req) => (
                <Box key={req.id} sx={{ mb: 2 }}>
                  {/* Auto-confirmed - Minimal info pill */}
                  {req.type === 'auto_confirmed' && (
                    <Box sx={{ bgcolor: 'white', borderRadius: '8px', border: '1px solid', borderColor: 'grey.200', p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CheckCircleIcon sx={{ color: 'success.main' }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{req.title}</Typography>
                        <Typography variant="caption" color="text.secondary">{req.organizer} • {req.time}</Typography>
                      </Box>
                      <Chip label="Added" size="small" color="success" variant="outlined" />
                    </Box>
                  )}

                  {/* Needs Vote - Action-oriented */}
                  {req.type === 'needs_vote' && (
                    <Box sx={{ bgcolor: 'white', borderRadius: '8px', border: '2px solid', borderColor: 'info.main', p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CalendarTodayIcon sx={{ color: 'info.main' }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{req.title}</Typography>
                        <Typography variant="caption" color="text.secondary">{req.organizer} • {req.timeOptions} options • {req.conflicts} conflict</Typography>
                      </Box>
                      <Button variant="contained" color="info" size="small" sx={{ textTransform: 'none' }}>Vote</Button>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>

            {/* NEEDS ATTENTION - Ultra compact */}
            {needsAttention.length > 0 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Needs Attention</Typography>
                {needsAttention.map((item) => (
                  <Box key={item.id} sx={{ bgcolor: 'white', borderRadius: '8px', border: '1px solid', borderColor: 'grey.200', p: 1.5, mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {item.type === 'quorum' && <GroupsIcon sx={{ fontSize: 20, color: 'text.secondary' }} />}
                      {item.type === 'deadline' && <AccessTimeIcon sx={{ fontSize: 20, color: 'warning.main' }} />}
                      {item.type === 'reschedule' && <CalendarTodayIcon sx={{ fontSize: 20, color: 'text.secondary' }} />}
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>{item.title}</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                          {item.type === 'quorum' && `${item.responded}/${item.total} (need ${item.minRequired})`}
                          {item.type === 'deadline' && `${item.deadline} left • ${item.responded}/${item.total}`}
                          {item.type === 'reschedule' && `${item.requestedBy} requested change`}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton size="small"><ArrowForwardIcon fontSize="small" /></IconButton>
                  </Box>
                ))}
              </Box>
            )}
          </Grid>

          {/* SIDEBAR */}
          <Grid size={{ xs: 12, lg: 4 }}>
            {/* Upcoming - Clean list */}
            <Box sx={{ bgcolor: 'white', borderRadius: '8px', p: 2, mb: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>Upcoming</Typography>
              {upcoming.map((mtg, idx) => (
                <Box key={mtg.id} sx={{ py: 1.5, borderBottom: idx < upcoming.length - 1 ? '1px solid' : 'none', borderColor: 'grey.100' }}>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>{mtg.title}</Typography>
                  <Typography variant="caption" color="primary.main" sx={{ display: 'block' }}>{mtg.time}</Typography>
                  <Typography variant="caption" color="text.secondary">{mtg.attendees} people</Typography>
                </Box>
              ))}
            </Box>

            {/* Quick Stats */}
            <Box sx={{ bgcolor: 'white', borderRadius: '8px', p: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>This Week</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>12</Typography>
                  <Typography variant="caption" color="text.secondary">Meetings</Typography>
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>18h</Typography>
                  <Typography variant="caption" color="text.secondary">In meetings</Typography>
                </Box>
              </Box>
              <Box sx={{ height: 40, bgcolor: 'grey.50', borderRadius: 1, display: 'flex', alignItems: 'center', px: 1.5 }}>
                <Typography variant="caption" color="text.secondary">Busiest: Thursday (6 meetings)</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Detail Modal */}
      <Dialog open={Boolean(selectedMeeting)} onClose={() => setSelectedMeeting(null)} maxWidth="sm" fullWidth>
        {selectedMeeting && (
          <>
            <DialogTitle>{selectedMeeting.title}</DialogTitle>
            <DialogContent>
              {selectedMeeting.participants && (
                <>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Participants ({selectedMeeting.participants.length})</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {selectedMeeting.participants.map((p: Participant, idx: number) => (
                      <Chip
                        key={idx}
                        label={`${getStatusIcon(p.status)} ${p.name}`}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </>
              )}
              {selectedMeeting.allTimes && (
                <>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Time Options</Typography>
                  {selectedMeeting.allTimes.map((time: string, idx: number) => (
                    <Box key={idx} sx={{ p: 1.5, bgcolor: 'grey.50', borderRadius: '8px', mb: 1 }}>
                      <Typography variant="body2">{time}</Typography>
                    </Box>
                  ))}
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedMeeting(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
