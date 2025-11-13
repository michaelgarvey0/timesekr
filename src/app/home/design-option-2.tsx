'use client';

import { Box, Typography, Button, AppBar, Toolbar, Avatar, Card, CardContent, Chip, Stack, Grid, Divider } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ContactsIcon from '@mui/icons-material/Contacts';
import Image from 'next/image';

// DESIGN OPTION 2: Dashboard Grid View
// All four sections visible at once in a grid layout

export default function DesignOption2() {
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

      {/* Dashboard Grid */}
      <Box sx={{ maxWidth: 1400, mx: 'auto', px: 3, py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>Dashboard</Typography>

        <Grid container spacing={3}>
          {/* Section 1: Organizing */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <GroupsIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Organizing
                  </Typography>
                  <Chip label="2" size="small" sx={{ ml: 'auto' }} />
                </Box>
                <Stack spacing={2}>
                  <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>Q2 Strategy Planning</Typography>
                    <Typography variant="body2" color="text.secondary">6/10 responded</Typography>
                  </Box>
                  <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>Team Sync</Typography>
                    <Typography variant="body2" color="text.secondary">5/5 responded</Typography>
                  </Box>
                </Stack>
                <Button fullWidth variant="outlined" sx={{ mt: 3, textTransform: 'none' }}>
                  View All
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Section 2: Invited To */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <EventIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Invited To
                  </Typography>
                  <Chip label="1" size="small" color="error" sx={{ ml: 'auto' }} />
                </Box>
                <Stack spacing={2}>
                  <Box sx={{ p: 2, bgcolor: '#fef3c7', borderRadius: '8px', border: '1px solid #fbbf24' }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>Design Review</Typography>
                    <Typography variant="body2" color="text.secondary">Sarah Chen • Action required</Typography>
                  </Box>
                </Stack>
                <Button fullWidth variant="outlined" sx={{ mt: 3, textTransform: 'none' }}>
                  View All
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Section 3: Contacts */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <ContactsIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Contacts
                  </Typography>
                  <Chip label="5" size="small" sx={{ ml: 'auto' }} />
                </Box>
                <Stack spacing={1.5}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#3b82f6', width: 32, height: 32 }}>S</Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>Sarah Chen</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#8b5cf6', width: 32, height: 32 }}>D</Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>David Kim</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#f59e0b', width: 32, height: 32 }}>E</Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>Emma Wilson</Typography>
                    </Box>
                  </Box>
                </Stack>
                <Button fullWidth variant="outlined" sx={{ mt: 3, textTransform: 'none' }}>
                  View All
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Section 4: My Time */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <AccessTimeIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    My Availability
                  </Typography>
                </Box>
                <Box sx={{ p: 3, bgcolor: '#f0f9ff', borderRadius: '8px', textAlign: 'center' }}>
                  <CalendarTodayIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    No calendar connected
                  </Typography>
                  <Button variant="contained" size="small" sx={{ textTransform: 'none' }}>
                    Connect Calendar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
