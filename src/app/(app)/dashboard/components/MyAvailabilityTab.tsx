'use client';

import { Box, Typography, Button, Card, CardContent, Stack, Checkbox, FormControlLabel, Chip, IconButton } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';

export default function MyAvailabilityTab({ isMobile = false }: { isMobile?: boolean }) {
  const [availabilityBlocks, setAvailabilityBlocks] = useState<any[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ day: number; hour: number } | null>(null);
  const [selectedBlockType, setSelectedBlockType] = useState<'busy' | 'available'>('busy');
  const [calendarFilters, setCalendarFilters] = useState({
    google: true,
    microsoft: true
  });

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ fontWeight: 600 }}>
          My Time
        </Typography>
      </Box>

      {/* Controls Row - Horizontal Layout */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: isMobile ? 'column' : 'row' }}>
        {/* Connected Calendars Summary with Filters */}
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>Connected Calendars</Typography>
            <Stack spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={calendarFilters.google}
                    onChange={(e) => setCalendarFilters({ ...calendarFilters, google: e.target.checked })}
                    size="small"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">work@company.com</Typography>
                    <Chip label="Primary" size="small" sx={{ height: 20, fontSize: '0.65rem' }} />
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={calendarFilters.microsoft}
                    onChange={(e) => setCalendarFilters({ ...calendarFilters, microsoft: e.target.checked })}
                    size="small"
                  />
                }
                label={
                  <Typography variant="body2">personal@outlook.com</Typography>
                }
              />
            </Stack>
            <Button
              variant="text"
              size="small"
              fullWidth
              startIcon={<CalendarTodayIcon />}
              sx={{ textTransform: 'none', mt: 2 }}
            >
              Connect more
            </Button>
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
              {Array.from({ length: 12 }, (_, i) => {
                const hour = i + 7; // Start at 7 AM
                return (
                  <Box key={hour} sx={{ height: 60, display: 'flex', alignItems: 'start', justifyContent: 'center', pt: 0.5, borderBottom: '1px solid', borderColor: 'grey.100' }}>
                    <Typography variant="caption" color="text.secondary">
                      {hour === 12 ? '12 PM' : hour < 12 ? `${hour} AM` : `${hour - 12} PM`}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            {/* Day columns */}
            {[0, 1, 2, 3, 4, 5, 6].map((day) => (
              <Box key={day} sx={{ borderLeft: '1px solid', borderColor: 'grey.200', position: 'relative' }}>
                {/* Hour slots */}
                {Array.from({ length: 12 }, (_, i) => {
                  const hour = i + 7; // Start at 7 AM
                  return (
                    <Box
                      key={hour}
                      sx={{
                        height: 60,
                        borderBottom: '1px solid',
                        borderColor: 'grey.100',
                        cursor: 'crosshair',
                        '&:hover': {
                          bgcolor: 'grey.50'
                        }
                      }}
                      onMouseDown={() => {
                        setIsDragging(true);
                        setDragStart({ day, hour });
                      }}
                      onMouseUp={() => {
                        if (isDragging && dragStart) {
                          // Create block
                          const newBlock = {
                            id: Date.now(),
                            day,
                            startHour: Math.min(dragStart.hour, hour),
                            endHour: Math.max(dragStart.hour, hour) + 1,
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
                {day === 1 && calendarFilters.google && (
                  <>
                    {[
                      { top: (9-7), height: 60, title: 'Stand-up', time: '9:00 - 10:00' },
                      { top: (10.5-7), height: 90, title: 'Product Review', time: '10:30 - 12:00' },
                      { top: (14-7), height: 60, title: '1:1 with Sarah', time: '2:00 - 3:00' },
                      { top: (15.5-7), height: 90, title: 'Client Call', time: '3:30 - 5:00' },
                    ].map((event, i) => (
                      <Box key={i} sx={{
                        position: 'absolute',
                        top: event.top * 60,
                        left: 4,
                        right: 4,
                        height: event.height,
                        bgcolor: 'background.accent',
                        border: '1px solid',
                        borderColor: 'primary.main',
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
                      { top: (8-7), height: 60, title: 'Engineering Sync', time: '8:00 - 9:00' },
                      { top: (10-7), height: 120, title: 'Q2 Planning', time: '10:00 - 12:00' },
                      { top: (13-7), height: 60, title: 'Lunch w/ Team', time: '1:00 - 2:00' },
                      { top: (15-7), height: 90, title: 'Design Review', time: '3:00 - 4:30' },
                    ].map((event, i) => (
                      <Box key={i} sx={{
                        position: 'absolute',
                        top: event.top * 60,
                        left: 4,
                        right: 4,
                        height: event.height,
                        bgcolor: 'background.accent',
                        border: '1px solid',
                        borderColor: 'primary.main',
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
                {day === 3 && calendarFilters.google && (
                  <>
                    {[
                      { top: (9-7), height: 60, title: 'Stand-up', time: '9:00 - 10:00' },
                      { top: (11-7), height: 90, title: 'Board Meeting', time: '11:00 - 12:30' },
                      { top: (14-7), height: 60, title: 'Interview - Dev', time: '2:00 - 3:00' },
                      { top: (16-7), height: 60, title: 'Vendor Demo', time: '4:00 - 5:00' },
                    ].map((event, i) => (
                      <Box key={i} sx={{
                        position: 'absolute',
                        top: event.top * 60,
                        left: 4,
                        right: 4,
                        height: event.height,
                        bgcolor: 'background.accent',
                        border: '1px solid',
                        borderColor: 'primary.main',
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

                {/* Thursday - day 4 - Microsoft Calendar */}
                {day === 4 && calendarFilters.microsoft && (
                  <>
                    {[
                      { top: (9-7), height: 60, title: 'Team Standup', time: '9:00 - 10:00' },
                      { top: (10-7), height: 60, title: 'Sales Call', time: '10:00 - 11:00' },
                      { top: (13-7), height: 120, title: 'All Hands', time: '1:00 - 3:00' },
                      { top: (15-7), height: 60, title: '1:1 with John', time: '3:00 - 4:00' },
                    ].map((event, i) => (
                      <Box key={i} sx={{
                        position: 'absolute',
                        top: event.top * 60,
                        left: 4,
                        right: 4,
                        height: event.height,
                        bgcolor: 'background.accent',
                        border: '1px solid',
                        borderColor: 'primary.main',
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

                {/* Friday - day 5 - Google Calendar */}
                {day === 5 && calendarFilters.google && (
                  <>
                    {[
                      { top: (9-7), height: 60, title: 'Stand-up', time: '9:00 - 10:00' },
                      { top: (10-7), height: 90, title: 'Sprint Planning', time: '10:00 - 11:30' },
                      { top: (13-7), height: 60, title: 'Tech Review', time: '1:00 - 2:00' },
                      { top: (15-7), height: 60, title: 'Happy Hour', time: '3:00 - 4:00' },
                    ].map((event, i) => (
                      <Box key={i} sx={{
                        position: 'absolute',
                        top: event.top * 60,
                        left: 4,
                        right: 4,
                        height: event.height,
                        bgcolor: 'background.accent',
                        border: '1px solid',
                        borderColor: 'primary.main',
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
                        top: (block.startHour - 7) * 60,
                        left: 4,
                        right: 4,
                        height: (block.endHour - block.startHour) * 60 - 2,
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
    </Box>
  );
}
