'use client';

import { Box, Typography, Button, AppBar, Toolbar, Avatar, Card, CardContent, Chip, Stack, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ContactsIcon from '@mui/icons-material/Contacts';
import Image from 'next/image';
import { useState } from 'react';

// DESIGN OPTION 3: Sidebar Navigation
// Left sidebar navigation with main content area

const SIDEBAR_WIDTH = 240;

export default function DesignOption3() {
  const [selectedSection, setSelectedSection] = useState('organizing');

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
              selected={selectedSection === 'organizing'}
              onClick={() => setSelectedSection('organizing')}
              sx={{ borderRadius: '8px' }}
            >
              <ListItemIcon><GroupsIcon /></ListItemIcon>
              <ListItemText primary="Organizing" />
              <Chip label="2" size="small" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              selected={selectedSection === 'invited'}
              onClick={() => setSelectedSection('invited')}
              sx={{ borderRadius: '8px' }}
            >
              <ListItemIcon><EventIcon /></ListItemIcon>
              <ListItemText primary="Invited To" />
              <Chip label="1" size="small" color="error" />
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
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 4, py: 4 }}>
          {/* Section: Organizing */}
          {selectedSection === 'organizing' && (
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
                Meetings You're Organizing
              </Typography>
              <Stack spacing={2}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          Q2 Strategy Planning
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          10 attendees • 6/10 responded • Due in 3 days
                        </Typography>
                      </Box>
                      <Chip label="In Progress" color="warning" />
                    </Box>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          Team Sync
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          5 attendees • 5/5 responded • Ready to confirm
                        </Typography>
                      </Box>
                      <Chip label="Ready" color="success" />
                    </Box>
                  </CardContent>
                </Card>
              </Stack>
            </Box>
          )}

          {/* Section: Invited To */}
          {selectedSection === 'invited' && (
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
                Meetings You're Invited To
              </Typography>
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
    </Box>
  );
}
