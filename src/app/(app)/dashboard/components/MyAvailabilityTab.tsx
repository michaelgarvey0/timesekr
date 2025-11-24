'use client';

import { Box, Typography, Button, Card, CardContent, Stack, Checkbox, FormControlLabel, IconButton, Tabs, Tab } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';

export default function MyAvailabilityTab({ isMobile = false }: { isMobile?: boolean }) {
  const [availabilityBlocks, setAvailabilityBlocks] = useState<any[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ day: number; slot: number } | null>(null);
  const [selectedBlockType, setSelectedBlockType] = useState<'busy' | 'available'>('busy');
  const [activeTab, setActiveTab] = useState(0);
  const [calendarFilters, setCalendarFilters] = useState({
    google1: true,
    google2: true,
    microsoft: true,
    apple: true,
    outlook: true
  });

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ fontWeight: 600 }}>
          My Time
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="Availability" sx={{ textTransform: 'none' }} />
          <Tab label="Connected Calendars" sx={{ textTransform: 'none' }} />
        </Tabs>
      </Box>

      {/* Availability Tab Content */}
      {activeTab === 0 && (
        <>
          {/* Controls Row - Horizontal Layout */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: isMobile ? 'column' : 'row' }}>
            {/* Calendar Filters */}
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>Filter Calendars</Typography>
                <Box sx={{ maxHeight: 120, overflow: 'auto' }}>
                  <Stack spacing={1}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={calendarFilters.google1}
                          onChange={(e) => setCalendarFilters({ ...calendarFilters, google1: e.target.checked })}
                          size="small"
                          sx={{
                            color: '#4285F4',
                            '&.Mui-checked': {
                              color: '#4285F4',
                            },
                          }}
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#4285F4' }} />
                          <Typography variant="body2">work@company.com</Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={calendarFilters.google2}
                          onChange={(e) => setCalendarFilters({ ...calendarFilters, google2: e.target.checked })}
                          size="small"
                          sx={{
                            color: '#0F9D58',
                            '&.Mui-checked': {
                              color: '#0F9D58',
                            },
                          }}
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#0F9D58' }} />
                          <Typography variant="body2">personal@gmail.com</Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={calendarFilters.microsoft}
                          onChange={(e) => setCalendarFilters({ ...calendarFilters, microsoft: e.target.checked })}
                          size="small"
                          sx={{
                            color: '#EA4335',
                            '&.Mui-checked': {
                              color: '#EA4335',
                            },
                          }}
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#EA4335' }} />
                          <Typography variant="body2">corp@microsoft.com</Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={calendarFilters.apple}
                          onChange={(e) => setCalendarFilters({ ...calendarFilters, apple: e.target.checked })}
                          size="small"
                          sx={{
                            color: '#F4B400',
                            '&.Mui-checked': {
                              color: '#F4B400',
                            },
                          }}
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#F4B400' }} />
                          <Typography variant="body2">me@icloud.com</Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={calendarFilters.outlook}
                          onChange={(e) => setCalendarFilters({ ...calendarFilters, outlook: e.target.checked })}
                          size="small"
                          sx={{
                            color: '#AB47BC',
                            '&.Mui-checked': {
                              color: '#AB47BC',
                            },
                          }}
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#AB47BC' }} />
                          <Typography variant="body2">family@outlook.com</Typography>
                        </Box>
                      }
                    />
                  </Stack>
                </Box>
              </CardContent>
            </Card>

            {/* Availability Block Type Selector */}
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>Set Availability</Typography>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant={selectedBlockType === 'busy' ? 'contained' : 'outlined'}
                    fullWidth
                    size="small"
                    onClick={() => setSelectedBlockType('busy')}
                    sx={{
                      textTransform: 'none',
                      bgcolor: selectedBlockType === 'busy' ? 'error.main' : 'transparent',
                      borderColor: 'error.main',
                      color: selectedBlockType === 'busy' ? 'white' : 'error.main',
                      '&:hover': {
                        bgcolor: selectedBlockType === 'busy' ? 'error.dark' : 'rgba(239, 68, 68, 0.1)',
                        borderColor: 'error.main',
                      }
                    }}
                  >
                    Busy
                  </Button>
                  <Button
                    variant={selectedBlockType === 'available' ? 'contained' : 'outlined'}
                    fullWidth
                    size="small"
                    onClick={() => setSelectedBlockType('available')}
                    sx={{
                      textTransform: 'none',
                      bgcolor: selectedBlockType === 'available' ? 'success.main' : 'transparent',
                      borderColor: 'success.main',
                      color: selectedBlockType === 'available' ? 'white' : 'success.main',
                      '&:hover': {
                        bgcolor: selectedBlockType === 'available' ? 'success.dark' : 'rgba(34, 197, 94, 0.1)',
                        borderColor: 'success.main',
                      }
                    }}
                  >
                    Available
                  </Button>
                </Stack>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
                  Click and drag on the calendar to set your {selectedBlockType} times
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Calendar - Full Width */}
          <Box>
        <Card>
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          {/* Calendar Header */}
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'grey.200', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Week of Jan 15, 2025
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button size="small" variant="outlined" sx={{ textTransform: 'none' }}>Today</Button>
              <IconButton size="small"><ArrowBackIcon /></IconButton>
              <IconButton size="small"><ArrowForwardIcon /></IconButton>
            </Stack>
          </Box>

          {/* Days Header */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)', borderBottom: '1px solid', borderColor: 'grey.200' }}>
            <Box sx={{ p: 1 }} />
            {['Sun\n15', 'Mon\n16', 'Tue\n17', 'Wed\n18', 'Thu\n19', 'Fri\n20', 'Sat\n21'].map((day, i) => (
              <Box key={i} sx={{ p: 1, textAlign: 'center', borderLeft: '1px solid', borderColor: 'grey.200' }}>
                <Typography variant="caption" sx={{ fontWeight: 600, whiteSpace: 'pre-line' }}>{day}</Typography>
              </Box>
            ))}
          </Box>

          {/* Time Grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)', maxHeight: 600, overflow: 'auto' }}>
            {/* Hours column */}
            <Box>
              {Array.from({ length: 48 }, (_, i) => {
                const slotStartHour = 7 + Math.floor(i / 4); // Start at 7 AM, 4 slots per hour
                const slotMinutes = (i % 4) * 15;
                const isHourMark = slotMinutes === 0;
                return (
                  <Box
                    key={i}
                    sx={{
                      height: 15,
                      display: 'flex',
                      alignItems: 'start',
                      justifyContent: 'center',
                      pt: 0.25,
                      borderBottom: isHourMark ? '1px solid' : '1px solid',
                      borderColor: isHourMark ? 'grey.300' : 'grey.100'
                    }}
                  >
                    {isHourMark && (
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                        {slotStartHour === 12 ? '12 PM' : slotStartHour < 12 ? `${slotStartHour} AM` : `${slotStartHour - 12} PM`}
                      </Typography>
                    )}
                  </Box>
                );
              })}
            </Box>

            {/* Day columns */}
            {[0, 1, 2, 3, 4, 5, 6].map((day) => (
              <Box key={day} sx={{ borderLeft: '1px solid', borderColor: 'grey.200', position: 'relative' }}>
                {/* 15-minute slots */}
                {Array.from({ length: 48 }, (_, i) => {
                  const isHourMark = (i % 4) === 0;
                  return (
                    <Box
                      key={i}
                      sx={{
                        height: 15,
                        borderBottom: isHourMark ? '1px solid' : '1px solid',
                        borderColor: isHourMark ? 'grey.300' : 'grey.100',
                        cursor: 'crosshair',
                        '&:hover': {
                          bgcolor: 'grey.50'
                        }
                      }}
                      onMouseDown={() => {
                        setIsDragging(true);
                        setDragStart({ day, slot: i });
                      }}
                      onMouseUp={() => {
                        if (isDragging && dragStart) {
                          // Create block
                          const newBlock = {
                            id: Date.now(),
                            day,
                            startSlot: Math.min(dragStart.slot, i),
                            endSlot: Math.max(dragStart.slot, i) + 1,
                            type: selectedBlockType
                          };
                          setAvailabilityBlocks([...availabilityBlocks, newBlock]);
                        }
                        setIsDragging(false);
                        setDragStart(null);
                      }}
                      onMouseEnter={(e) => {
                        if (isDragging) {
                          e.currentTarget.style.backgroundColor =
                            selectedBlockType === 'busy' ? 'rgba(239, 68, 68, 0.1)' :
                            'rgba(34, 197, 94, 0.1)';
                        }
                      }}
                    />
                  );
                })}

                {/* Mock calendar events - all days with events */}
                {/* Monday - day 1 - Google Calendar */}
                {day === 1 && calendarFilters.google1 && (
                  <>
                    {[
                      { slot: 8, duration: 4, title: 'Stand-up', time: '9:00 - 10:00' }, // 9am = slot 8 (2 hours * 4)
                      { slot: 14, duration: 6, title: 'Product Review', time: '10:30 - 12:00' }, // 10:30am = slot 14
                      { slot: 28, duration: 4, title: '1:1 with Sarah', time: '2:00 - 3:00' }, // 2pm = slot 28
                      { slot: 34, duration: 6, title: 'Client Call', time: '3:30 - 5:00' }, // 3:30pm = slot 34
                    ].map((event, i) => (
                      <Box key={i} sx={{
                        position: 'absolute',
                        top: event.slot * 15,
                        left: 4,
                        right: 4,
                        height: event.duration * 15,
                        bgcolor: 'rgba(66, 133, 244, 0.1)',
                        border: '2px solid',
                        borderColor: '#4285F4',
                        borderRadius: 0.5,
                        p: 0.5,
                        overflow: 'hidden'
                      }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>
                          {event.title}
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block', fontSize: '0.65rem' }}>
                          {event.time}
                        </Typography>
                      </Box>
                    ))}
                  </>
                )}

                {/* Tuesday - day 2 - Microsoft Calendar */}
                {day === 2 && calendarFilters.microsoft && (
                  <>
                    {[
                      { slot: 4, duration: 4, title: 'Engineering Sync', time: '8:00 - 9:00' }, // 8am = slot 4
                      { slot: 12, duration: 8, title: 'Q2 Planning', time: '10:00 - 12:00' }, // 10am = slot 12
                      { slot: 24, duration: 4, title: 'Lunch w/ Team', time: '1:00 - 2:00' }, // 1pm = slot 24
                      { slot: 32, duration: 6, title: 'Design Review', time: '3:00 - 4:30' }, // 3pm = slot 32
                    ].map((event, i) => (
                      <Box key={i} sx={{
                        position: 'absolute',
                        top: event.slot * 15,
                        left: 4,
                        right: 4,
                        height: event.duration * 15,
                        bgcolor: 'rgba(234, 67, 53, 0.1)',
                        border: '2px solid',
                        borderColor: '#EA4335',
                        borderRadius: 0.5,
                        p: 0.5,
                        overflow: 'hidden'
                      }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>
                          {event.title}
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block', fontSize: '0.65rem' }}>
                          {event.time}
                        </Typography>
                      </Box>
                    ))}
                  </>
                )}

                {/* Wednesday - day 3 - Google Calendar */}
                {day === 3 && calendarFilters.google2 && (
                  <>
                    {[
                      { slot: 8, duration: 4, title: 'Stand-up', time: '9:00 - 10:00' }, // 9am = slot 8
                      { slot: 16, duration: 6, title: 'Board Meeting', time: '11:00 - 12:30' }, // 11am = slot 16
                      { slot: 28, duration: 4, title: 'Interview - Dev', time: '2:00 - 3:00' }, // 2pm = slot 28
                      { slot: 36, duration: 4, title: 'Vendor Demo', time: '4:00 - 5:00' }, // 4pm = slot 36
                    ].map((event, i) => (
                      <Box key={i} sx={{
                        position: 'absolute',
                        top: event.slot * 15,
                        left: 4,
                        right: 4,
                        height: event.duration * 15,
                        bgcolor: 'rgba(15, 157, 88, 0.1)',
                        border: '2px solid',
                        borderColor: '#0F9D58',
                        borderRadius: 0.5,
                        p: 0.5,
                        overflow: 'hidden'
                      }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>
                          {event.title}
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block', fontSize: '0.65rem' }}>
                          {event.time}
                        </Typography>
                      </Box>
                    ))}
                  </>
                )}

                {/* Thursday - day 4 - Apple Calendar */}
                {day === 4 && calendarFilters.apple && (
                  <>
                    {[
                      { slot: 8, duration: 4, title: 'Team Standup', time: '9:00 - 10:00' }, // 9am = slot 8
                      { slot: 12, duration: 4, title: 'Sales Call', time: '10:00 - 11:00' }, // 10am = slot 12
                      { slot: 24, duration: 8, title: 'All Hands', time: '1:00 - 3:00' }, // 1pm = slot 24
                      { slot: 32, duration: 4, title: '1:1 with John', time: '3:00 - 4:00' }, // 3pm = slot 32
                    ].map((event, i) => (
                      <Box key={i} sx={{
                        position: 'absolute',
                        top: event.slot * 15,
                        left: 4,
                        right: 4,
                        height: event.duration * 15,
                        bgcolor: 'rgba(244, 180, 0, 0.1)',
                        border: '2px solid',
                        borderColor: '#F4B400',
                        borderRadius: 0.5,
                        p: 0.5,
                        overflow: 'hidden'
                      }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>
                          {event.title}
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block', fontSize: '0.65rem' }}>
                          {event.time}
                        </Typography>
                      </Box>
                    ))}
                  </>
                )}

                {/* Friday - day 5 - Outlook Calendar */}
                {day === 5 && calendarFilters.outlook && (
                  <>
                    {[
                      { slot: 8, duration: 4, title: 'Stand-up', time: '9:00 - 10:00' }, // 9am = slot 8
                      { slot: 12, duration: 6, title: 'Sprint Planning', time: '10:00 - 11:30' }, // 10am = slot 12
                      { slot: 24, duration: 4, title: 'Tech Review', time: '1:00 - 2:00' }, // 1pm = slot 24
                      { slot: 32, duration: 4, title: 'Happy Hour', time: '3:00 - 4:00' }, // 3pm = slot 32
                    ].map((event, i) => (
                      <Box key={i} sx={{
                        position: 'absolute',
                        top: event.slot * 15,
                        left: 4,
                        right: 4,
                        height: event.duration * 15,
                        bgcolor: 'rgba(171, 71, 188, 0.1)',
                        border: '2px solid',
                        borderColor: '#AB47BC',
                        borderRadius: 0.5,
                        p: 0.5,
                        overflow: 'hidden'
                      }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>
                          {event.title}
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block', fontSize: '0.65rem' }}>
                          {event.time}
                        </Typography>
                      </Box>
                    ))}
                  </>
                )}

                {/* Availability blocks */}
                {availabilityBlocks
                  .filter(block => block.day === day)
                  .map(block => (
                    <Box
                      key={block.id}
                      sx={{
                        position: 'absolute',
                        top: block.startSlot * 15,
                        left: 4,
                        right: 4,
                        height: (block.endSlot - block.startSlot) * 15 - 2,
                        bgcolor:
                          block.type === 'busy' ? 'rgba(239, 68, 68, 0.3)' :
                          'rgba(34, 197, 94, 0.3)',
                        border: '2px dashed',
                        borderColor:
                          block.type === 'busy' ? 'error.main' :
                          'success.main',
                        borderRadius: 0.5,
                        p: 0.5,
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                      onClick={() => {
                        // Remove block on click
                        setAvailabilityBlocks(availabilityBlocks.filter(b => b.id !== block.id));
                      }}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem', textTransform: 'capitalize' }}>
                        {block.type}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.65rem' }}>
                        Click to remove
                      </Typography>
                    </Box>
                  ))}
              </Box>
            ))}
          </Box>
        </CardContent>
        </Card>
          </Box>
        </>
      )}

      {/* Connected Calendars Tab Content */}
      {activeTab === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Connected Calendars</Typography>
            <Stack spacing={2}>
              <Box sx={{ p: 2, border: '1px solid', borderColor: 'grey.200', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#4285F4' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>work@company.com</Typography>
                    <Typography variant="caption" color="text.secondary">Google Calendar</Typography>
                  </Box>
                  <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                    Disconnect
                  </Button>
                </Box>
              </Box>
              <Box sx={{ p: 2, border: '1px solid', borderColor: 'grey.200', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#0F9D58' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>personal@gmail.com</Typography>
                    <Typography variant="caption" color="text.secondary">Google Calendar</Typography>
                  </Box>
                  <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                    Disconnect
                  </Button>
                </Box>
              </Box>
              <Box sx={{ p: 2, border: '1px solid', borderColor: 'grey.200', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#EA4335' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>corp@microsoft.com</Typography>
                    <Typography variant="caption" color="text.secondary">Microsoft Calendar</Typography>
                  </Box>
                  <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                    Disconnect
                  </Button>
                </Box>
              </Box>
              <Box sx={{ p: 2, border: '1px solid', borderColor: 'grey.200', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#F4B400' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>me@icloud.com</Typography>
                    <Typography variant="caption" color="text.secondary">Apple Calendar</Typography>
                  </Box>
                  <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                    Disconnect
                  </Button>
                </Box>
              </Box>
              <Box sx={{ p: 2, border: '1px solid', borderColor: 'grey.200', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#AB47BC' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>family@outlook.com</Typography>
                    <Typography variant="caption" color="text.secondary">Outlook Calendar</Typography>
                  </Box>
                  <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                    Disconnect
                  </Button>
                </Box>
              </Box>
            </Stack>
            <Button
              variant="contained"
              size="medium"
              fullWidth
              startIcon={<CalendarTodayIcon />}
              sx={{ textTransform: 'none', mt: 3 }}
            >
              Connect more calendars
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
