'use client';

import { Box, Typography, Button, Card, CardContent, Stack, Checkbox, FormControlLabel, IconButton, Tabs, Tab, Chip } from '@mui/material';
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
  const [layoutOption, setLayoutOption] = useState<'sidebar' | 'compact' | 'minimal'>('sidebar');
  const [calendarFilters, setCalendarFilters] = useState({
    google1: true,
    google2: true,
    microsoft: true,
    apple: true,
    outlook: true
  });

  // Calendar Filters Component (reusable)
  const CalendarFiltersSection = ({ variant = 'default' }: { variant?: 'default' | 'inline' }) => (
    <Box sx={{ maxHeight: variant === 'inline' ? 'none' : 200, overflow: variant === 'inline' ? 'visible' : 'auto' }}>
      <Stack spacing={variant === 'inline' ? 0.5 : 1} direction={variant === 'inline' ? 'row' : 'column'} flexWrap={variant === 'inline' ? 'wrap' : 'nowrap'}>
        {variant === 'inline' ? (
          // Inline chip version
          <>
            <Chip
              label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4285F4' }} />
                <Typography variant="caption">work@company.com</Typography>
              </Box>}
              onClick={() => setCalendarFilters({ ...calendarFilters, google1: !calendarFilters.google1 })}
              variant={calendarFilters.google1 ? 'filled' : 'outlined'}
              size="small"
              sx={{ borderColor: '#4285F4', bgcolor: calendarFilters.google1 ? 'rgba(66, 133, 244, 0.1)' : 'transparent' }}
            />
            <Chip
              label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#0F9D58' }} />
                <Typography variant="caption">personal@gmail.com</Typography>
              </Box>}
              onClick={() => setCalendarFilters({ ...calendarFilters, google2: !calendarFilters.google2 })}
              variant={calendarFilters.google2 ? 'filled' : 'outlined'}
              size="small"
              sx={{ borderColor: '#0F9D58', bgcolor: calendarFilters.google2 ? 'rgba(15, 157, 88, 0.1)' : 'transparent' }}
            />
            <Chip
              label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#EA4335' }} />
                <Typography variant="caption">corp@microsoft.com</Typography>
              </Box>}
              onClick={() => setCalendarFilters({ ...calendarFilters, microsoft: !calendarFilters.microsoft })}
              variant={calendarFilters.microsoft ? 'filled' : 'outlined'}
              size="small"
              sx={{ borderColor: '#EA4335', bgcolor: calendarFilters.microsoft ? 'rgba(234, 67, 53, 0.1)' : 'transparent' }}
            />
            <Chip
              label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#F4B400' }} />
                <Typography variant="caption">me@icloud.com</Typography>
              </Box>}
              onClick={() => setCalendarFilters({ ...calendarFilters, apple: !calendarFilters.apple })}
              variant={calendarFilters.apple ? 'filled' : 'outlined'}
              size="small"
              sx={{ borderColor: '#F4B400', bgcolor: calendarFilters.apple ? 'rgba(244, 180, 0, 0.1)' : 'transparent' }}
            />
            <Chip
              label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#AB47BC' }} />
                <Typography variant="caption">family@outlook.com</Typography>
              </Box>}
              onClick={() => setCalendarFilters({ ...calendarFilters, outlook: !calendarFilters.outlook })}
              variant={calendarFilters.outlook ? 'filled' : 'outlined'}
              size="small"
              sx={{ borderColor: '#AB47BC', bgcolor: calendarFilters.outlook ? 'rgba(171, 71, 188, 0.1)' : 'transparent' }}
            />
          </>
        ) : (
          // Checkbox version
          <>
            <FormControlLabel
              control={
                <Checkbox
                  checked={calendarFilters.google1}
                  onChange={(e) => setCalendarFilters({ ...calendarFilters, google1: e.target.checked })}
                  size="small"
                  sx={{ color: '#4285F4', '&.Mui-checked': { color: '#4285F4' } }}
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
                  sx={{ color: '#0F9D58', '&.Mui-checked': { color: '#0F9D58' } }}
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
                  sx={{ color: '#EA4335', '&.Mui-checked': { color: '#EA4335' } }}
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
                  sx={{ color: '#F4B400', '&.Mui-checked': { color: '#F4B400' } }}
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
                  sx={{ color: '#AB47BC', '&.Mui-checked': { color: '#AB47BC' } }}
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#AB47BC' }} />
                  <Typography variant="body2">family@outlook.com</Typography>
                </Box>
              }
            />
          </>
        )}
      </Stack>
    </Box>
  );

  // Set Availability Section (reusable)
  const SetAvailabilitySection = ({ variant = 'default' }: { variant?: 'default' | 'inline' }) => (
    <>
      {variant === 'inline' ? (
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2" sx={{ fontWeight: 600, mr: 1 }}>Set:</Typography>
          <Button
            variant={selectedBlockType === 'busy' ? 'contained' : 'outlined'}
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
      ) : (
        <>
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
            Drag on the calendar to set {selectedBlockType} times
          </Typography>
        </>
      )}
    </>
  );

  // Calendar Component (reusable)
  const CalendarGrid = () => (
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
              const slotStartHour = 7 + Math.floor(i / 4);
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
                const isInDragRange = isDragging && dragStart && dragStart.day === day &&
                  i >= Math.min(dragStart.slot, i) && i <= Math.max(dragStart.slot, i);
                return (
                  <Box
                    key={i}
                    sx={{
                      height: 15,
                      borderBottom: isHourMark ? '1px solid' : '1px solid',
                      borderColor: isHourMark ? 'grey.300' : 'grey.100',
                      cursor: 'crosshair',
                      bgcolor: isInDragRange
                        ? (selectedBlockType === 'busy' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)')
                        : 'transparent',
                      '&:hover': {
                        bgcolor: !isDragging ? 'grey.50' : undefined
                      }
                    }}
                    onMouseDown={() => {
                      setIsDragging(true);
                      setDragStart({ day, slot: i });
                    }}
                    onMouseUp={() => {
                      if (isDragging && dragStart) {
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
                    onMouseEnter={() => {
                      if (isDragging && dragStart && dragStart.day === day) {
                        // Visual feedback is handled by bgcolor in sx above
                      }
                    }}
                  />
                );
              })}

              {/* Mock calendar events */}
              {day === 1 && calendarFilters.google1 && (
                <>
                  {[
                    { slot: 8, duration: 4, title: 'Stand-up', time: '9:00 - 10:00' },
                    { slot: 14, duration: 6, title: 'Product Review', time: '10:30 - 12:00' },
                    { slot: 28, duration: 4, title: '1:1 with Sarah', time: '2:00 - 3:00' },
                    { slot: 34, duration: 6, title: 'Client Call', time: '3:30 - 5:00' },
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

              {day === 2 && calendarFilters.microsoft && (
                <>
                  {[
                    { slot: 4, duration: 4, title: 'Engineering Sync', time: '8:00 - 9:00' },
                    { slot: 12, duration: 8, title: 'Q2 Planning', time: '10:00 - 12:00' },
                    { slot: 24, duration: 4, title: 'Lunch w/ Team', time: '1:00 - 2:00' },
                    { slot: 32, duration: 6, title: 'Design Review', time: '3:00 - 4:30' },
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

              {day === 3 && calendarFilters.google2 && (
                <>
                  {[
                    { slot: 8, duration: 4, title: 'Stand-up', time: '9:00 - 10:00' },
                    { slot: 16, duration: 6, title: 'Board Meeting', time: '11:00 - 12:30' },
                    { slot: 28, duration: 4, title: 'Interview - Dev', time: '2:00 - 3:00' },
                    { slot: 36, duration: 4, title: 'Vendor Demo', time: '4:00 - 5:00' },
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

              {day === 4 && calendarFilters.apple && (
                <>
                  {[
                    { slot: 8, duration: 4, title: 'Team Standup', time: '9:00 - 10:00' },
                    { slot: 12, duration: 4, title: 'Sales Call', time: '10:00 - 11:00' },
                    { slot: 24, duration: 8, title: 'All Hands', time: '1:00 - 3:00' },
                    { slot: 32, duration: 4, title: '1:1 with John', time: '3:00 - 4:00' },
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

              {day === 5 && calendarFilters.outlook && (
                <>
                  {[
                    { slot: 8, duration: 4, title: 'Stand-up', time: '9:00 - 10:00' },
                    { slot: 12, duration: 6, title: 'Sprint Planning', time: '10:00 - 11:30' },
                    { slot: 24, duration: 4, title: 'Tech Review', time: '1:00 - 2:00' },
                    { slot: 32, duration: 4, title: 'Happy Hour', time: '3:00 - 4:00' },
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
  );

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ fontWeight: 600 }}>
          My Time
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant={layoutOption === 'sidebar' ? 'contained' : 'outlined'}
            onClick={() => setLayoutOption('sidebar')}
            sx={{ textTransform: 'none' }}
          >
            Sidebar
          </Button>
          <Button
            size="small"
            variant={layoutOption === 'compact' ? 'contained' : 'outlined'}
            onClick={() => setLayoutOption('compact')}
            sx={{ textTransform: 'none' }}
          >
            Compact
          </Button>
          <Button
            size="small"
            variant={layoutOption === 'minimal' ? 'contained' : 'outlined'}
            onClick={() => setLayoutOption('minimal')}
            sx={{ textTransform: 'none' }}
          >
            Minimal
          </Button>
        </Stack>
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
          {/* SIDEBAR LAYOUT */}
          {layoutOption === 'sidebar' && (
            <Box sx={{ display: 'flex', gap: 3 }}>
              {/* Left Sidebar */}
              <Box sx={{ width: 220, flexShrink: 0 }}>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>Filters</Typography>
                    <CalendarFiltersSection />
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <SetAvailabilitySection />
                  </CardContent>
                </Card>
              </Box>
              {/* Calendar */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <CalendarGrid />
              </Box>
            </Box>
          )}

          {/* COMPACT LAYOUT */}
          {layoutOption === 'compact' && (
            <>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
                    <Box sx={{ minWidth: 200 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Filters</Typography>
                      <CalendarFiltersSection variant="inline" />
                    </Box>
                    <Box sx={{ borderLeft: '1px solid', borderColor: 'grey.200', pl: 3 }}>
                      <SetAvailabilitySection variant="inline" />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              <CalendarGrid />
            </>
          )}

          {/* MINIMAL LAYOUT */}
          {layoutOption === 'minimal' && (
            <>
              <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <CalendarFiltersSection variant="inline" />
                </Box>
                <SetAvailabilitySection variant="inline" />
              </Box>
              <CalendarGrid />
            </>
          )}
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
