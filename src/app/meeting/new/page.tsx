'use client';

import { Box, Typography, TextField, Button, IconButton, Stack, Chip, Autocomplete, Avatar, AppBar, Toolbar, Menu, MenuItem, Badge, Stepper, Step, StepLabel, Card, CardContent, ButtonGroup } from '@mui/material';
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
}

const mockContacts: Attendee[] = [
  { id: 'contact-1', email: 'john@example.com', name: 'John Doe', isContact: true },
  { id: 'contact-2', email: 'jane@example.com', name: 'Jane Smith', isContact: true },
  { id: 'contact-3', email: 'bob@company.com', name: 'Bob Johnson', isContact: true },
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

  // Version 1: Stepper state
  const [activeStep, setActiveStep] = useState(0);

  // Mock suggested times
  const suggestedTimes = attendees.length > 0 ? [
    { id: 1, day: 'Wed, Jan 15', time: '10:00 AM', available: attendees.length, total: attendees.length, type: 'perfect' },
    { id: 2, day: 'Thu, Jan 16', time: '2:00 PM', available: attendees.length, total: attendees.length, type: 'perfect' },
    { id: 3, day: 'Fri, Jan 17', time: '1:00 PM', available: Math.floor(attendees.length * 0.8), total: attendees.length, type: 'good' },
    { id: 4, day: 'Tue, Jan 14', time: '3:00 PM', available: Math.floor(attendees.length * 0.6), total: attendees.length, type: 'partial' },
  ] : [];

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddAttendee = (value: string | Attendee | null) => {
    if (!value) return;

    let newAttendee: Attendee;
    if (typeof value === 'string') {
      const matchingContact = mockContacts.find(c => c.email.toLowerCase() === value.trim().toLowerCase());
      newAttendee = matchingContact || {
        id: Date.now().toString(),
        email: value.trim(),
        isContact: false,
      };
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
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => setActiveStep(1)}
                    disabled={!title}
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
                    freeSolo
                    options={mockContacts}
                    inputValue={inputValue}
                    onInputChange={(e, newValue) => setInputValue(newValue)}
                    onChange={(e, newValue) => handleAddAttendee(newValue)}
                    getOptionLabel={(option) => typeof option === 'string' ? option : option.name || option.email}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Add people by name or email" />
                    )}
                    renderOption={(props, option) => {
                      const { key, ...otherProps } = props;
                      if (typeof option === 'string') return null;
                      return (
                        <Box component="li" key={key} {...otherProps} sx={{ display: 'flex', gap: 1 }}>
                          <PersonIcon sx={{ color: 'primary.main' }} />
                          <Box>
                            <Typography variant="body2">{option.name}</Typography>
                            <Typography variant="caption" color="text.secondary">{option.email}</Typography>
                          </Box>
                        </Box>
                      );
                    }}
                  />

                  {attendees.length > 0 && (
                    <Stack spacing={1}>
                      {attendees.map((attendee) => (
                        <Box
                          key={attendee.id}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: 2,
                            bgcolor: '#f8fafc',
                            borderRadius: '8px',
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ width: 32, height: 32 }}>{attendee.name?.charAt(0) || attendee.email.charAt(0)}</Avatar>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>{attendee.name || attendee.email}</Typography>
                              {attendee.name && <Typography variant="caption" color="text.secondary">{attendee.email}</Typography>}
                            </Box>
                          </Box>
                          <IconButton size="small" onClick={() => setAttendees(attendees.filter(a => a.id !== attendee.id))}>
                            <ArrowForwardIcon sx={{ transform: 'rotate(45deg)' }} />
                          </IconButton>
                        </Box>
                      ))}
                    </Stack>
                  )}

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

                  {suggestedTimes.length === 0 ? (
                    <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#f8fafc', borderRadius: '8px' }}>
                      <Typography color="text.secondary">Add attendees to see suggested times</Typography>
                    </Box>
                  ) : (
                    <>
                      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                        {suggestedTimes.map((slot) => (
                          <Box
                            key={slot.id}
                            onClick={() => {
                              if (selectedSlots.includes(slot.id)) {
                                setSelectedSlots(selectedSlots.filter(id => id !== slot.id));
                              } else if (selectedSlots.length < 3) {
                                setSelectedSlots([...selectedSlots, slot.id]);
                              }
                            }}
                            sx={{
                              p: 2.5,
                              border: '2px solid',
                              borderColor: selectedSlots.includes(slot.id) ? 'primary.main' : '#e5e7eb',
                              borderRadius: '12px',
                              cursor: 'pointer',
                              bgcolor: selectedSlots.includes(slot.id) ? 'primary.main' : 'white',
                              color: selectedSlots.includes(slot.id) ? 'white' : 'inherit',
                              position: 'relative',
                              '&:hover': {
                                borderColor: 'primary.main',
                              },
                            }}
                          >
                            {selectedSlots.includes(slot.id) && (
                              <Chip
                                label={selectedSlots.indexOf(slot.id) + 1}
                                size="small"
                                sx={{
                                  position: 'absolute',
                                  top: 8,
                                  right: 8,
                                  bgcolor: 'white',
                                  color: 'primary.main',
                                  fontWeight: 700,
                                }}
                              />
                            )}
                            <Typography variant="body2" sx={{ mb: 0.5 }}>{slot.day}</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>{slot.time}</Typography>
                            <Typography variant="caption">
                              {slot.available === slot.total ? 'Everyone free' : `${slot.available}/${slot.total} available`}
                            </Typography>
                          </Box>
                        ))}
                      </Box>

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
                    onClick={() => router.push('/home')}
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

                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>Attendees</Typography>
                  <Autocomplete
                    size="small"
                    freeSolo
                    options={mockContacts}
                    inputValue={inputValue}
                    onInputChange={(e, newValue) => setInputValue(newValue)}
                    onChange={(e, newValue) => handleAddAttendee(newValue)}
                    getOptionLabel={(option) => typeof option === 'string' ? option : option.name || option.email}
                    renderInput={(params) => <TextField {...params} placeholder="Add people..." />}
                  />

                  {attendees.length > 0 && (
                    <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: 'wrap' }}>
                      {attendees.map((attendee) => (
                        <Chip
                          key={attendee.id}
                          label={attendee.name || attendee.email}
                          onDelete={() => setAttendees(attendees.filter(a => a.id !== attendee.id))}
                          size="small"
                        />
                      ))}
                    </Stack>
                  )}
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Right: Suggested Times */}
          <Card sx={{ border: '1px solid #e5e7eb' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Suggested Times</Typography>

              {attendees.length === 0 ? (
                <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#f8fafc', borderRadius: '8px' }}>
                  <GroupsIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Add attendees to see available times
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={2}>
                  {suggestedTimes.map((slot) => (
                    <Box
                      key={slot.id}
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
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        bgcolor: selectedSlots.includes(slot.id) ? '#f0f9ff' : 'white',
                        '&:hover': { borderColor: 'primary.main' },
                      }}
                    >
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{slot.day}</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>{slot.time}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {slot.available === slot.total ? 'All free' : `${slot.available}/${slot.total} free`}
                        </Typography>
                      </Box>
                      {selectedSlots.includes(slot.id) && <CheckCircleIcon color="primary" />}
                    </Box>
                  ))}

                  {selectedSlots.length > 0 && (
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      onClick={() => router.push('/home')}
                      sx={{ textTransform: 'none', mt: 2 }}
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
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>Who should attend?</Typography>
              <Autocomplete
                freeSolo
                options={mockContacts}
                inputValue={inputValue}
                onInputChange={(e, newValue) => setInputValue(newValue)}
                onChange={(e, newValue) => handleAddAttendee(newValue)}
                getOptionLabel={(option) => typeof option === 'string' ? option : option.name || option.email}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Type a name or email..." />
                )}
              />

              {attendees.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  {attendees.map((attendee) => (
                    <Box
                      key={attendee.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 1.5,
                        mb: 1,
                        bgcolor: '#f8fafc',
                        borderRadius: '8px',
                      }}
                    >
                      <Avatar sx={{ width: 32, height: 32 }}>{attendee.name?.charAt(0) || attendee.email.charAt(0)}</Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {attendee.name || attendee.email}
                        </Typography>
                      </Box>
                      <IconButton size="small" onClick={() => setAttendees(attendees.filter(a => a.id !== attendee.id))}>
                        ×
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Smart Results */}
          {attendees.length > 0 && title && (
            <Card sx={{ border: '2px solid', borderColor: 'primary.main', bgcolor: '#f0f9ff' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <CheckCircleIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Found {suggestedTimes.filter(s => s.type === 'perfect').length} perfect times!
                  </Typography>
                </Box>

                <Stack spacing={1.5}>
                  {suggestedTimes.slice(0, 3).map((slot) => (
                    <Box
                      key={slot.id}
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
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        '&:hover': { bgcolor: selectedSlots.includes(slot.id) ? 'primary.dark' : '#f8fafc' },
                      }}
                    >
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {slot.day} at {slot.time}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.7 }}>
                          Everyone is available
                        </Typography>
                      </Box>
                      {selectedSlots.includes(slot.id) && <CheckCircleIcon />}
                    </Box>
                  ))}
                </Stack>

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={selectedSlots.length === 0}
                  onClick={() => router.push('/home')}
                  sx={{ mt: 3, textTransform: 'none', bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: '#f8fafc' } }}
                >
                  Send Invite ({selectedSlots.length} selected)
                </Button>
              </CardContent>
            </Card>
          )}
        </Stack>
      </Box>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ minHeight: '100vh', bgcolor: '#fafbfc' }}>
        {/* Header matching dashboard */}
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

        {/* Version Content */}
        {version === 1 && renderVersion1()}
        {version === 2 && renderVersion2()}
        {version === 3 && renderVersion3()}
      </Box>
    </LocalizationProvider>
  );
}
