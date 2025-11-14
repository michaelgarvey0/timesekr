'use client';

import { Box, Typography, Button, Grid, AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar, Badge, Stack, Tabs, Tab, Chip } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupsIcon from '@mui/icons-material/Groups';
import ReplyIcon from '@mui/icons-material/Reply';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import SendIcon from '@mui/icons-material/Send';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Mock data
const actionItems = [
  { id: '1', action: 'Respond Now', title: 'Weekly Team Standup', organizer: 'Sarah Chen', deadline: 'Tomorrow', time: 'Mon Jan 15 @ 10am', responded: '4/6', type: 'response' },
  { id: '2', action: 'Share Calendar', title: 'Q2 Budget Review', organizer: 'Mike Thompson', deadline: 'Jan 18', type: 'permission' },
  { id: '3', action: 'Accept Request', title: 'Jane Wilson', subtitle: 'Product Demo', company: 'Acme Corp', connections: 3, type: 'contact' },
  { id: '4', action: 'Confirm Time', title: 'Marketing Strategy', time: 'Wed Jan 17 @ 3pm', confirmed: '5/7', type: 'confirm' },
];

const organizing = [
  { id: '1', status: 'Ready', title: 'Engineering All-Hands', detail: 'Everyone available', time: 'Thu Jan 18 @ 10am', count: '8/8', type: 'ready' },
  { id: '2', status: 'Waiting', title: 'HOA Board Discussion', detail: 'Top: Tue Jan 16 @ 7pm (3 votes)', count: '4/8', progress: 50, type: 'waiting' },
  { id: '3', status: 'Sent', title: 'Neighborhood Watch', detail: 'Invites sent 2 days ago', count: '0/12', type: 'cold' },
  { id: '4', status: 'Waiting', title: 'Client Presentation', detail: 'Top: Mon Jan 15 @ 2pm (2 votes)', count: '3/4', progress: 75, type: 'waiting' },
];

const invited = [
  { id: '1', status: 'Added', title: '1:1 with Manager', organizer: 'Sarah Chen', time: 'Tomorrow @ 2pm', type: 'confirmed' },
  { id: '2', status: 'Vote Now', title: 'Design Review', organizer: 'Mike Johnson', detail: '3 options, 1 conflict', type: 'vote' },
];

const upcoming = [
  { id: '1', title: 'Sprint Planning', time: 'Today @ 3pm', attendees: 6, urgent: true },
  { id: '2', title: 'Product Roadmap', time: 'Tomorrow @ 10am', attendees: 8 },
  { id: '3', title: 'Customer Success', time: 'Thu @ 1pm', attendees: 4 },
];

export default function PopulatedHomePage() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentTab, setCurrentTab] = useState(0);

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

  const renderActionCard = (item: any) => {
    if (item.type === 'response') {
      return (
        <Box sx={{ bgcolor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', p: 2.5, mb: 2 }}>
          <Chip
            icon={<ReplyIcon />}
            label={item.action}
            size="small"
            sx={{ mb: 1.5, fontWeight: 600 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>{item.title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {item.organizer} • {item.responded} responded • Due {item.deadline}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box sx={{ flex: 1, p: 1.5, bgcolor: '#f8fafc', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <Typography variant="caption" color="text.secondary">Top choice</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.time}</Typography>
            </Box>
            <Button variant="contained" sx={{ textTransform: 'none', minWidth: 120 }}>Respond</Button>
          </Box>
        </Box>
      );
    }

    if (item.type === 'permission') {
      return (
        <Box sx={{ bgcolor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', p: 2.5, mb: 2 }}>
          <Chip
            icon={<VisibilityIcon />}
            label={item.action}
            size="small"
            sx={{ mb: 1.5, fontWeight: 600 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>{item.title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {item.organizer} wants to see your calendar • Due {item.deadline}
          </Typography>
          <Stack spacing={1} direction="row">
            <Button variant="contained" sx={{ textTransform: 'none' }}>Share</Button>
            <Button variant="outlined" sx={{ textTransform: 'none' }}>Respond Manually</Button>
          </Stack>
        </Box>
      );
    }

    if (item.type === 'contact') {
      return (
        <Box sx={{ bgcolor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', p: 2.5, mb: 2 }}>
          <Chip
            icon={<PersonAddIcon />}
            label={item.action}
            size="small"
            sx={{ mb: 1.5, fontWeight: 600 }}
          />
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Avatar sx={{ width: 48, height: 48 }}>
              {item.title.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{item.title}</Typography>
              <Typography variant="body2" color="text.secondary">{item.company} • {item.connections} mutual connections</Typography>
              <Typography variant="body2" color="text.secondary">{item.subtitle}</Typography>
            </Box>
          </Stack>
          <Stack spacing={1} direction="row">
            <Button variant="contained" sx={{ textTransform: 'none' }}>Accept</Button>
            <Button variant="outlined" sx={{ textTransform: 'none' }}>Ignore</Button>
          </Stack>
        </Box>
      );
    }

    if (item.type === 'confirm') {
      return (
        <Box sx={{ bgcolor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', p: 2.5, mb: 2 }}>
          <Chip
            icon={<ThumbUpIcon />}
            label={item.action}
            size="small"
            color="success"
            sx={{ mb: 1.5, fontWeight: 600 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>{item.title}</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, my: 1.5 }}>{item.time}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">{item.confirmed} can attend</Typography>
            <Button variant="contained" color="success" sx={{ textTransform: 'none' }}>Confirm & Send</Button>
          </Box>
        </Box>
      );
    }
  };

  const renderOrganizingCard = (item: any) => {
    if (item.type === 'ready') {
      return (
        <Box sx={{ bgcolor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', p: 2.5, mb: 2 }}>
          <Chip
            icon={<CheckCircleIcon />}
            label={item.status}
            size="small"
            color="success"
            sx={{ mb: 1.5, fontWeight: 600 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>{item.title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {item.detail} • {item.count}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.time}</Typography>
            <Button size="small" variant="contained" sx={{ textTransform: 'none' }}>Lock In</Button>
          </Box>
        </Box>
      );
    }

    if (item.type === 'waiting') {
      return (
        <Box sx={{ bgcolor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', p: 2.5, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Chip
              icon={<HourglassEmptyIcon />}
              label={item.status}
              size="small"
              sx={{ fontWeight: 600 }}
            />
            <Typography variant="body2" color="text.secondary">{item.count}</Typography>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{item.title}</Typography>
          <Box sx={{ height: 6, bgcolor: '#f3f4f6', borderRadius: 3, mb: 1.5, overflow: 'hidden' }}>
            <Box sx={{ height: '100%', width: `${item.progress}%`, bgcolor: '#64748b', borderRadius: 3 }} />
          </Box>
          <Typography variant="body2" color="text.secondary">{item.detail}</Typography>
        </Box>
      );
    }

    if (item.type === 'cold') {
      return (
        <Box sx={{ bgcolor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', p: 2.5, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Chip
              icon={<SendIcon />}
              label={item.status}
              size="small"
              sx={{ fontWeight: 600 }}
            />
            <Typography variant="body2" color="text.secondary">{item.count}</Typography>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{item.title}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">{item.detail}</Typography>
            <Button size="small" variant="outlined" sx={{ textTransform: 'none' }}>Remind</Button>
          </Box>
        </Box>
      );
    }
  };

  const renderInvitedCard = (item: any) => {
    if (item.type === 'confirmed') {
      return (
        <Box sx={{ bgcolor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', p: 2.5, mb: 2 }}>
          <Chip
            icon={<CheckCircleIcon />}
            label={item.status}
            size="small"
            color="success"
            sx={{ mb: 1.5, fontWeight: 600 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>{item.title}</Typography>
          <Typography variant="body2" color="text.secondary">{item.organizer} • {item.time}</Typography>
        </Box>
      );
    }

    if (item.type === 'vote') {
      return (
        <Box sx={{ bgcolor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', p: 2.5, mb: 2 }}>
          <Chip
            icon={<CalendarTodayIcon />}
            label={item.status}
            size="small"
            sx={{ mb: 1.5, fontWeight: 600 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>{item.title}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">{item.organizer} • {item.detail}</Typography>
            <Button variant="contained" size="small" sx={{ textTransform: 'none' }}>Vote</Button>
          </Box>
        </Box>
      );
    }
  };

  const renderTabContent = () => {
    if (currentTab === 0) {
      // ALL
      return (
        <Box>
          {actionItems.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Action Required</Typography>
              {actionItems.map(renderActionCard)}
            </Box>
          )}

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>You're Organizing</Typography>
            {organizing.slice(0, 2).map(renderOrganizingCard)}
          </Box>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>You're Invited To</Typography>
            {invited.map(renderInvitedCard)}
          </Box>
        </Box>
      );
    }

    if (currentTab === 1) {
      return (
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {actionItems.length} items need your immediate attention
          </Typography>
          {actionItems.map(renderActionCard)}
        </Box>
      );
    }

    if (currentTab === 2) {
      return (
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Meetings you're coordinating
          </Typography>
          {organizing.map(renderOrganizingCard)}
        </Box>
      );
    }

    if (currentTab === 3) {
      return (
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Meetings others are organizing
          </Typography>
          {invited.map(renderInvitedCard)}
        </Box>
      );
    }

    if (currentTab === 4) {
      return (
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Your confirmed meetings
          </Typography>
          {upcoming.map((mtg) => (
            <Box key={mtg.id} sx={{ bgcolor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', p: 2.5, mb: 2 }}>
              {mtg.urgent && (
                <Chip
                  label="Soon"
                  size="small"
                  color="error"
                  sx={{ mb: 1.5, fontWeight: 600 }}
                />
              )}
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>{mtg.title}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>{mtg.time}</Typography>
              <Typography variant="body2" color="text.secondary">{mtg.attendees} attendees</Typography>
            </Box>
          ))}
        </Box>
      );
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafbfc' }}>
      {/* Top Navigation */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'grey.200' }}>
        <Toolbar sx={{ py: 1 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Image src="/images/logomark.svg" alt="timesēkr" width={120} height={32} priority />
          </Box>
          <Badge badgeContent={actionItems.length} color="error" sx={{ mr: 2 }}>
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
      <Box sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: 3, py: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>Dashboard</Typography>
          </Box>
          <Button variant="contained" startIcon={<EventIcon />} onClick={() => router.push('/meeting/new')} sx={{ textTransform: 'none' }}>
            New Meeting
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 8 }}>
            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs value={currentTab} onChange={(e, v) => setCurrentTab(v)}>
                <Tab label="All" sx={{ textTransform: 'none', fontWeight: 600 }} />
                <Tab
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      Action Required
                      {actionItems.length > 0 && (
                        <Badge badgeContent={actionItems.length} color="error" />
                      )}
                    </Box>
                  }
                  sx={{ textTransform: 'none', fontWeight: 600 }}
                />
                <Tab label="Organizing" sx={{ textTransform: 'none', fontWeight: 600 }} />
                <Tab label="Invited To" sx={{ textTransform: 'none', fontWeight: 600 }} />
                <Tab label="Upcoming" sx={{ textTransform: 'none', fontWeight: 600 }} />
              </Tabs>
            </Box>

            {/* Tab Content */}
            {renderTabContent()}
          </Grid>

          {/* SIDEBAR */}
          <Grid size={{ xs: 12, lg: 4 }}>
            {/* Quick Stats */}
            <Box sx={{ bgcolor: 'white', borderRadius: '12px', p: 3, mb: 3, border: '1px solid #e5e7eb' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 2, color: 'text.secondary' }}>THIS WEEK</Typography>
              <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>12</Typography>
                  <Typography variant="caption" color="text.secondary">Meetings</Typography>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>18h</Typography>
                  <Typography variant="caption" color="text.secondary">Meeting time</Typography>
                </Box>
              </Box>
              <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>Busiest: Thursday (6 meetings)</Typography>
              </Box>
            </Box>

            {/* Next Up */}
            <Box sx={{ bgcolor: 'white', borderRadius: '12px', p: 3, border: '1px solid #e5e7eb' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 2, color: 'text.secondary' }}>NEXT UP</Typography>
              {upcoming.slice(0, 3).map((mtg, idx) => (
                <Box key={mtg.id} sx={{ py: 2, borderBottom: idx < 2 ? '1px solid #f3f4f6' : 'none' }}>
                  {mtg.urgent && (
                    <Chip
                      label="Soon"
                      size="small"
                      color="error"
                      sx={{ mb: 0.5, height: 20, fontWeight: 600, fontSize: '10px' }}
                    />
                  )}
                  <Typography variant="body2" sx={{ fontWeight: 600, display: 'block' }}>{mtg.title}</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600, display: 'block' }}>{mtg.time}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
