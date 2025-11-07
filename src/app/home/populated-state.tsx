'use client';

import { Box, Typography, Button, Grid, AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar, Badge, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Tabs, Tab } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SendIcon from '@mui/icons-material/Send';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Mock data
const actionItems = [
  { id: '1', action: 'RESPOND NOW', title: 'Weekly Team Standup', organizer: 'Sarah Chen', deadline: 'Tomorrow', time: 'Mon Jan 15 @ 10am', responded: '4/6', type: 'response' },
  { id: '2', action: 'SHARE CALENDAR', title: 'Q2 Budget Review', organizer: 'Mike Thompson', deadline: 'Jan 18', type: 'permission' },
  { id: '3', action: 'ACCEPT REQUEST', title: 'Jane Wilson', subtitle: 'Product Demo', company: 'Acme Corp', connections: 3, type: 'contact' },
  { id: '4', action: 'CONFIRM TIME', title: 'Marketing Strategy', time: 'Wed Jan 17 @ 3pm', confirmed: '5/7', type: 'confirm' },
];

const organizing = [
  { id: '1', status: 'READY', title: 'Engineering All-Hands', detail: 'Everyone available', time: 'Thu Jan 18 @ 10am', count: '8/8', type: 'ready' },
  { id: '2', status: 'WAITING', title: 'HOA Board Discussion', detail: 'Top: Tue Jan 16 @ 7pm (3 votes)', count: '4/8', progress: 50, type: 'waiting' },
  { id: '3', status: 'SENT', title: 'Neighborhood Watch', detail: 'Invites sent 2 days ago', count: '0/12', type: 'cold' },
  { id: '4', status: 'WAITING', title: 'Client Presentation', detail: 'Top: Mon Jan 15 @ 2pm (2 votes)', count: '3/4', progress: 75, type: 'waiting' },
];

const invited = [
  { id: '1', status: 'ADDED', title: '1:1 with Manager', organizer: 'Sarah Chen', time: 'Tomorrow @ 2pm', type: 'confirmed' },
  { id: '2', status: 'VOTE NOW', title: 'Design Review', organizer: 'Mike Johnson', detail: '3 options, 1 conflict', type: 'vote' },
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
  const [selectedItem, setSelectedItem] = useState<any>(null);

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
        <Box sx={{ bgcolor: 'white', borderRadius: '12px', border: '3px solid #ef4444', p: 2.5, mb: 2 }}>
          <Typography variant="h6" sx={{ color: '#ef4444', fontWeight: 700, mb: 0.5 }}>{item.action}</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>{item.title}</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {item.organizer} • {item.responded} responded • Due {item.deadline}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box sx={{ flex: 1, p: 1.5, bgcolor: '#f0f9ff', borderRadius: '8px' }}>
              <Typography variant="caption" color="text.secondary">Top choice</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.time}</Typography>
            </Box>
            <Button variant="contained" color="error" sx={{ textTransform: 'none', minWidth: 120 }}>Respond</Button>
          </Box>
        </Box>
      );
    }

    if (item.type === 'permission') {
      return (
        <Box sx={{ bgcolor: 'white', borderRadius: '12px', border: '3px solid #f59e0b', p: 2.5, mb: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <VisibilityIcon sx={{ fontSize: 48, color: '#f59e0b' }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ color: '#f59e0b', fontWeight: 700, mb: 0.5 }}>{item.action}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.title}</Typography>
              <Typography variant="caption" color="text.secondary">{item.organizer} • Due {item.deadline}</Typography>
            </Box>
            <Stack spacing={1}>
              <Button variant="contained" sx={{ bgcolor: '#10b981', textTransform: 'none', '&:hover': { bgcolor: '#059669' } }}>Share</Button>
              <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>Pass</Button>
            </Stack>
          </Stack>
        </Box>
      );
    }

    if (item.type === 'contact') {
      return (
        <Box sx={{ bgcolor: 'white', borderRadius: '12px', border: '3px solid #3b82f6', p: 2.5, mb: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ width: 56, height: 56, bgcolor: '#3b82f6', fontSize: '24px', fontWeight: 700 }}>
              {item.title.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ color: '#3b82f6', fontWeight: 700, mb: 0.5 }}>{item.action}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.title}</Typography>
              <Typography variant="caption" color="text.secondary">{item.company} • {item.connections} mutual • {item.subtitle}</Typography>
            </Box>
            <Stack spacing={1}>
              <Button variant="contained" sx={{ bgcolor: '#3b82f6', textTransform: 'none', '&:hover': { bgcolor: '#2563eb' } }}>Accept</Button>
              <Button variant="text" size="small" sx={{ textTransform: 'none' }}>Ignore</Button>
            </Stack>
          </Stack>
        </Box>
      );
    }

    if (item.type === 'confirm') {
      return (
        <Box sx={{ bgcolor: '#f0fdf4', borderRadius: '12px', border: '3px solid #10b981', p: 2.5, mb: 2 }}>
          <Typography variant="h6" sx={{ color: '#10b981', fontWeight: 700, mb: 0.5 }}>{item.action}</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>{item.title}</Typography>
          <Typography variant="h5" sx={{ color: '#047857', fontWeight: 700, my: 1.5 }}>🎉 {item.time}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="caption" color="text.secondary">{item.confirmed} can attend</Typography>
            <Button variant="contained" sx={{ bgcolor: '#10b981', textTransform: 'none', '&:hover': { bgcolor: '#059669' } }}>Confirm & Send</Button>
          </Box>
        </Box>
      );
    }
  };

  const renderOrganizingCard = (item: any) => {
    if (item.type === 'ready') {
      return (
        <Box sx={{ bgcolor: 'white', borderRadius: '8px', border: '2px solid #10b981', overflow: 'hidden', mb: 2 }}>
          <Box sx={{ bgcolor: '#d1fae5', px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="overline" sx={{ fontWeight: 700, color: '#047857', lineHeight: 1 }}>{item.status}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.title}</Typography>
            </Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#047857' }}>{item.count}</Typography>
          </Box>
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="caption" color="text.secondary">{item.detail}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#3b82f6' }}>{item.time}</Typography>
            </Box>
            <Button size="small" variant="contained" sx={{ textTransform: 'none' }}>Lock In</Button>
          </Box>
        </Box>
      );
    }

    if (item.type === 'waiting') {
      return (
        <Box sx={{ bgcolor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Box>
              <Typography variant="overline" sx={{ fontSize: '10px', fontWeight: 700, color: '#f59e0b' }}>{item.status}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.title}</Typography>
            </Box>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>{item.count}</Typography>
          </Box>
          <Box sx={{ height: 6, bgcolor: '#f3f4f6', borderRadius: 3, mb: 1.5, overflow: 'hidden' }}>
            <Box sx={{ height: '100%', width: `${item.progress}%`, bgcolor: '#f59e0b', borderRadius: 3 }} />
          </Box>
          <Typography variant="caption" color="text.secondary">{item.detail}</Typography>
        </Box>
      );
    }

    if (item.type === 'cold') {
      return (
        <Box sx={{ bgcolor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', p: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="overline" sx={{ fontSize: '10px', fontWeight: 700, color: '#6b7280' }}>{item.status}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.title}</Typography>
            <Typography variant="caption" color="text.secondary">{item.detail} • {item.count}</Typography>
          </Box>
          <Button size="small" variant="outlined" sx={{ textTransform: 'none' }}>Nudge</Button>
        </Box>
      );
    }
  };

  const renderInvitedCard = (item: any) => {
    if (item.type === 'confirmed') {
      return (
        <Box sx={{ bgcolor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', p: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <CheckCircleIcon sx={{ color: '#10b981', fontSize: 32 }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="overline" sx={{ fontSize: '10px', fontWeight: 700, color: '#10b981' }}>{item.status}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.title}</Typography>
            <Typography variant="caption" color="text.secondary">{item.organizer} • {item.time}</Typography>
          </Box>
        </Box>
      );
    }

    if (item.type === 'vote') {
      return (
        <Box sx={{ bgcolor: 'white', borderRadius: '8px', border: '3px solid #3b82f6', p: 2, mb: 2 }}>
          <Typography variant="h6" sx={{ color: '#3b82f6', fontWeight: 700, mb: 0.5 }}>{item.status}</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>{item.title}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="caption" color="text.secondary">{item.organizer} • {item.detail}</Typography>
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Box sx={{ width: 4, height: 24, bgcolor: '#ef4444', borderRadius: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Action Required</Typography>
                <Badge badgeContent={actionItems.length} sx={{ ml: 1, '& .MuiBadge-badge': { bgcolor: '#ef4444', color: 'white' } }} />
              </Box>
              {actionItems.map(renderActionCard)}
            </Box>
          )}

          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Box sx={{ width: 4, height: 24, bgcolor: '#3b82f6', borderRadius: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>You're Organizing</Typography>
            </Box>
            {organizing.slice(0, 2).map(renderOrganizingCard)}
          </Box>

          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Box sx={{ width: 4, height: 24, bgcolor: '#8b5cf6', borderRadius: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>You're Invited To</Typography>
            </Box>
            {invited.map(renderInvitedCard)}
          </Box>
        </Box>
      );
    }

    if (currentTab === 1) {
      // ACTION REQUIRED
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
      // ORGANIZING
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
      // INVITED TO
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
      // UPCOMING
      return (
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Your confirmed meetings
          </Typography>
          {upcoming.map((mtg) => (
            <Box key={mtg.id} sx={{ bgcolor: 'white', borderRadius: '8px', border: mtg.urgent ? '2px solid #ef4444' : '1px solid #e5e7eb', p: 2.5, mb: 2 }}>
              {mtg.urgent && <Typography variant="overline" sx={{ fontSize: '10px', fontWeight: 700, color: '#ef4444' }}>SOON</Typography>}
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>{mtg.title}</Typography>
              <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600, mb: 0.5 }}>{mtg.time}</Typography>
              <Typography variant="caption" color="text.secondary">{mtg.attendees} attendees</Typography>
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
                        <Box sx={{
                          bgcolor: '#ef4444',
                          color: 'white',
                          borderRadius: '12px',
                          px: 1,
                          py: 0.25,
                          fontSize: '11px',
                          fontWeight: 700
                        }}>
                          {actionItems.length}
                        </Box>
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
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#3b82f6' }}>12</Typography>
                  <Typography variant="caption" color="text.secondary">Meetings</Typography>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#10b981' }}>18h</Typography>
                  <Typography variant="caption" color="text.secondary">Meeting time</Typography>
                </Box>
              </Box>
              <Box sx={{ p: 2, bgcolor: '#fef3c7', borderRadius: '8px' }}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: '#92400e' }}>⚠️ Busiest day: Thu (6 meetings)</Typography>
              </Box>
            </Box>

            {/* Next Up */}
            <Box sx={{ bgcolor: 'white', borderRadius: '12px', p: 3, border: '1px solid #e5e7eb' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 2, color: 'text.secondary' }}>NEXT UP</Typography>
              {upcoming.slice(0, 3).map((mtg, idx) => (
                <Box key={mtg.id} sx={{ py: 2, borderBottom: idx < 2 ? '1px solid #f3f4f6' : 'none' }}>
                  {mtg.urgent && <Typography variant="overline" sx={{ fontSize: '9px', fontWeight: 700, color: '#ef4444' }}>SOON</Typography>}
                  <Typography variant="caption" sx={{ fontWeight: 600, display: 'block' }}>{mtg.title}</Typography>
                  <Typography variant="caption" color="primary.main" sx={{ fontWeight: 600, display: 'block' }}>{mtg.time}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
