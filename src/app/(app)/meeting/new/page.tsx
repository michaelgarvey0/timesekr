'use client';

import { Box, Typography, TextField, Button, IconButton, Stack, Chip, Autocomplete, Avatar, AppBar, Toolbar, Stepper, Step, StepLabel, Card, CardContent, Switch, FormControlLabel, Collapse, Divider, Alert, Select, FormControl, InputLabel, Tooltip, ButtonGroup, MenuItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import LockIcon from '@mui/icons-material/Lock';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dayjs, { Dayjs } from 'dayjs';
import TopBar from '../../components/TopBar';

interface Attendee {
  id: string;
  email: string;
  name?: string;
  isContact: boolean;
  onPlatform: boolean; // true if they're on timesēkr, false if they need email invite
  required?: boolean; // true if required, false if optional (default: true)
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

  // Common state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(60);
  const [customDurationMode, setCustomDurationMode] = useState(false);
  const [customDurationHours, setCustomDurationHours] = useState('');
  const [customDurationMinutes, setCustomDurationMinutes] = useState('');
  const [meetingType, setMeetingType] = useState<'in-person' | 'teams' | 'meet' | 'zoom'>('meet');
  const [meetingAddress, setMeetingAddress] = useState('');
  const [attendees, setAttendees] = useState<Attendee[]>([]); // Keep for backwards compatibility
  const [requiredAttendees, setRequiredAttendees] = useState<Attendee[]>([]);
  const [optionalAttendees, setOptionalAttendees] = useState<Attendee[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);

  // Date range and attendance
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs().add(7, 'day'));
  const [isAttending, setIsAttending] = useState(true);

  // Version 1: Stepper state
  const [activeStep, setActiveStep] = useState(0);
  const [timesFetched, setTimesFetched] = useState(false);

  // Email preview state
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [emailResponseView, setEmailResponseView] = useState<'initial' | 'selected' | 'declined'>('initial');
  const [selectedEmailTimes, setSelectedEmailTimes] = useState<number[]>([]);

  // Expanded slot details
  const [expandedSlot, setExpandedSlot] = useState<number | null>(null);

  // Quorum rules state
  const [quorumType, setQuorumType] = useState<'time' | 'percentage' | 'both'>('percentage');
  const [quorumPercentage, setQuorumPercentage] = useState(80);
  const [quorumDeadline, setQuorumDeadline] = useState<Dayjs | null>(null);

  // Monetization tracking (mock - would be from backend)
  const [freeMeetingsUsed, setFreeMeetingsUsed] = useState(1); // User has used 1 of 3 free large meetings
  const [isPremium, setIsPremium] = useState(false);

  // "Me" attendee
  const meAttendee: Attendee = {
    id: 'me',
    email: 'me@timesekr.com',
    name: 'Me',
    isContact: true,
    onPlatform: true,
  };

  // All participants including me if attending
  const allAttendees = [...requiredAttendees, ...optionalAttendees];
  const activeParticipants = isAttending ? [meAttendee, ...allAttendees] : allAttendees;

  // Mock suggested times with detailed participant availability
  const suggestedTimes: TimeSlot[] = activeParticipants.length > 0 ? [
    {
      id: 1,
      day: 'Wed, Jan 15',
      time: '10:00 AM',
      available: activeParticipants.length,
      total: activeParticipants.length,
      type: 'perfect',
      participants: activeParticipants.map(a => ({ attendee: a, available: true, status: 'available' as const }))
    },
    {
      id: 2,
      day: 'Thu, Jan 16',
      time: '2:00 PM',
      available: activeParticipants.length,
      total: activeParticipants.length,
      type: 'perfect',
      participants: activeParticipants.map(a => ({ attendee: a, available: true, status: 'available' as const }))
    },
    {
      id: 3,
      day: 'Fri, Jan 17',
      time: '1:00 PM',
      available: Math.floor(activeParticipants.length * 0.8),
      total: activeParticipants.length,
      type: 'good',
      participants: activeParticipants.map((a, i) => ({
        attendee: a,
        available: i < Math.floor(activeParticipants.length * 0.8),
        status: i < Math.floor(activeParticipants.length * 0.8) ? 'available' as const : 'busy' as const
      }))
    },
    {
      id: 4,
      day: 'Tue, Jan 14',
      time: '3:00 PM',
      available: Math.floor(activeParticipants.length * 0.6),
      total: activeParticipants.length,
      type: 'partial',
      participants: activeParticipants.map((a, i) => ({
        attendee: a,
        available: i < Math.floor(activeParticipants.length * 0.6),
        status: i < Math.floor(activeParticipants.length * 0.6) ? 'available' as const : 'busy' as const
      }))
    },
    {
      id: 5,
      day: 'Mon, Jan 13',
      time: '4:00 PM',
      available: Math.floor(activeParticipants.length * 0.5),
      total: activeParticipants.length,
      type: 'partial',
      participants: activeParticipants.map((a, i) => ({
        attendee: a,
        available: i < Math.floor(activeParticipants.length * 0.5),
        status: i < Math.floor(activeParticipants.length * 0.5) ? 'available' as const : 'busy' as const
      }))
    },
  ] : [];

  // Categorize times by availability
  const everyoneAvailable = suggestedTimes.filter(t => t.available === t.total);
  const mostAvailable = suggestedTimes.filter(t => t.available >= t.total * 0.8 && t.available < t.total);
  const someConflicts = suggestedTimes.filter(t => t.available < t.total * 0.8);

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
        newAttendee = { ...matchingContact, required: true };
      } else {
        // Check if on platform but not in contacts
        const matchingPlatformUser = mockPlatformUsers.find(u => u.email.toLowerCase() === email);
        if (matchingPlatformUser) {
          newAttendee = { ...matchingPlatformUser, required: true };
        } else {
          // Not on platform - will get email invite
          newAttendee = {
            id: Date.now().toString(),
            email: value.trim(),
            isContact: false,
            onPlatform: false,
            required: true,
          };
        }
      }
    } else {
      newAttendee = { ...value, id: Date.now().toString(), required: true };
    }

    if (attendees.some(a => a.email === newAttendee.email)) {
      setInputValue('');
      return;
    }

    setAttendees([...attendees, newAttendee]);
    setInputValue('');
  };

  const toggleRequired = (attendeeId: string) => {
    setAttendees(attendees.map(a =>
      a.id === attendeeId ? { ...a, required: !a.required } : a
    ));
  };

  // V4: Add attendee to required list
  const handleAddRequired = (value: string | Attendee | null) => {
    if (!value) return;

    let newAttendee: Attendee;
    if (typeof value === 'string') {
      const email = value.trim().toLowerCase();
      const matchingContact = mockContacts.find(c => c.email.toLowerCase() === email);
      if (matchingContact) {
        newAttendee = { ...matchingContact, required: true };
      } else {
        const matchingPlatformUser = mockPlatformUsers.find(u => u.email.toLowerCase() === email);
        if (matchingPlatformUser) {
          newAttendee = { ...matchingPlatformUser, required: true };
        } else {
          newAttendee = {
            id: Date.now().toString(),
            email: value.trim(),
            isContact: false,
            onPlatform: false,
            required: true,
          };
        }
      }
    } else {
      newAttendee = { ...value, id: Date.now().toString(), required: true };
    }

    // Don't add if already in either list
    if (requiredAttendees.some(a => a.email === newAttendee.email) ||
        optionalAttendees.some(a => a.email === newAttendee.email)) {
      return;
    }

    setRequiredAttendees([...requiredAttendees, newAttendee]);
  };

  // V4: Add attendee to optional list
  const handleAddOptional = (value: string | Attendee | null) => {
    if (!value) return;

    let newAttendee: Attendee;
    if (typeof value === 'string') {
      const email = value.trim().toLowerCase();
      const matchingContact = mockContacts.find(c => c.email.toLowerCase() === email);
      if (matchingContact) {
        newAttendee = { ...matchingContact, required: false };
      } else {
        const matchingPlatformUser = mockPlatformUsers.find(u => u.email.toLowerCase() === email);
        if (matchingPlatformUser) {
          newAttendee = { ...matchingPlatformUser, required: false };
        } else {
          newAttendee = {
            id: Date.now().toString(),
            email: value.trim(),
            isContact: false,
            onPlatform: false,
            required: false,
          };
        }
      }
    } else {
      newAttendee = { ...value, id: Date.now().toString(), required: false };
    }

    // Don't add if already in either list
    if (requiredAttendees.some(a => a.email === newAttendee.email) ||
        optionalAttendees.some(a => a.email === newAttendee.email)) {
      return;
    }

    setOptionalAttendees([...optionalAttendees, newAttendee]);
  };

  // V4: Move attendee between required and optional
  const moveToRequired = (attendee: Attendee) => {
    setOptionalAttendees(optionalAttendees.filter(a => a.id !== attendee.id));
    setRequiredAttendees([...requiredAttendees, { ...attendee, required: true }]);
  };

  const moveToOptional = (attendee: Attendee) => {
    setRequiredAttendees(requiredAttendees.filter(a => a.id !== attendee.id));
    setOptionalAttendees([...optionalAttendees, { ...attendee, required: false }]);
  };

  // Check if user needs upgrade
  const needsUpgrade = !isPremium && activeParticipants.length >= 5 && freeMeetingsUsed >= 3;

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

    const handleTimeClick = (slotId: number) => {
      if (selectedEmailTimes.includes(slotId)) {
        setSelectedEmailTimes(selectedEmailTimes.filter(id => id !== slotId));
      } else {
        setSelectedEmailTimes([...selectedEmailTimes, slotId]);
      }
    };

    // Initial email view
    if (emailResponseView === 'initial') {
      return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
          {/* Fake Email Client Header */}
          <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e0e0e0', px: 2, py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton onClick={() => {
                  setShowEmailPreview(false);
                  setEmailResponseView('initial');
                  setSelectedEmailTimes([]);
                }}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#202124' }}>
                  Email
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ bgcolor: '#fef7cd', px: 1, py: 0.5, borderRadius: '4px', fontWeight: 500 }}>
                PREVIEW MODE
              </Typography>
            </Box>
          </Box>

          {/* Email Content */}
          <Box sx={{ maxWidth: 900, mx: 'auto', bgcolor: 'white', minHeight: 'calc(100vh - 60px)' }}>
            {/* Email Toolbar */}
            <Box sx={{ borderBottom: '1px solid #e0e0e0', px: 3, py: 2, display: 'flex', gap: 1 }}>
              <IconButton size="small" disabled>
                <ArrowBackIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" disabled>
                <EmailIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" disabled>
                <AccessTimeIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Email Header Info */}
            <Box sx={{ px: 3, py: 3, borderBottom: '1px solid #f0f0f0' }}>
              <Typography variant="h5" sx={{ fontWeight: 400, mb: 2, color: '#202124' }}>
                You're invited: {title}
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                  {meAttendee.name?.charAt(0) || 'M'}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#202124' }}>
                        {meAttendee.name || meAttendee.email}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        to me
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Just now
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Email Body */}
            <Box sx={{ px: 3, py: 4 }}>
              <Stack spacing={3}>
                <Typography variant="body1">
                  Hi there,
                </Typography>

                <Typography variant="body1">
                  I'd like to schedule a meeting with you. Let me know which times work for you:
                </Typography>

                {/* Time Options */}
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
                    Click any time that works for you:
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
                          bgcolor: 'white',
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
                        <Button
                          variant="contained"
                          onClick={() => setEmailResponseView('selected')}
                          sx={{ textTransform: 'none' }}
                        >
                          This works for me
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
                    onClick={() => router.push('/?email=attendee@example.com')}
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
                    onClick={() => setEmailResponseView('declined')}
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
                    Attendees: {activeParticipants.length} people
                  </Typography>
                  {description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {description}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ textAlign: 'center', py: 2, mt: 4 }}>
                  <Typography variant="caption" color="text.secondary">
                    Sent via timesēkr - Multi-party scheduling made simple
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      );
    }

    // Landing page after clicking a time (real flow would be timesekr.com/respond/meeting-id)
    if (emailResponseView === 'selected') {
      return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 4 }}>
          <Box sx={{ maxWidth: 700, mx: 'auto', px: 3 }}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  Respond to: {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  from {meAttendee.name}
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
                  Select all times that work for you:
                </Typography>

                <Stack spacing={2}>
                  {selectedTimes.map((slot) => {
                    const isSelected = selectedEmailTimes.includes(slot.id);
                    return (
                      <Box
                        key={slot.id}
                        onClick={() => handleTimeClick(slot.id)}
                        sx={{
                          p: 2.5,
                          border: '2px solid',
                          borderColor: isSelected ? 'primary.main' : '#e5e7eb',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          bgcolor: isSelected ? '#f0f9ff' : 'white',
                          transition: 'all 0.2s',
                          '&:hover': {
                            borderColor: 'primary.main',
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
                        {isSelected && <CheckCircleIcon color="primary" sx={{ fontSize: 32 }} />}
                      </Box>
                    );
                  })}
                </Stack>

                {selectedEmailTimes.length > 0 ? (
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ mt: 3, textTransform: 'none', fontWeight: 600 }}
                  >
                    Submit Response ({selectedEmailTimes.length} time{selectedEmailTimes.length > 1 ? 's' : ''})
                  </Button>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
                    Select at least one time to continue
                  </Typography>
                )}

                <Divider sx={{ my: 3 }} />

                <Box sx={{ p: 3, bgcolor: '#f0f9ff', borderRadius: '12px', border: '1px solid #e0f2fe' }}>
                  <Box sx={{ display: 'flex', alignItems: 'start', gap: 2, mb: 2 }}>
                    <AutoAwesomeIcon sx={{ color: 'primary.main', mt: 0.5 }} />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        None of these work?
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Connect your calendar and suggest better times - it takes 30 seconds
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => router.push('/?email=attendee@example.com')}
                    sx={{ textTransform: 'none' }}
                  >
                    Join & Suggest Other Times
                  </Button>
                </Box>

                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Button
                    variant="text"
                    color="error"
                    size="small"
                    onClick={() => setEmailResponseView('declined')}
                    sx={{ textTransform: 'none' }}
                  >
                    I can't attend
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      );
    }

    // Declined
    if (emailResponseView === 'declined') {
      return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 4 }}>
          <Box sx={{ maxWidth: 700, mx: 'auto', px: 3 }}>
            <Card sx={{ boxShadow: 3, textAlign: 'center' }}>
              <CardContent sx={{ p: 5 }}>
                <CloseIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  Response sent
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  {meAttendee.name} has been notified that you can't attend
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We'll let them know if the meeting gets rescheduled
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      );
    }

    return null;
  };

  // VERSION 1: STEP-BY-STEP WIZARD
  const renderVersion1 = () => {
    const steps = ['Details', 'Participants & Times', 'Review'];

    return (
      <Box>
        <Box sx={{ maxWidth: 1400, mx: 'auto', px: 3, py: 4 }}>
          {/* Header with Cancel button */}
          <Box sx={{ maxWidth: 800, mx: 'auto', mb: 6, position: 'relative' }}>
            <Button
              onClick={() => router.push('/dashboard')}
              sx={{
                textTransform: 'none',
                color: 'text.secondary',
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            >
              Cancel
            </Button>
            <Typography variant="h4" sx={{ fontWeight: 600, textAlign: 'center' }}>
              New meeting
            </Typography>
          </Box>

          <Stepper activeStep={activeStep} sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <Card sx={{ border: '1px solid #e5e7eb', maxWidth: 800, mx: 'auto' }}>
              <CardContent sx={{ p: 4 }}>
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
                    <Stack direction="row" spacing={1} alignItems="center">
                      {[30, 60, 90].map((mins) => (
                        <Button
                          key={mins}
                          variant={duration === mins && !customDurationMode ? 'contained' : 'outlined'}
                          onClick={() => {
                            setDuration(mins);
                            setCustomDurationMode(false);
                            setCustomDurationHours('');
                            setCustomDurationMinutes('');
                          }}
                          sx={{ textTransform: 'none' }}
                        >
                          {mins}min
                        </Button>
                      ))}
                      <Button
                        variant={customDurationMode ? 'contained' : 'outlined'}
                        onClick={() => {
                          setCustomDurationMode(true);
                        }}
                        sx={{ textTransform: 'none' }}
                      >
                        Custom
                      </Button>
                      {customDurationMode && (
                        <>
                          <TextField
                            size="small"
                            type="number"
                            placeholder="0"
                            label="Hours"
                            value={customDurationHours}
                            onChange={(e) => {
                              setCustomDurationHours(e.target.value);
                              const hours = parseInt(e.target.value) || 0;
                              const minutes = parseInt(customDurationMinutes) || 0;
                              const totalMinutes = hours * 60 + minutes;
                              if (totalMinutes > 0) {
                                setDuration(totalMinutes);
                              }
                            }}
                            inputProps={{ min: 0 }}
                            sx={{ width: 80 }}
                          />
                          <TextField
                            size="small"
                            type="number"
                            placeholder="0"
                            label="Min"
                            value={customDurationMinutes}
                            onChange={(e) => {
                              setCustomDurationMinutes(e.target.value);
                              const hours = parseInt(customDurationHours) || 0;
                              const minutes = parseInt(e.target.value) || 0;
                              const totalMinutes = hours * 60 + minutes;
                              if (totalMinutes > 0) {
                                setDuration(totalMinutes);
                              }
                            }}
                            inputProps={{ min: 0, max: 59 }}
                            sx={{ width: 80 }}
                          />
                        </>
                      )}
                    </Stack>
                  </Box>

                  <Box>
                    <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 600 }}>Meeting Type</Typography>
                    <ButtonGroup fullWidth>
                      <Button
                        variant={meetingType === 'in-person' ? 'contained' : 'outlined'}
                        onClick={() => setMeetingType('in-person')}
                        sx={{ textTransform: 'none' }}
                      >
                        In Person
                      </Button>
                      <Button
                        variant={meetingType === 'teams' ? 'contained' : 'outlined'}
                        onClick={() => setMeetingType('teams')}
                        sx={{ textTransform: 'none' }}
                      >
                        Teams
                      </Button>
                      <Button
                        variant={meetingType === 'meet' ? 'contained' : 'outlined'}
                        onClick={() => setMeetingType('meet')}
                        sx={{ textTransform: 'none' }}
                      >
                        Google Meet
                      </Button>
                      <Button
                        variant={meetingType === 'zoom' ? 'contained' : 'outlined'}
                        onClick={() => setMeetingType('zoom')}
                        sx={{ textTransform: 'none' }}
                      >
                        Zoom
                      </Button>
                    </ButtonGroup>
                    {meetingType === 'in-person' && (
                      <TextField
                        fullWidth
                        label="Address"
                        value={meetingAddress}
                        onChange={(e) => setMeetingAddress(e.target.value)}
                        placeholder="Enter meeting location"
                        sx={{ mt: 2 }}
                      />
                    )}
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

                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => setActiveStep(1)}
                    disabled={!title || !startDate || !endDate}
                    sx={{ textTransform: 'none' }}
                  >
                    Next: Add Participants
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          )}

          {activeStep === 1 && (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '450px 1fr' }, gap: 3 }}>
              {/* Left Side: Participants */}
              <Box>
                <Card sx={{ border: '1px solid #e5e7eb', mb: 3 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Participants</Typography>

                    {/* Required Attendees */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: 'text.secondary' }}>
                        Required *
                      </Typography>
                      <Autocomplete
                        multiple
                        freeSolo
                        options={mockContacts}
                        value={requiredAttendees}
                        onChange={(e, newValue) => {
                          if (!newValue) {
                            setRequiredAttendees([]);
                            return;
                          }
                          if (newValue.length < requiredAttendees.length) {
                            setRequiredAttendees(newValue.filter((item): item is Attendee => typeof item !== 'string'));
                          } else {
                            const lastItem = newValue[newValue.length - 1];
                            if (lastItem && typeof lastItem !== 'string') {
                              handleAddRequired(lastItem);
                            } else if (typeof lastItem === 'string') {
                              handleAddRequired(lastItem);
                            }
                          }
                        }}
                        getOptionLabel={(option) => typeof option === 'string' ? option : option.name || option.email}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Add required attendees"
                            size="small"
                          />
                        )}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => {
                            if (typeof option === 'string') return null;
                            const { key, ...tagProps } = getTagProps({ index });
                            return (
                              <Chip
                                key={key}
                                label={option.name || option.email}
                                {...tagProps}
                                size="small"
                                icon={getAttendeeIcon(option)}
                              />
                            );
                          })
                        }
                        renderOption={(props, option) => {
                          const { key, ...otherProps } = props;
                          if (typeof option === 'string') return null;
                          return (
                            <Box component="li" key={key} {...otherProps} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                              <Avatar sx={{ width: 32, height: 32 }}>
                                {option.name?.charAt(0) || option.email.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography variant="body2">{option.name}</Typography>
                                <Typography variant="caption" color="text.secondary">{option.email}</Typography>
                              </Box>
                            </Box>
                          );
                        }}
                      />
                    </Box>

                    {/* Optional Attendees */}
                    <Box>
                      <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: 'text.secondary' }}>
                        Optional
                      </Typography>
                      <Autocomplete
                        multiple
                        freeSolo
                        options={mockContacts}
                        value={optionalAttendees}
                        onChange={(e, newValue) => {
                          if (!newValue) {
                            setOptionalAttendees([]);
                            return;
                          }
                          if (newValue.length < optionalAttendees.length) {
                            setOptionalAttendees(newValue.filter((item): item is Attendee => typeof item !== 'string'));
                          } else {
                            const lastItem = newValue[newValue.length - 1];
                            if (lastItem && typeof lastItem !== 'string') {
                              handleAddOptional(lastItem);
                            } else if (typeof lastItem === 'string') {
                              handleAddOptional(lastItem);
                            }
                          }
                        }}
                        getOptionLabel={(option) => typeof option === 'string' ? option : option.name || option.email}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Add optional attendees"
                            size="small"
                          />
                        )}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => {
                            if (typeof option === 'string') return null;
                            const { key, ...tagProps } = getTagProps({ index });
                            return (
                              <Chip
                                key={key}
                                label={option.name || option.email}
                                {...tagProps}
                                size="small"
                                icon={getAttendeeIcon(option)}
                                variant="outlined"
                              />
                            );
                          })
                        }
                        renderOption={(props, option) => {
                          const { key, ...otherProps } = props;
                          if (typeof option === 'string') return null;
                          return (
                            <Box component="li" key={key} {...otherProps} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                              <Avatar sx={{ width: 32, height: 32 }}>
                                {option.name?.charAt(0) || option.email.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography variant="body2">{option.name}</Typography>
                                <Typography variant="caption" color="text.secondary">{option.email}</Typography>
                              </Box>
                            </Box>
                          );
                        }}
                      />
                    </Box>

                    <Divider sx={{ my: 3 }} />

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
                  </CardContent>
                </Card>

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={() => setTimesFetched(true)}
                  disabled={requiredAttendees.length === 0}
                  sx={{ textTransform: 'none', mb: 2 }}
                >
                  Find Times
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => setActiveStep(0)}
                  sx={{ textTransform: 'none' }}
                >
                  Back to Details
                </Button>
              </Box>

              {/* Right Side: Times */}
              <Card sx={{ border: '1px solid #e5e7eb' }}>
                <CardContent sx={{ p: 3 }}>
                  {!timesFetched ? (
                    <Box sx={{ p: 8, textAlign: 'center' }}>
                      <AccessTimeIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                        Add participants to get started
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Click "Find Times" after adding participants to see availability
                      </Typography>
                    </Box>
                  ) : (
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>Suggested Times</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Select up to 3 times • {startDate?.format('MMM D')} - {endDate?.format('MMM D, YYYY')}
                          </Typography>
                        </Box>
                        <Chip
                          label={`${selectedSlots.length}/3 selected`}
                          color={selectedSlots.length > 0 ? 'primary' : 'default'}
                        />
                      </Box>

                      {allAttendees.length === 0 ? (
                        <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#f8fafc', borderRadius: '8px' }}>
                          <Typography color="text.secondary">Add attendees to see suggested times</Typography>
                        </Box>
                      ) : (
                        <Stack spacing={2}>
                          {/* Times grouped by availability */}
                          {everyoneAvailable.length > 0 && (
                            <Box>
                              <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 600, color: '#22c55e' }}>
                                ✓ Everyone Available ({everyoneAvailable.length})
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
                                          <Typography variant="body2" color="text.secondary">{slot.day}</Typography>
                                          <Typography variant="h6" sx={{ fontWeight: 700 }}>{slot.time}</Typography>
                                          <Typography variant="caption" color="text.secondary">
                                            All {slot.total} available
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
                                      <Box sx={{ pl: 2, pr: 2, pt: 1 }}>
                                        {renderParticipantStatus(slot.participants)}
                                      </Box>
                                    </Collapse>
                                  </Box>
                                ))}
                              </Stack>
                            </Box>
                          )}

                          {mostAvailable.length > 0 && (
                            <Box>
                              <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 600, color: '#f59e0b' }}>
                                Most Available ({mostAvailable.length})
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
                                          <Typography variant="body2" color="text.secondary">{slot.day}</Typography>
                                          <Typography variant="h6" sx={{ fontWeight: 700 }}>{slot.time}</Typography>
                                          <Typography variant="caption" color="text.secondary">
                                            {slot.available} of {slot.total} available
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
                                      <Box sx={{ pl: 2, pr: 2, pt: 1 }}>
                                        {renderParticipantStatus(slot.participants)}
                                      </Box>
                                    </Collapse>
                                  </Box>
                                ))}
                              </Stack>
                            </Box>
                          )}

                          {someConflicts.length > 0 && (
                            <Box>
                              <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 600, color: '#94a3b8' }}>
                                Some Conflicts ({someConflicts.length})
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
                                          <Typography variant="body2" color="text.secondary">{slot.day}</Typography>
                                          <Typography variant="h6" sx={{ fontWeight: 700 }}>{slot.time}</Typography>
                                          <Typography variant="caption" color="text.secondary">
                                            {slot.available} of {slot.total} available
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
                                      <Box sx={{ pl: 2, pr: 2, pt: 1 }}>
                                        {renderParticipantStatus(slot.participants)}
                                      </Box>
                                    </Collapse>
                                  </Box>
                                ))}
                              </Stack>
                            </Box>
                          )}

                          <Divider sx={{ my: 2 }} />

                          <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            onClick={() => setActiveStep(2)}
                            disabled={selectedSlots.length === 0}
                            sx={{ textTransform: 'none' }}
                          >
                            Review & Send ({selectedSlots.length} time{selectedSlots.length !== 1 ? 's' : ''})
                          </Button>
                        </Stack>
                      )}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Box>
          )}

          {activeStep === 2 && (
            <Card sx={{ border: '1px solid #e5e7eb', maxWidth: 800, mx: 'auto' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Review Meeting Request</Typography>

                <Box sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: '12px', mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Meeting</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{title}</Typography>
                  {description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {description}
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Duration: {duration} minutes
                  </Typography>
                </Box>

                <Box sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: '12px', mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Participants</Typography>
                  {requiredAttendees.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        Required ({requiredAttendees.length})
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 0.5, flexWrap: 'wrap' }}>
                        {requiredAttendees.map((a) => (
                          <Chip key={a.id} label={a.name || a.email} size="small" />
                        ))}
                      </Stack>
                    </Box>
                  )}
                  {optionalAttendees.length > 0 && (
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        Optional ({optionalAttendees.length})
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 0.5, flexWrap: 'wrap' }}>
                        {optionalAttendees.map((a) => (
                          <Chip key={a.id} label={a.name || a.email} size="small" variant="outlined" />
                        ))}
                      </Stack>
                    </Box>
                  )}
                </Box>

                <Box sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: '12px', mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Time Options</Typography>
                  <Stack spacing={1}>
                    {suggestedTimes.filter(t => selectedSlots.includes(t.id)).map((slot) => (
                      <Box key={slot.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircleIcon color="primary" sx={{ fontSize: 20 }} />
                        <Typography variant="body2">
                          {slot.day} at {slot.time} ({slot.available}/{slot.total} available)
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>

                <Stack direction="row" spacing={2}>
                  <Button
                    variant="outlined"
                    onClick={() => setActiveStep(1)}
                    sx={{ textTransform: 'none' }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    startIcon={<SendIcon />}
                    onClick={() => setShowEmailPreview(true)}
                    sx={{ textTransform: 'none' }}
                  >
                    Send Meeting Request
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          )}
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

  // Version 4: Combined Smart + Split with monetization and quorum rules
  const renderVersion4 = () => {
    const showUpgradeWarning = !isPremium && activeParticipants.length >= 5;
    const canSend = !needsUpgrade && selectedSlots.length > 0;

    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#fafbfc' }}>
        {/* Header Above Everything */}
        <Box sx={{ maxWidth: 1400, mx: 'auto', px: 3, pt: 4, pb: 2 }}>
          <Box sx={{ mb: 1 }}>
            <AutoAwesomeIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Schedule a Meeting
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Find the perfect time for everyone
            </Typography>
          </Box>
        </Box>

        <Box sx={{ maxWidth: 1400, mx: 'auto', px: 3, pb: 4 }}>
          {/* Upgrade Warning */}
          {showUpgradeWarning && (
            <Alert
              severity={needsUpgrade ? "error" : "warning"}
              sx={{ mb: 3 }}
              action={
                <Button
                  size="small"
                  startIcon={<UpgradeIcon />}
                  onClick={() => alert('Upgrade flow would go here')}
                  sx={{ textTransform: 'none' }}
                >
                  Upgrade
                </Button>
              }
            >
              {needsUpgrade ? (
                <Typography variant="body2">
                  <strong>Upgrade required:</strong> You've used your 3 free meetings with 5+ people. Upgrade to continue scheduling large meetings.
                </Typography>
              ) : (
                <Typography variant="body2">
                  <strong>Heads up:</strong> Large meetings (5+ people) are limited to 3 free per account. You've used {freeMeetingsUsed}/3.
                </Typography>
              )}
            </Alert>
          )}

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '500px 1fr' }, gap: 3 }}>
            {/* Left: Single Consolidated Form */}
            <Box>

              {/* Single Consolidated Card */}
              <Card sx={{ border: '1px solid #e5e7eb' }}>
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    {/* Meeting Title */}
                    <Box>
                      <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>
                        What's this meeting about?
                      </Typography>
                      <TextField
                        fullWidth
                        placeholder="e.g., Sprint Planning, Coffee Chat..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ '& .MuiOutlinedInput-root': { fontSize: '1.1rem', fontWeight: 500 } }}
                      />
                    </Box>

                    <Divider />

                    {/* Duration */}
                    <Box>
                      <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>
                        How long do you need?
                      </Typography>
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
                    </Box>

                    <Divider />

                    {/* Date Range - Side by Side */}
                    <Box>
                      <Typography variant="body1" sx={{ mb: 1.5, fontWeight: 600 }}>
                        Date Range
                      </Typography>
                      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                        <DatePicker
                          label="Start Date"
                          value={startDate}
                          onChange={(newValue) => setStartDate(newValue)}
                          slotProps={{ textField: { fullWidth: true, size: 'small' } }}
                        />
                        <DatePicker
                          label="End Date"
                          value={endDate}
                          onChange={(newValue) => setEndDate(newValue)}
                          minDate={startDate || undefined}
                          slotProps={{ textField: { fullWidth: true, size: 'small' } }}
                        />
                      </Box>
                    </Box>

                    <Divider />

                    {/* Attending Switch */}
                    <Box>
                      <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>
                        Organizer Attending?
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={isAttending}
                            onChange={(e) => setIsAttending(e.target.checked)}
                            color="primary"
                          />
                        }
                        label={
                          <Typography variant="body2" color="text.secondary">
                            Include organizer availability in the search
                          </Typography>
                        }
                      />
                    </Box>

                    <Divider />

                    {/* Required Attendees */}
                    <Box>
                      <Typography variant="body1" sx={{ mb: 1.5, fontWeight: 600, color: '#dc2626' }}>
                        Required Attendees
                      </Typography>
                      <Autocomplete
                        multiple
                        freeSolo
                        size="small"
                        options={mockContacts}
                        value={requiredAttendees}
                        onInputChange={(e, newValue) => setInputValue(newValue)}
                        onChange={(e, newValue) => {
                          if (!newValue) {
                            setRequiredAttendees([]);
                            return;
                          }
                          if (newValue.length < requiredAttendees.length) {
                            setRequiredAttendees(newValue.filter((item): item is Attendee => typeof item !== 'string'));
                          } else {
                            const lastItem = newValue[newValue.length - 1];
                            if (lastItem) {
                              handleAddRequired(lastItem);
                            }
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && inputValue.trim()) {
                            e.preventDefault();
                            handleAddRequired(inputValue.trim());
                            setInputValue('');
                          }
                        }}
                        getOptionLabel={(option) => typeof option === 'string' ? option : option.name || option.email}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Add required attendees..."
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: 'nope',
                              'data-lpignore': 'true',
                              'data-form-type': 'other',
                            }}
                            autoComplete="nope"
                            name={`required-${Math.random()}`}
                          />
                        )}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => {
                            if (typeof option === 'string') return null;
                            const { key, ...tagProps } = getTagProps({ index });
                            return (
                              <Chip
                                key={key}
                                label={option.name || option.email}
                                {...tagProps}
                                icon={getAttendeeIcon(option)}
                                sx={{ bgcolor: '#fee2e2', borderColor: '#dc2626' }}
                                onDoubleClick={() => moveToOptional(option)}
                              />
                            );
                          })
                        }
                        renderOption={(props, option) => {
                          const { key, ...otherProps } = props;
                          if (typeof option === 'string') return null;
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
                      {requiredAttendees.length > 0 && (
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                          Double-click chips to move to optional
                        </Typography>
                      )}
                    </Box>

                    {/* Optional Attendees */}
                    <Box>
                      <Typography variant="body1" sx={{ mb: 1.5, fontWeight: 600, color: '#059669' }}>
                        Optional Attendees
                      </Typography>
                      <Autocomplete
                        multiple
                        freeSolo
                        size="small"
                        options={mockContacts}
                        value={optionalAttendees}
                        onInputChange={(e, newValue) => setInputValue(newValue)}
                        onChange={(e, newValue) => {
                          if (!newValue) {
                            setOptionalAttendees([]);
                            return;
                          }
                          if (newValue.length < optionalAttendees.length) {
                            setOptionalAttendees(newValue.filter((item): item is Attendee => typeof item !== 'string'));
                          } else {
                            const lastItem = newValue[newValue.length - 1];
                            if (lastItem) {
                              handleAddOptional(lastItem);
                            }
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && inputValue.trim()) {
                            e.preventDefault();
                            handleAddOptional(inputValue.trim());
                            setInputValue('');
                          }
                        }}
                        getOptionLabel={(option) => typeof option === 'string' ? option : option.name || option.email}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Add optional attendees..."
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: 'nope',
                              'data-lpignore': 'true',
                              'data-form-type': 'other',
                            }}
                            autoComplete="nope"
                            name={`optional-${Math.random()}`}
                          />
                        )}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => {
                            if (typeof option === 'string') return null;
                            const { key, ...tagProps } = getTagProps({ index });
                            return (
                              <Chip
                                key={key}
                                label={option.name || option.email}
                                {...tagProps}
                                icon={getAttendeeIcon(option)}
                                sx={{ bgcolor: '#d1fae5', borderColor: '#059669' }}
                                onDoubleClick={() => moveToRequired(option)}
                              />
                            );
                          })
                        }
                        renderOption={(props, option) => {
                          const { key, ...otherProps } = props;
                          if (typeof option === 'string') return null;
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
                      {optionalAttendees.length > 0 && (
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                          Double-click chips to move to required
                        </Typography>
                      )}
                    </Box>

                    <Divider />

                    {/* Quorum Rules - Always Visible */}
                    <Box>
                      <Typography variant="body1" sx={{ mb: 2, fontWeight: 600 }}>
                        When should the meeting be finalized?
                      </Typography>

                      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                        <InputLabel>Quorum Type</InputLabel>
                        <Select
                          value={quorumType}
                          label="Quorum Type"
                          onChange={(e) => setQuorumType(e.target.value as 'time' | 'percentage' | 'both')}
                        >
                          <MenuItem value="percentage">When % of people respond</MenuItem>
                          <MenuItem value="time">By a specific deadline</MenuItem>
                          <MenuItem value="both">Both % and deadline</MenuItem>
                        </Select>
                      </FormControl>

                      {(quorumType === 'percentage' || quorumType === 'both') && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                            Finalize when {quorumPercentage}% of required attendees respond
                          </Typography>
                          <Stack direction="row" spacing={1}>
                            {[50, 66, 75, 80, 100].map((pct) => (
                              <Button
                                key={pct}
                                size="small"
                                variant={quorumPercentage === pct ? 'contained' : 'outlined'}
                                onClick={() => setQuorumPercentage(pct)}
                                sx={{ flex: 1, textTransform: 'none' }}
                              >
                                {pct}%
                              </Button>
                            ))}
                          </Stack>
                        </Box>
                      )}

                      {(quorumType === 'time' || quorumType === 'both') && (
                        <DatePicker
                          label="Finalize by"
                          value={quorumDeadline}
                          onChange={(newValue) => setQuorumDeadline(newValue)}
                          minDate={dayjs()}
                          slotProps={{ textField: { fullWidth: true, size: 'small' } }}
                        />
                      )}
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Box>

            {/* Right: Available Times */}
            <Box>
              {allAttendees.length === 0 ? (
                <Card sx={{ border: '2px dashed #e5e7eb', p: 6, textAlign: 'center' }}>
                  <GroupsIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Add attendees to see available times
                  </Typography>
                </Card>
              ) : !title || !startDate || !endDate ? (
                <Card sx={{ border: '2px dashed #e5e7eb', p: 6, textAlign: 'center' }}>
                  <AccessTimeIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    {!title && 'Add a meeting title'}
                    {title && !startDate && 'Select a date range'}
                    {title && startDate && !endDate && 'Select an end date'}
                  </Typography>
                </Card>
              ) : (
                <Card sx={{ border: '1px solid #e5e7eb', position: 'sticky', top: 20 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                      <AccessTimeIcon color="primary" sx={{ fontSize: 28 }} />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          Available Times
                        </Typography>
                        {startDate && endDate && (
                          <Typography variant="caption" color="text.secondary">
                            {startDate.format('MMM D')} - {endDate.format('MMM D, YYYY')}
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
                      {everyoneAvailable.length > 0
                        ? `Found ${everyoneAvailable.length} perfect time${everyoneAvailable.length > 1 ? 's' : ''}!`
                        : suggestedTimes.length > 0
                        ? `Found ${suggestedTimes.length} available times`
                        : 'Searching for times...'}
                    </Typography>

                    <Box sx={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto', pr: 1 }}>
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
                                      border: '1px solid',
                                      borderColor: selectedSlots.includes(slot.id) ? 'primary.main' : '#e5e7eb',
                                      borderRadius: '8px',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s',
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
                                      border: '1px solid',
                                      borderColor: selectedSlots.includes(slot.id) ? 'primary.main' : '#e5e7eb',
                                      borderRadius: '8px',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s',
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
                                      border: '1px solid',
                                      borderColor: selectedSlots.includes(slot.id) ? 'primary.main' : '#e5e7eb',
                                      borderRadius: '8px',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s',
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
                    </Box>

                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={!canSend}
                      startIcon={needsUpgrade ? <LockIcon /> : <SendIcon />}
                      onClick={() => needsUpgrade ? alert('Upgrade required') : setShowEmailPreview(true)}
                      sx={{ mt: 3, textTransform: 'none' }}
                    >
                      {needsUpgrade ? 'Upgrade to Send' : `Send Invite (${selectedSlots.length} selected)`}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ minHeight: '100vh', bgcolor: showEmailPreview ? '#f5f5f5' : '#fafbfc' }}>
        {/* Header */}
        {!showEmailPreview && <TopBar />}

        {/* Content */}
        {showEmailPreview ? (
          renderEmailPreview()
        ) : (
          renderVersion1()
        )}
      </Box>
    </LocalizationProvider>
  );
}
