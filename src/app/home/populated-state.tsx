'use client';

import { Box, Typography, Button, Grid, AppBar, Toolbar, IconButton, Menu, MenuItem, Chip, LinearProgress, Avatar, Divider } from '@mui/material';
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
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Mock data
const mockMeetingRequests = [
  {
    id: '1',
    title: 'Q1 Planning Session',
    organizer: 'You',
    totalInvitees: 5,
    responded: 3,
    quorumMet: false,
    timeOptions: [
      { date: 'Mon, Jan 15 @ 2:00 PM', votes: 3 },
      { date: 'Tue, Jan 16 @ 10:00 AM', votes: 2 },
      { date: 'Wed, Jan 17 @ 3:00 PM', votes: 1 },
    ],
    status: 'waiting',
  },
  {
    id: '2',
    title: 'Team Sync - Project Alpha',
    organizer: 'Sarah Chen',
    totalInvitees: 4,
    responded: 4,
    quorumMet: true,
    confirmedTime: 'Thu, Jan 18 @ 11:00 AM',
    status: 'confirmed',
  },
];

const mockPendingInvites = [
  {
    id: '3',
    title: 'Design Review',
    organizer: 'Mike Johnson',
    dueDate: 'Respond by Jan 14',
  },
];

const mockRecentActivity = [
  { id: '1', text: 'Sarah responded to Q1 Planning Session', time: '2 hours ago' },
  { id: '2', text: 'Team Sync reached quorum', time: '5 hours ago' },
  { id: '3', text: 'New invite: Design Review', time: '1 day ago' },
];

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
      <Box sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: 4, py: 5 }}>
        {/* Hero Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Box>
            <Typography variant="h3" sx={{ mb: 1, fontWeight: 700 }}>
              Welcome back, John 👋
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Here's what needs your attention
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

        {/* Action Items */}
        {mockPendingInvites.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Action Items
            </Typography>
            {mockPendingInvites.map((invite) => (
              <Box
                key={invite.id}
                sx={{
                  bgcolor: 'white',
                  borderRadius: '12px',
                  border: '2px solid',
                  borderColor: 'warning.main',
                  p: 3,
                  mb: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Chip
                        label="Needs Response"
                        size="small"
                        sx={{ bgcolor: 'warning.main', color: 'white' }}
                      />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {invite.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      From {invite.organizer} • {invite.dueDate}
                    </Typography>
                  </Box>
                  <Button variant="contained" color="warning" sx={{ textTransform: 'none' }}>
                    Respond Now
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Active Meetings */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Your Meetings
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, lg: 8 }}>
              <Box>

                {mockMeetingRequests.map((meeting, idx) => (
                  <Box
                    key={meeting.id}
                    sx={{
                      bgcolor: 'white',
                      mb: idx < mockMeetingRequests.length - 1 ? 2 : 0,
                      borderRadius: '12px',
                      border: '1px solid',
                      borderColor: 'grey.200',
                      p: 3,
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: 1,
                      },
                      cursor: 'pointer',
                    }}
                  >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {meeting.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Organized by {meeting.organizer}
                      </Typography>
                    </Box>
                    {meeting.status === 'confirmed' ? (
                      <Chip
                        icon={<CheckCircleIcon />}
                        label="Confirmed"
                        size="small"
                        sx={{ bgcolor: 'success.50', color: 'success.main' }}
                      />
                    ) : (
                      <Chip
                        icon={<PendingIcon />}
                        label="Pending"
                        size="small"
                        sx={{ bgcolor: 'warning.50', color: 'warning.main' }}
                      />
                    )}
                  </Box>

                  {meeting.status === 'confirmed' ? (
                    <Box sx={{ p: 2, bgcolor: 'success.50', borderRadius: '12px', mt: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
                        {meeting.confirmedTime}
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Response Progress
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {meeting.responded}/{meeting.totalInvitees} responded
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(meeting.responded / meeting.totalInvitees) * 100}
                          sx={{ height: 8, borderRadius: '12px' }}
                        />
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                        Time Options:
                      </Typography>
                      {meeting.timeOptions.map((option, optIdx) => (
                        <Box
                          key={optIdx}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: 1.5,
                            bgcolor: optIdx === 0 ? 'primary.50' : 'grey.50',
                            borderRadius: '12px',
                            mb: optIdx < meeting.timeOptions.length - 1 ? 1 : 0,
                          }}
                        >
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {option.date}
                          </Typography>
                          <Chip label={`${option.votes} votes`} size="small" />
                        </Box>
                      ))}
                    </>
                  )}

                  <Button
                    variant="text"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ mt: 2, textTransform: 'none' }}
                  >
                    View Details
                  </Button>
                </Box>
              ))}

            </Box>
          </Grid>

            {/* Recent Activity */}
            <Grid size={{ xs: 12, lg: 4 }}>
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
    </Box>
  );
}
