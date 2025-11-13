'use client';

import { Box, Typography, Button, Tabs, Tab, AppBar, Toolbar, IconButton, Avatar, Card, CardContent, Chip, Stack } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ContactsIcon from '@mui/icons-material/Contacts';
import Image from 'next/image';
import { useState } from 'react';

// DESIGN OPTION 1: Clean Horizontal Tabs
// All four sections accessible via top-level tabs

export default function DesignOption1() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafbfc' }}>
      {/* Top Nav */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Image src="/images/logomark.svg" alt="timesēkr" width={120} height={32} priority />
          </Box>
          <Button variant="contained" startIcon={<EventIcon />} sx={{ textTransform: 'none', mr: 2 }}>
            New Meeting
          </Button>
          <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>M</Avatar>
        </Toolbar>
      </AppBar>

      {/* Main Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white' }}>
        <Box sx={{ maxWidth: 1400, mx: 'auto', px: 3 }}>
          <Tabs value={currentTab} onChange={(e, v) => setCurrentTab(v)}>
            <Tab icon={<GroupsIcon />} iconPosition="start" label="Organizing" sx={{ textTransform: 'none', minHeight: 64 }} />
            <Tab icon={<EventIcon />} iconPosition="start" label="Invited To" sx={{ textTransform: 'none', minHeight: 64 }} />
            <Tab icon={<ContactsIcon />} iconPosition="start" label="Contacts" sx={{ textTransform: 'none', minHeight: 64 }} />
            <Tab icon={<AccessTimeIcon />} iconPosition="start" label="My Time" sx={{ textTransform: 'none', minHeight: 64 }} />
          </Tabs>
        </Box>
      </Box>

      {/* Content Area */}
      <Box sx={{ maxWidth: 1400, mx: 'auto', px: 3, py: 4 }}>
        {/* TAB 1: Organizing */}
        {currentTab === 0 && (
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Meetings You're Organizing
            </Typography>
            <Stack spacing={2}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>Q2 Strategy Planning</Typography>
                      <Typography variant="body2" color="text.secondary">10 attendees • 6/10 responded</Typography>
                    </Box>
                    <Chip label="In Progress" color="warning" />
                  </Box>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>Team Sync</Typography>
                      <Typography variant="body2" color="text.secondary">5 attendees • 5/5 responded</Typography>
                    </Box>
                    <Chip label="Ready" color="success" />
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Box>
        )}

        {/* TAB 2: Invited To */}
        {currentTab === 1 && (
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Meetings You're Invited To
            </Typography>
            <Stack spacing={2}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>Design Review</Typography>
                      <Typography variant="body2" color="text.secondary">Organized by Sarah Chen</Typography>
                    </Box>
                    <Button variant="contained" size="small">Respond</Button>
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Box>
        )}

        {/* TAB 3: Contacts */}
        {currentTab === 2 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Contacts & Connections
              </Typography>
              <Button variant="contained">Add Contact</Button>
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

        {/* TAB 4: My Time */}
        {currentTab === 3 && (
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
    </Box>
  );
}
