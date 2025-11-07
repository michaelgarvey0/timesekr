'use client';

import { Box, Typography, TextField, Button, IconButton, Stack, Chip, Autocomplete, Avatar, AppBar, Toolbar, Menu, MenuItem, Badge, Stepper, Step, StepLabel, Card, CardContent, ButtonGroup, Switch, FormControlLabel, Collapse, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddIcon from '@mui/icons-material/Add';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dayjs, { Dayjs } from 'dayjs';

interface Attendee {
  id: string;
  email: string;
  name?: string;
  isContact: boolean;
  onPlatform: boolean; // true if they're on timesēkr, false if they need email invite
}

interface ParticipantStatus {
  attendee: Attendee;
  available: boolean;
  status: 'available' | 'busy' | 'unknown';
}

interface TimeSlot {
  id: number;
  day: string;
  time: string;
  available: number;
  total: number;
  type: 'perfect' | 'good' | 'partial';
  participants: ParticipantStatus[];
}

const mockContacts: Attendee[] = [
  { id: 'contact-1', email: 'john@example.com', name: 'John Doe', isContact: true, onPlatform: true },
  { id: 'contact-2', email: 'jane@example.com', name: 'Jane Smith', isContact: true, onPlatform: true },
  { id: 'contact-3', email: 'bob@company.com', name: 'Bob Johnson', isContact: true, onPlatform: true },
];

// Mock users on platform but not in contacts
const mockPlatformUsers: Attendee[] = [
  { id: 'platform-1', email: 'sarah@startup.io', name: 'Sarah Chen', isContact: false, onPlatform: true },
  { id: 'platform-2', email: 'mike@tech.com', name: 'Mike Wilson', isContact: false, onPlatform: true },
];

export default function CreateMeetingPage() {
  const router = useRouter();
  const [version, setVersion] = useState(1); // Toggle between 3 versions
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Common state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(60);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);

  // Date range and attendance
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs().add(7, 'day'));
  const [isAttending, setIsAttending] = useState(true);

  // Version 1: Stepper state
  const [activeStep, setActiveStep] = useState(0);

  // Email preview state
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  // Expanded slot details
  const [expandedSlot, setExpandedSlot] = useState<number | null>(null);

  // "Me" attendee
  const meAttendee: Attendee = {
    id: 'me',
    email: 'me@timesekr.com',
    name: 'Me',
    isContact: true,
    onPlatform: true,
  };

  // All participants including me if attending
  const allParticipants = isAttending ? [meAttendee, ...attendees] : attendees;

  // Mock suggested times with detailed participant availability
  const suggestedTimes: TimeSlot[] = allParticipants.length > 0 ? [
    {
      id: 1,
      day: 'Wed, Jan 15',
      time: '10:00 AM',
      available: allParticipants.length,
      total: allParticipants.length,
      type: 'perfect',
      participants: allParticipants.map(a => ({ attendee: a, available: true, status: 'available' as const }))
    },
    {
      id: 2,
      day: 'Thu, Jan 16',
      time: '2:00 PM',
      available: allParticipants.length,
      total: allParticipants.length,
      type: 'perfect',
      participants: allParticipants.map(a => ({ attendee: a, available: true, status: 'available' as const }))
    },
    {
      id: 3,
      day: 'Fri, Jan 17',
      time: '1:00 PM',
      available: Math.floor(allParticipants.length * 0.8),
      total: allParticipants.length,
      type: 'good',
      participants: allParticipants.map((a, i) => ({
        attendee: a,
        available: i < Math.floor(allParticipants.length * 0.8),
        status: (i < Math.floor(allParticipants.length * 0.8) ? 'available' : 'busy') as const
      }))
    },
    {
      id: 4,
      day: 'Tue, Jan 14',
      time: '3:00 PM',
      available: Math.floor(allParticipants.length * 0.6),
      total: allParticipants.length,
      type: 'partial',
      participants: allParticipants.map((a, i) => ({
        attendee: a,
        available: i < Math.floor(allParticipants.length * 0.6),
        status: (i < Math.floor(allParticipants.length * 0.6) ? 'available' : 'busy') as const
      }))
    },
    {
      id: 5,
      day: 'Mon, Jan 13',
      time: '4:00 PM',
      available: Math.floor(allParticipants.length * 0.5),
      total: allParticipants.length,
      type: 'partial',
      participants: allParticipants.map((a, i) => ({
        attendee: a,
        available: i < Math.floor(allParticipants.length * 0.5),
        status: (i < Math.floor(allParticipants.length * 0.5) ? 'available' : 'busy') as const
      }))
    },
  ] : [];

  // Categorize times by availability
  const everyoneAvailable = suggestedTimes.filter(t => t.available === t.total);
  const mostAvailable = suggestedTimes.filter(t => t.available >= t.total * 0.8 && t.available < t.total);
  const someConflicts = suggestedTimes.filter(t => t.available < t.total * 0.8);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Get attendee status with MUI icons
  const getAttendeeIcon = (attendee: Attendee) => {
    if (attendee.isContact) {
      return <AccountCircleIcon sx={{ fontSize: '1rem' }} />;
    } else if (attendee.onPlatform) {
      return <PersonAddIcon sx={{ fontSize: '1rem' }} />;
    } else {
      return <EmailIcon sx={{ fontSize: '1rem' }} />;
    }
  };

  const handleAddAttendee = (value: string | Attendee | null) => {
    if (!value) return;

    let newAttendee: Attendee;
    if (typeof value === 'string') {
      const email = value.trim().toLowerCase();

      // Check if in contacts first
      const matchingContact = mockContacts.find(c => c.email.toLowerCase() === email);
      if (matchingContact) {
        newAttendee = matchingContact;
      } else {
        // Check if on platform but not in contacts
        const matchingPlatformUser = mockPlatformUsers.find(u => u.email.toLowerCase() === email);
        if (matchingPlatformUser) {
          newAttendee = matchingPlatformUser;
        } else {
          // Not on platform - will get email invite
          newAttendee = {
            id: Date.now().toString(),
            email: value.trim(),
            isContact: false,
            onPlatform: false,
          };
        }
      }
    } else {
      newAttendee = { ...value, id: Date.now().toString() };
    }

    if (attendees.some(a => a.email === newAttendee.email)) {
      setInputValue('');
      return;
    }

    setAttendees([...attendees, newAttendee]);
    setInputValue('');
  };

  // Render participant status for a time slot
  const renderParticipantStatus = (participants: ParticipantStatus[]) => {
    return (
      <Stack spacing={1} sx={{ mt: 2 }}>
        {participants.map((p) => (
          <Box
            key={p.attendee.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 1,
              borderRadius: '6px',
              bgcolor: p.status === 'available' ? '#f0fdf4' : p.status === 'busy' ? '#fef2f2' : '#f8fafc',
            }}
          >
            <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
              {p.attendee.name?.charAt(0) || p.attendee.email.charAt(0)}
            </Avatar>
            <Typography variant="body2" sx={{ flex: 1, fontSize: '0.875rem' }}>
              {p.attendee.name || p.attendee.email}
            </Typography>
            <Chip
              label={p.status === 'available' ? 'Free' : p.status === 'busy' ? 'Busy' : 'Unknown'}
              size="small"
              sx={{
                bgcolor: p.status === 'available' ? '#22c55e' : p.status === 'busy' ? '#ef4444' : '#94a3b8',
                color: 'white',
                fontSize: '0.75rem',
                height: '20px',
              }}
            />
          </Box>
        ))}
      </Stack>
    );
  };

  // EMAIL PREVIEW FOR NON-REGISTERED USERS
  const renderEmailPreview = () => {
    const selectedTimes = suggestedTimes.filter(t => selectedSlots.includes(t.id));

    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 4 }}>
        <Box sx={{ maxWidth: 700, mx: 'auto', px: 3 }}>
          {/* Email Client Header */}
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => setShowEmailPreview(false)}>
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <Typography variant="caption" color="text.secondary">Preview: Email to non-registered users</Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Meeting Request: {title}</Typography>
            </Box>
          </Box>

          {/* Email Card */}
          <Card sx={{ boxShadow: 3 }}>
            <CardContent sx={{ p: 4 }}>
              {/* Email Header */}
              <Box sx={{ borderBottom: '2px solid #f0f0f0', pb: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                    <EventIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      You're invited: {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      from {meAttendee.name || meAttendee.email}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Email Body */}
              <Stack spacing={3}>
                <Typography variant="body1">
                  Hi there,
                </Typography>

                <Typography variant="body1">
                  I'd like to schedule a meeting with you. Please vote on the times that work best for you:
                </Typography>

                {/* Time Options */}
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
                    Which times work for you? (Select all that work)
                  </Typography>
                  <Stack spacing={2}>
                    {selectedTimes.map((slot) => (
                      <Box
                        key={slot.id}
                        sx={{
                          p: 2.5,
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.2s',
                          cursor: 'pointer',
                          '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: '#f0f9ff',
                          }
                        }}
                      >
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {slot.day}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            {slot.time}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {duration} minutes
                          </Typography>
                        </Box>
                        <Button variant="contained" sx={{ textTransform: 'none' }}>
                          This works
                        </Button>
                      </Box>
                    ))}
                  </Stack>
                </Box>

                {/* CTA Section */}
                <Box sx={{ mt: 3, p: 3, bgcolor: '#f0f9ff', borderRadius: '12px', border: '1px solid #e0f2fe' }}>
                  <Box sx={{ display: 'flex', alignItems: 'start', gap: 2, mb: 2 }}>
                    <AutoAwesomeIcon sx={{ color: 'primary.main', mt: 0.5 }} />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        Can't make any of these times?
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Connect your calendar and suggest times that work better for you.
                        It takes 30 seconds and makes scheduling so much easier.
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ textTransform: 'none', fontWeight: 600 }}
                  >
                    Join timesēkr & Suggest Other Times
                  </Button>
                </Box>

                {/* Decline */}
                <Box sx={{ textAlign: 'center' }}>
                  <Button
                    variant="text"
                    color="error"
                    sx={{ textTransform: 'none' }}
                  >
                    I can't attend this meeting
                  </Button>
                </Box>

                {/* Footer */}
                <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #e5e7eb' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                    Meeting details:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Duration: {duration} minutes
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Attendees: {allParticipants.length} people
                  </Typography>
                  {description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {description}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Sent via timesēkr - Multi-party scheduling made simple
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>
    );
  };

  // VERSION 1: STEP-BY-STEP WIZARD
  const renderVersion1 = () => {
    const steps = ['Details', 'Attendees', 'Times', 'Review'];

    return (
      <Box>
        <Box sx={{ maxWidth: 800, mx: 'auto', px: 3, py: 4 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Card sx={{ border: '1px solid #e5e7eb' }}>
            <CardContent sx={{ p: 4 }}>
              {activeStep === 0 && (
                <Stack spacing={3}>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>Meeting Details</Typography>
                  <TextField
                    fullWidth
                    label="Meeting Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Q1 Planning Session"
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Box>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>Duration</Typography>
                    <Stack direction="row" spacing={1}>
                      {[30, 60, 90].map((mins) => (
                        <Button
                          key={mins}
                          variant={duration === mins ? 'contained' : 'outlined'}
                          onClick={() => setDuration(mins)}
                          sx={{ textTransform: 'none' }}
                        >
                          {mins}min
                        </Button>
                      ))}
                    </Stack>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box>
                    <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>Time Window to Search</Typography>
                    <Stack direction="row" spacing={2}>
                      <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                        slotProps={{ textField: { fullWidth: true } }}
                      />
                      <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                        minDate={startDate || undefined}
                        slotProps={{ textField: { fullWidth: true } }}
                      />
                    </Stack>
                  </Box>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={isAttending}
                        onChange={(e) => setIsAttending(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="I am attending this meeting"
                  />

                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => setActiveStep(1)}
                    disabled={!title || !startDate || !endDate}
                    sx={{ textTransform: 'none' }}
                  >
                    Next: Add Attendees
                  </Button>
                </Stack>
              )}

              {activeStep === 1 && (
                <Stack spacing={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>Who's attending?</Typography>
                    <Chip label={`${attendees.length} people`} />
                  </Box>

                  <Autocomplete
                    multiple
                    freeSolo
                    options={
                      inputValue.trim() && !mockContacts.some(c => c.email.toLowerCase().includes(inputValue.toLowerCase()) || c.name?.toLowerCase().includes(inputValue.toLowerCase()))
                        ? [...mockContacts, { id: 'add-new', email: inputValue.trim(), isContact: false, onPlatform: false }]
                        : mockContacts
                    }
                    value={attendees || []}
                    inputValue={inputValue}
                    onInputChange={(e, newValue) => setInputValue(newValue)}
                    onChange={(e, newValue) => {
                      if (!newValue) {
                        setAttendees([]);
                        return;
                      }

                      // Handle removing
                      if (newValue.length < attendees.length) {
                        setAttendees(newValue.filter((item): item is Attendee => typeof item !== 'string'));
                      } else {
                        // Handle adding
                        const lastItem = newValue[newValue.length - 1];
                        if (lastItem) {
                          handleAddAttendee(lastItem);
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && inputValue.trim()) {
                        e.preventDefault();
                        handleAddAttendee(inputValue.trim());
                      }
                    }}
                    getOptionLabel={(option) => typeof option === 'string' ? option : option.name || option.email}
                    filterOptions={(options, state) => {
                      const filtered = options.filter(option => {
                        if (option.id === 'add-new') return true;
                        const searchTerm = state.inputValue.toLowerCase();
                        return (
                          option.email.toLowerCase().includes(searchTerm) ||
                          option.name?.toLowerCase().includes(searchTerm)
                        );
                      });
                      return filtered;
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder={attendees.length === 0 ? "Add people by name or email" : ""}
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'nope',
                          'data-lpignore': 'true',
                          'data-form-type': 'other',
                        }}
                        autoComplete="nope"
                        name={`attendee-${Math.random()}`}
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      (value || []).map((option, index) => {
                        if (typeof option === 'string') return null;
                        const { key, ...tagProps } = getTagProps({ index });
                        return (
                          <Chip
                            key={key}
                            label={option.name || option.email}
                            {...tagProps}
                            icon={getAttendeeIcon(option)}
                            color="primary"
                          />
                        );
                      })
                    }
                    renderOption={(props, option) => {
                      const { key, ...otherProps } = props;
                      if (typeof option === 'string') return null;

                      if (option.id === 'add-new') {
                        return (
                          <Box component="li" key={key} {...otherProps} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <AddIcon sx={{ color: 'primary.main' }} />
                            <Typography variant="body2">Add "{option.email}"</Typography>
                          </Box>
                        );
                      }

                      return (
                        <Box component="li" key={key} {...otherProps} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <Avatar sx={{ width: 32, height: 32 }}>
                            {option.name?.charAt(0) || option.email.charAt(0)}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2">{option.name}</Typography>
                            <Typography variant="caption" color="text.secondary">{option.email}</Typography>
                          </Box>
                        </Box>
                      );
                    }}
                  />

                  <Stack direction="row" spacing={2}>
                    <Button variant="outlined" onClick={() => setActiveStep(0)} sx={{ textTransform: 'none' }}>
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => setActiveStep(2)}
                      disabled={attendees.length === 0}
                      sx={{ textTransform: 'none', flex: 1 }}
                    >
                      Next: Find Times
                    </Button>
                  </Stack>
                </Stack>
              )}

              {activeStep === 2 && (
                <Stack spacing={3}>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>Pick up to 3 times</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Searching {startDate?.format('MMM D')} to {endDate?.format('MMM D, YYYY')}
                  </Typography>

                  {suggestedTimes.length === 0 ? (
                    <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#f8fafc', borderRadius: '8px' }}>
                      <Typography color="text.secondary">Add attendees to see suggested times</Typography>
                    </Box>
                  ) : (
                    <>
                      {/* Everyone Available */}
                      {everyoneAvailable.length > 0 && (
                        <Box>
                          <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 600, color: '#22c55e' }}>
                            ✓ Everyone Available ({everyoneAvailable.length})
                          </Typography>
                          <Stack spacing={1.5}>
                            {everyoneAvailable.map((slot) => (
                              <Box key={slot.id}>
                                <Box
                                  onClick={() => {
                                    if (selectedSlots.includes(slot.id)) {
                                      setSelectedSlots(selectedSlots.filter(id => id !== slot.id));
                                    } else if (selectedSlots.length < 3) {
                                      setSelectedSlots([...selectedSlots, slot.id]);
                                    }
                                  }}
                                  sx={{
                                    p: 2,
                                    border: '2px solid',
                                    borderColor: selectedSlots.includes(slot.id) ? 'primary.main' : '#e5e7eb',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    bgcolor: selectedSlots.includes(slot.id) ? '#f0f9ff' : 'white',
                                    '&:hover': { borderColor: 'primary.main' },
                                  }}
                                >
                                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box>
                                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{slot.day}</Typography>
                                      <Typography variant="h6" sx={{ fontWeight: 700 }}>{slot.time}</Typography>
                                      <Typography variant="caption" color="text.secondary">
                                        All {slot.total} people free
                                      </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <IconButton
                                        size="small"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setExpandedSlot(expandedSlot === slot.id ? null : slot.id);
                                        }}
                                      >
                                        {expandedSlot === slot.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                      </IconButton>
                                      {selectedSlots.includes(slot.id) && <CheckCircleIcon color="primary" />}
                                    </Box>
                                  </Box>
                                </Box>
                                <Collapse in={expandedSlot === slot.id}>
                                  <Box sx={{ pl: 2, pr: 2 }}>
                                    {renderParticipantStatus(slot.participants)}
                                  </Box>
                                </Collapse>
                              </Box>
                            ))}
                          </Stack>
                        </Box>
                      )}

                      {/* Most Available */}
                      {mostAvailable.length > 0 && (
                        <Box>
                          <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 600, color: '#3b82f6' }}>
                            ◐ Most Available ({mostAvailable.length})
                          </Typography>
                          <Stack spacing={1.5}>
                            {mostAvailable.map((slot) => (
                              <Box key={slot.id}>
                                <Box
                                  onClick={() => {
                                    if (selectedSlots.includes(slot.id)) {
                                      setSelectedSlots(selectedSlots.filter(id => id !== slot.id));
                                    } else if (selectedSlots.length < 3) {
                                      setSelectedSlots([...selectedSlots, slot.id]);
                                    }
                                  }}
                                  sx={{
                                    p: 2,
                                    border: '2px solid',
                                    borderColor: selectedSlots.includes(slot.id) ? 'primary.main' : '#e5e7eb',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    bgcolor: selectedSlots.includes(slot.id) ? '#f0f9ff' : 'white',
                                    '&:hover': { borderColor: 'primary.main' },
                                  }}
                                >
                                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box>
                                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{slot.day}</Typography>
                                      <Typography variant="h6" sx={{ fontWeight: 700 }}>{slot.time}</Typography>
                                      <Typography variant="caption" color="text.secondary">
                                        {slot.available}/{slot.total} people free
                                      </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <IconButton
                                        size="small"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setExpandedSlot(expandedSlot === slot.id ? null : slot.id);
                                        }}
                                      >
                                        {expandedSlot === slot.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                      </IconButton>
                                      {selectedSlots.includes(slot.id) && <CheckCircleIcon color="primary" />}
                                    </Box>
                                  </Box>
                                </Box>
                                <Collapse in={expandedSlot === slot.id}>
                                  <Box sx={{ pl: 2, pr: 2 }}>
                                    {renderParticipantStatus(slot.participants)}
                                  </Box>
                                </Collapse>
                              </Box>
                            ))}
                          </Stack>
                        </Box>
                      )}

                      {/* Some Conflicts */}
                      {someConflicts.length > 0 && (
                        <Box>
                          <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 600, color: '#f59e0b' }}>
                            ⚠ Some Conflicts ({someConflicts.length})
                          </Typography>
                          <Stack spacing={1.5}>
                            {someConflicts.map((slot) => (
                              <Box key={slot.id}>
                                <Box
                                  onClick={() => {
                                    if (selectedSlots.includes(slot.id)) {
                                      setSelectedSlots(selectedSlots.filter(id => id !== slot.id));
                                    } else if (selectedSlots.length < 3) {
                                      setSelectedSlots([...selectedSlots, slot.id]);
                                    }
                                  }}
                                  sx={{
                                    p: 2,
                                    border: '2px solid',
                                    borderColor: selectedSlots.includes(slot.id) ? 'primary.main' : '#e5e7eb',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    bgcolor: selectedSlots.includes(slot.id) ? '#f0f9ff' : 'white',
                                    '&:hover': { borderColor: 'primary.main' },
                                  }}
                                >
                                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box>
                                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{slot.day}</Typography>
                                      <Typography variant="h6" sx={{ fontWeight: 700 }}>{slot.time}</Typography>
                                      <Typography variant="caption" color="text.secondary">
                                        {slot.available}/{slot.total} people free
                                      </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <IconButton
                                        size="small"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setExpandedSlot(expandedSlot === slot.id ? null : slot.id);
                                        }}
                                      >
                                        {expandedSlot === slot.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                      </IconButton>
                                      {selectedSlots.includes(slot.id) && <CheckCircleIcon color="primary" />}
                                    </Box>
                                  </Box>
                                </Box>
                                <Collapse in={expandedSlot === slot.id}>
                                  <Box sx={{ pl: 2, pr: 2 }}>
                                    {renderParticipantStatus(slot.participants)}
                                  </Box>
                                </Collapse>
                              </Box>
                            ))}
                          </Stack>
                        </Box>
                      )}

                      <Stack direction="row" spacing={2}>
                        <Button variant="outlined" onClick={() => setActiveStep(1)} sx={{ textTransform: 'none' }}>
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => setActiveStep(3)}
                          disabled={selectedSlots.length === 0}
                          sx={{ textTransform: 'none', flex: 1 }}
                        >
                          Review & Send
                        </Button>
                      </Stack>
                    </>
                  )}
                </Stack>
              )}

              {activeStep === 3 && (
                <Stack spacing={3}>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>Review Meeting Request</Typography>

                  <Box sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: '12px' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Meeting</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>{title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {duration} minutes • {attendees.length} attendees • {selectedSlots.length} time options
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<SendIcon />}
                    onClick={() => setShowEmailPreview(true)}
                    sx={{ textTransform: 'none' }}
                  >
                    Send Meeting Request
                  </Button>

                  <Button variant="text" onClick={() => setActiveStep(2)} sx={{ textTransform: 'none' }}>
                    Go Back
                  </Button>
                </Stack>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    );
  };

  // VERSION 2: SPLIT VIEW (COMPACT & CLEAN)
  const renderVersion2 = () => {
    return (
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 4 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          {/* Left: Form */}
          <Card sx={{ border: '1px solid #e5e7eb', height: 'fit-content' }}>
            <CardContent sx={{ p: 3 }}>
              <Stack spacing={2.5}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Meeting Details</Typography>

                <TextField
                  fullWidth
                  size="small"
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Team Sync"
                />

                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>Duration</Typography>
                  <ButtonGroup size="small">
                    {[30, 60, 90].map((mins) => (
                      <Button
                        key={mins}
                        variant={duration === mins ? 'contained' : 'outlined'}
                        onClick={() => setDuration(mins)}
                      >
                        {mins}m
                      </Button>
                    ))}
                  </ButtonGroup>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 600 }}>Time Window</Typography>
                  <Stack spacing={1.5}>
                    <DatePicker
                      label="Start"
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                      slotProps={{ textField: { size: 'small', fullWidth: true } }}
                    />
                    <DatePicker
                      label="End"
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue)}
                      minDate={startDate || undefined}
                      slotProps={{ textField: { size: 'small', fullWidth: true } }}
                    />
                  </Stack>
                </Box>

                <FormControlLabel
                  control={
                    <Switch
                      checked={isAttending}
                      onChange={(e) => setIsAttending(e.target.checked)}
                      size="small"
                    />
                  }
                  label={<Typography variant="body2">I'm attending</Typography>}
                />

                <Divider />

                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>Attendees</Typography>
                  <Autocomplete
                    multiple
                    size="small"
                    freeSolo
                    options={
                      inputValue.trim() && !mockContacts.some(c => c.email.toLowerCase().includes(inputValue.toLowerCase()) || c.name?.toLowerCase().includes(inputValue.toLowerCase()))
                        ? [...mockContacts, { id: 'add-new', email: inputValue.trim(), isContact: false, onPlatform: false }]
                        : mockContacts
                    }
                    value={attendees || []}
                    inputValue={inputValue}
                    onInputChange={(e, newValue) => setInputValue(newValue)}
                    onChange={(e, newValue) => {
                      if (!newValue) {
                        setAttendees([]);
                        return;
                      }

                      if (newValue.length < attendees.length) {
                        setAttendees(newValue.filter((item): item is Attendee => typeof item !== 'string'));
                      } else {
                        const lastItem = newValue[newValue.length - 1];
                        if (lastItem) {
                          handleAddAttendee(lastItem);
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && inputValue.trim()) {
                        e.preventDefault();
                        handleAddAttendee(inputValue.trim());
                      }
                    }}
                    getOptionLabel={(option) => typeof option === 'string' ? option : option.name || option.email}
                    filterOptions={(options, state) => {
                      const filtered = options.filter(option => {
                        if (option.id === 'add-new') return true;
                        const searchTerm = state.inputValue.toLowerCase();
                        return (
                          option.email.toLowerCase().includes(searchTerm) ||
                          option.name?.toLowerCase().includes(searchTerm)
                        );
                      });
                      return filtered;
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder={attendees.length === 0 ? "Add people..." : ""}
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'nope',
                          'data-lpignore': 'true',
                          'data-form-type': 'other',
                        }}
                        autoComplete="nope"
                        name={`attendee-${Math.random()}`}
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      (value || []).map((option, index) => {
                        if (typeof option === 'string') return null;
                        const { key, ...tagProps } = getTagProps({ index });
                        return (
                          <Chip
                            key={key}
                            label={option.name || option.email}
                            {...tagProps}
                            size="small"
                            icon={getAttendeeIcon(option)}
                            color="primary"
                            sx={{ maxWidth: '150px' }}
                          />
                        );
                      })
                    }
                    renderOption={(props, option) => {
                      const { key, ...otherProps } = props;
                      if (typeof option === 'string') return null;

                      if (option.id === 'add-new') {
                        return (
                          <Box component="li" key={key} {...otherProps} sx={{ display: 'flex', gap: 1, alignItems: 'center', fontSize: '0.875rem' }}>
                            <AddIcon sx={{ color: 'primary.main', fontSize: '1rem' }} />
                            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>Add "{option.email}"</Typography>
                          </Box>
                        );
                      }

                      return (
                        <Box component="li" key={key} {...otherProps} sx={{ display: 'flex', gap: 1, alignItems: 'center', fontSize: '0.875rem' }}>
                          <Avatar sx={{ width: 28, height: 28, fontSize: '0.75rem' }}>
                            {option.name?.charAt(0) || option.email.charAt(0)}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>{option.name}</Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>{option.email}</Typography>
                          </Box>
                        </Box>
                      );
                    }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Right: Suggested Times */}
          <Card sx={{ border: '1px solid #e5e7eb' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Suggested Times</Typography>
              {startDate && endDate && (
                <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                  {startDate.format('MMM D')} - {endDate.format('MMM D, YYYY')}
                </Typography>
              )}

              {attendees.length === 0 ? (
                <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#f8fafc', borderRadius: '8px' }}>
                  <GroupsIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Add attendees to see available times
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={2.5} sx={{ maxHeight: '70vh', overflowY: 'auto', pr: 1 }}>
                  {/* Everyone Available */}
                  {everyoneAvailable.length > 0 && (
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: '#22c55e', mb: 1, display: 'block' }}>
                        ✓ EVERYONE AVAILABLE
                      </Typography>
                      <Stack spacing={1}>
                        {everyoneAvailable.map((slot) => (
                          <Box key={slot.id}>
                            <Box
                              onClick={() => {
                                if (selectedSlots.includes(slot.id)) {
                                  setSelectedSlots(selectedSlots.filter(id => id !== slot.id));
                                } else if (selectedSlots.length < 3) {
                                  setSelectedSlots([...selectedSlots, slot.id]);
                                }
                              }}
                              sx={{
                                p: 1.5,
                                border: '2px solid',
                                borderColor: selectedSlots.includes(slot.id) ? 'primary.main' : '#e5e7eb',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                bgcolor: selectedSlots.includes(slot.id) ? '#f0f9ff' : 'white',
                                '&:hover': { borderColor: 'primary.main' },
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                                    {slot.day} • {slot.time}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    All {slot.total} free
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setExpandedSlot(expandedSlot === slot.id ? null : slot.id);
                                    }}
                                  >
                                    {expandedSlot === slot.id ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                                  </IconButton>
                                  {selectedSlots.includes(slot.id) && <CheckCircleIcon color="primary" fontSize="small" />}
                                </Box>
                              </Box>
                            </Box>
                            <Collapse in={expandedSlot === slot.id}>
                              <Box sx={{ pl: 1.5, pr: 1.5, pb: 1 }}>
                                {renderParticipantStatus(slot.participants)}
                              </Box>
                            </Collapse>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  )}

                  {/* Most Available */}
                  {mostAvailable.length > 0 && (
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: '#3b82f6', mb: 1, display: 'block' }}>
                        ◐ MOST AVAILABLE
                      </Typography>
                      <Stack spacing={1}>
                        {mostAvailable.map((slot) => (
                          <Box key={slot.id}>
                            <Box
                              onClick={() => {
                                if (selectedSlots.includes(slot.id)) {
                                  setSelectedSlots(selectedSlots.filter(id => id !== slot.id));
                                } else if (selectedSlots.length < 3) {
                                  setSelectedSlots([...selectedSlots, slot.id]);
                                }
                              }}
                              sx={{
                                p: 1.5,
                                border: '2px solid',
                                borderColor: selectedSlots.includes(slot.id) ? 'primary.main' : '#e5e7eb',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                bgcolor: selectedSlots.includes(slot.id) ? '#f0f9ff' : 'white',
                                '&:hover': { borderColor: 'primary.main' },
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                                    {slot.day} • {slot.time}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {slot.available}/{slot.total} free
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setExpandedSlot(expandedSlot === slot.id ? null : slot.id);
                                    }}
                                  >
                                    {expandedSlot === slot.id ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                                  </IconButton>
                                  {selectedSlots.includes(slot.id) && <CheckCircleIcon color="primary" fontSize="small" />}
                                </Box>
                              </Box>
                            </Box>
                            <Collapse in={expandedSlot === slot.id}>
                              <Box sx={{ pl: 1.5, pr: 1.5, pb: 1 }}>
                                {renderParticipantStatus(slot.participants)}
                              </Box>
                            </Collapse>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  )}

                  {/* Some Conflicts */}
                  {someConflicts.length > 0 && (
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: '#f59e0b', mb: 1, display: 'block' }}>
                        ⚠ SOME CONFLICTS
                      </Typography>
                      <Stack spacing={1}>
                        {someConflicts.map((slot) => (
                          <Box key={slot.id}>
                            <Box
                              onClick={() => {
                                if (selectedSlots.includes(slot.id)) {
                                  setSelectedSlots(selectedSlots.filter(id => id !== slot.id));
                                } else if (selectedSlots.length < 3) {
                                  setSelectedSlots([...selectedSlots, slot.id]);
                                }
                              }}
                              sx={{
                                p: 1.5,
                                border: '2px solid',
                                borderColor: selectedSlots.includes(slot.id) ? 'primary.main' : '#e5e7eb',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                bgcolor: selectedSlots.includes(slot.id) ? '#f0f9ff' : 'white',
                                '&:hover': { borderColor: 'primary.main' },
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                                    {slot.day} • {slot.time}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {slot.available}/{slot.total} free
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setExpandedSlot(expandedSlot === slot.id ? null : slot.id);
                                    }}
                                  >
                                    {expandedSlot === slot.id ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                                  </IconButton>
                                  {selectedSlots.includes(slot.id) && <CheckCircleIcon color="primary" fontSize="small" />}
                                </Box>
                              </Box>
                            </Box>
                            <Collapse in={expandedSlot === slot.id}>
                              <Box sx={{ pl: 1.5, pr: 1.5, pb: 1 }}>
                                {renderParticipantStatus(slot.participants)}
                              </Box>
                            </Collapse>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  )}

                  {selectedSlots.length > 0 && (
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      onClick={() => setShowEmailPreview(true)}
                      sx={{ textTransform: 'none', position: 'sticky', bottom: 0, bgcolor: 'primary.main' }}
                    >
                      Send {selectedSlots.length} Time Option{selectedSlots.length > 1 ? 's' : ''}
                    </Button>
                  )}
                </Stack>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    );
  };

  // VERSION 3: SMART/CONVERSATIONAL
  const renderVersion3 = () => {
    return (
      <Box sx={{ maxWidth: 700, mx: 'auto', px: 3, py: 4 }}>
        <Stack spacing={3}>
          {/* Smart Header */}
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <AutoAwesomeIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Let's schedule your meeting
            </Typography>
            <Typography variant="body2" color="text.secondary">
              I'll help you find the perfect time
            </Typography>
          </Box>

          {/* Question Cards */}
          <Card sx={{ border: '1px solid #e5e7eb' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>What's this meeting about?</Typography>
              <TextField
                fullWidth
                placeholder="e.g., Sprint Planning, Coffee Chat..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { fontSize: '1.25rem', fontWeight: 600 } }}
              />
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid #e5e7eb' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>How long do you need?</Typography>
              <Stack direction="row" spacing={1}>
                {[15, 30, 45, 60, 90].map((mins) => (
                  <Button
                    key={mins}
                    variant={duration === mins ? 'contained' : 'outlined'}
                    onClick={() => setDuration(mins)}
                    sx={{ flex: 1, textTransform: 'none' }}
                  >
                    {mins < 60 ? `${mins}m` : `${mins / 60}h`}
                  </Button>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid #e5e7eb' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>When should I search?</Typography>
              <Stack spacing={2}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  minDate={startDate || undefined}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid #e5e7eb' }}>
            <CardContent sx={{ p: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isAttending}
                    onChange={(e) => setIsAttending(e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Will you be attending?</Typography>
                    <Typography variant="caption" color="text.secondary">
                      This helps us find times that work for everyone
                    </Typography>
                  </Box>
                }
              />
            </CardContent>
          </Card>

          <Card sx={{ border: '1px solid #e5e7eb' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>Who should attend?</Typography>
              <Autocomplete
                multiple
                freeSolo
                options={
                  inputValue.trim() && !mockContacts.some(c => c.email.toLowerCase().includes(inputValue.toLowerCase()) || c.name?.toLowerCase().includes(inputValue.toLowerCase()))
                    ? [...mockContacts, { id: 'add-new', email: inputValue.trim(), isContact: false, onPlatform: false }]
                    : mockContacts
                }
                value={attendees || []}
                inputValue={inputValue}
                onInputChange={(e, newValue) => setInputValue(newValue)}
                onChange={(e, newValue) => {
                  if (!newValue) {
                    setAttendees([]);
                    return;
                  }

                  if (newValue.length < attendees.length) {
                    setAttendees(newValue.filter((item): item is Attendee => typeof item !== 'string'));
                  } else {
                    const lastItem = newValue[newValue.length - 1];
                    if (lastItem) {
                      handleAddAttendee(lastItem);
                    }
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && inputValue.trim()) {
                    e.preventDefault();
                    handleAddAttendee(inputValue.trim());
                  }
                }}
                getOptionLabel={(option) => typeof option === 'string' ? option : option.name || option.email}
                filterOptions={(options, state) => {
                  const filtered = options.filter(option => {
                    if (option.id === 'add-new') return true;
                    const searchTerm = state.inputValue.toLowerCase();
                    return (
                      option.email.toLowerCase().includes(searchTerm) ||
                      option.name?.toLowerCase().includes(searchTerm)
                    );
                  });
                  return filtered;
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={attendees.length === 0 ? "Type a name or email..." : ""}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'nope',
                      'data-lpignore': 'true',
                      'data-form-type': 'other',
                    }}
                    autoComplete="nope"
                    name={`attendee-${Math.random()}`}
                  />
                )}
                renderTags={(value, getTagProps) =>
                  (value || []).map((option, index) => {
                    if (typeof option === 'string') return null;
                    const { key, ...tagProps } = getTagProps({ index });
                    return (
                      <Chip
                        key={key}
                        label={option.name || option.email}
                        {...tagProps}
                        icon={getAttendeeIcon(option)}
                        color="primary"
                      />
                    );
                  })
                }
                renderOption={(props, option) => {
                  const { key, ...otherProps } = props;
                  if (typeof option === 'string') return null;

                  if (option.id === 'add-new') {
                    return (
                      <Box component="li" key={key} {...otherProps} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <AddIcon sx={{ color: 'primary.main' }} />
                        <Typography variant="body2">Add "{option.email}"</Typography>
                      </Box>
                    );
                  }

                  return (
                    <Box component="li" key={key} {...otherProps} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Avatar sx={{ width: 32, height: 32 }}>
                        {option.name?.charAt(0) || option.email.charAt(0)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2">{option.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{option.email}</Typography>
                      </Box>
                    </Box>
                  );
                }}
              />
            </CardContent>
          </Card>

          {/* Smart Results */}
          {attendees.length > 0 && (
            <Card sx={{ border: '2px solid', borderColor: 'primary.main', bgcolor: '#f0f9ff' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <AccessTimeIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Available Times
                  </Typography>
                </Box>
                {startDate && endDate && (
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                    {startDate.format('MMM D')} - {endDate.format('MMM D, YYYY')}
                  </Typography>
                )}

                {!title || !startDate || !endDate ? (
                  <Box sx={{ p: 3, textAlign: 'center', bgcolor: 'white', borderRadius: '8px' }}>
                    <Typography variant="body2" color="text.secondary">
                      {!title && 'Add a meeting title to continue'}
                      {title && !startDate && 'Select a date range to search'}
                      {title && startDate && !endDate && 'Select an end date to search'}
                    </Typography>
                  </Box>
                ) : (
                  <>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
                      {everyoneAvailable.length > 0
                        ? `Found ${everyoneAvailable.length} perfect time${everyoneAvailable.length > 1 ? 's' : ''}!`
                        : suggestedTimes.length > 0
                        ? `Found ${suggestedTimes.length} available times`
                        : 'Searching for times...'}
                    </Typography>

                    <Stack spacing={2}>
                  {/* Everyone Available */}
                  {everyoneAvailable.length > 0 && (
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: '#22c55e', mb: 1, display: 'block' }}>
                        ✓ EVERYONE AVAILABLE
                      </Typography>
                      <Stack spacing={1}>
                        {everyoneAvailable.map((slot) => (
                          <Box key={slot.id}>
                            <Box
                              onClick={() => {
                                if (selectedSlots.includes(slot.id)) {
                                  setSelectedSlots(selectedSlots.filter(id => id !== slot.id));
                                } else {
                                  setSelectedSlots([...selectedSlots, slot.id]);
                                }
                              }}
                              sx={{
                                p: 2,
                                bgcolor: selectedSlots.includes(slot.id) ? 'primary.main' : 'white',
                                color: selectedSlots.includes(slot.id) ? 'white' : 'inherit',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                '&:hover': { bgcolor: selectedSlots.includes(slot.id) ? 'primary.dark' : '#f8fafc' },
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {slot.day} at {slot.time}
                                  </Typography>
                                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                    All {slot.total} people free
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setExpandedSlot(expandedSlot === slot.id ? null : slot.id);
                                    }}
                                    sx={{ color: selectedSlots.includes(slot.id) ? 'white' : 'inherit' }}
                                  >
                                    {expandedSlot === slot.id ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                                  </IconButton>
                                  {selectedSlots.includes(slot.id) && <CheckCircleIcon />}
                                </Box>
                              </Box>
                            </Box>
                            <Collapse in={expandedSlot === slot.id}>
                              <Box sx={{ pl: 2, pr: 2, pt: 1 }}>
                                {renderParticipantStatus(slot.participants)}
                              </Box>
                            </Collapse>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  )}

                  {/* Most Available */}
                  {mostAvailable.length > 0 && (
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: '#3b82f6', mb: 1, display: 'block' }}>
                        ◐ MOST AVAILABLE
                      </Typography>
                      <Stack spacing={1}>
                        {mostAvailable.map((slot) => (
                          <Box key={slot.id}>
                            <Box
                              onClick={() => {
                                if (selectedSlots.includes(slot.id)) {
                                  setSelectedSlots(selectedSlots.filter(id => id !== slot.id));
                                } else {
                                  setSelectedSlots([...selectedSlots, slot.id]);
                                }
                              }}
                              sx={{
                                p: 2,
                                bgcolor: selectedSlots.includes(slot.id) ? 'primary.main' : 'white',
                                color: selectedSlots.includes(slot.id) ? 'white' : 'inherit',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                '&:hover': { bgcolor: selectedSlots.includes(slot.id) ? 'primary.dark' : '#f8fafc' },
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {slot.day} at {slot.time}
                                  </Typography>
                                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                    {slot.available}/{slot.total} people free
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setExpandedSlot(expandedSlot === slot.id ? null : slot.id);
                                    }}
                                    sx={{ color: selectedSlots.includes(slot.id) ? 'white' : 'inherit' }}
                                  >
                                    {expandedSlot === slot.id ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                                  </IconButton>
                                  {selectedSlots.includes(slot.id) && <CheckCircleIcon />}
                                </Box>
                              </Box>
                            </Box>
                            <Collapse in={expandedSlot === slot.id}>
                              <Box sx={{ pl: 2, pr: 2, pt: 1 }}>
                                {renderParticipantStatus(slot.participants)}
                              </Box>
                            </Collapse>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  )}

                  {/* Some Conflicts */}
                  {someConflicts.length > 0 && (
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: '#f59e0b', mb: 1, display: 'block' }}>
                        ⚠ SOME CONFLICTS
                      </Typography>
                      <Stack spacing={1}>
                        {someConflicts.map((slot) => (
                          <Box key={slot.id}>
                            <Box
                              onClick={() => {
                                if (selectedSlots.includes(slot.id)) {
                                  setSelectedSlots(selectedSlots.filter(id => id !== slot.id));
                                } else {
                                  setSelectedSlots([...selectedSlots, slot.id]);
                                }
                              }}
                              sx={{
                                p: 2,
                                bgcolor: selectedSlots.includes(slot.id) ? 'primary.main' : 'white',
                                color: selectedSlots.includes(slot.id) ? 'white' : 'inherit',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                '&:hover': { bgcolor: selectedSlots.includes(slot.id) ? 'primary.dark' : '#f8fafc' },
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {slot.day} at {slot.time}
                                  </Typography>
                                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                    {slot.available}/{slot.total} people free
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setExpandedSlot(expandedSlot === slot.id ? null : slot.id);
                                    }}
                                    sx={{ color: selectedSlots.includes(slot.id) ? 'white' : 'inherit' }}
                                  >
                                    {expandedSlot === slot.id ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                                  </IconButton>
                                  {selectedSlots.includes(slot.id) && <CheckCircleIcon />}
                                </Box>
                              </Box>
                            </Box>
                            <Collapse in={expandedSlot === slot.id}>
                              <Box sx={{ pl: 2, pr: 2, pt: 1 }}>
                                {renderParticipantStatus(slot.participants)}
                              </Box>
                            </Collapse>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  )}
                </Stack>

                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={selectedSlots.length === 0}
                      onClick={() => setShowEmailPreview(true)}
                      sx={{ mt: 3, textTransform: 'none', bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: '#f8fafc' } }}
                    >
                      Send Invite ({selectedSlots.length} time{selectedSlots.length > 1 ? 's' : ''} selected)
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </Stack>
      </Box>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ minHeight: '100vh', bgcolor: showEmailPreview ? '#f5f5f5' : '#fafbfc' }}>
        {/* Header matching dashboard */}
        {!showEmailPreview && (
        <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'grey.200' }}>
          <Toolbar sx={{ py: 1 }}>
            <IconButton onClick={() => router.push('/home')} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }}>
              <Image src="/images/logomark.svg" alt="timesēkr" width={120} height={32} priority />
            </Box>

            {/* Version Toggle */}
            <ButtonGroup size="small" sx={{ mr: 2 }}>
              <Button
                variant={version === 1 ? 'contained' : 'outlined'}
                onClick={() => setVersion(1)}
                sx={{ textTransform: 'none' }}
              >
                Wizard
              </Button>
              <Button
                variant={version === 2 ? 'contained' : 'outlined'}
                onClick={() => setVersion(2)}
                sx={{ textTransform: 'none' }}
              >
                Split
              </Button>
              <Button
                variant={version === 3 ? 'contained' : 'outlined'}
                onClick={() => setVersion(3)}
                sx={{ textTransform: 'none' }}
              >
                Smart
              </Button>
            </ButtonGroup>

            <Badge badgeContent={0} color="error" sx={{ mr: 2 }}>
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
              <MenuItem onClick={handleMenuClose}>
                <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} />
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        )}

        {/* Version Content */}
        {showEmailPreview ? (
          renderEmailPreview()
        ) : (
          <>
            {version === 1 && renderVersion1()}
            {version === 2 && renderVersion2()}
            {version === 3 && renderVersion3()}
          </>
        )}
      </Box>
    </LocalizationProvider>
  );
}
