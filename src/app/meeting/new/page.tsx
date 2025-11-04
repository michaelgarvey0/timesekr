'use client';

import { Box, Typography, TextField, Button, IconButton, Stack, Chip, Autocomplete, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Slider, FormControlLabel, Switch } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dayjs, { Dayjs } from 'dayjs';

interface Contact {
  email: string;
  name: string;
  isContact: boolean;
}

interface Attendee {
  id: string;
  email: string;
  name?: string;
  isContact: boolean;
}

const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    height: '42px',
  },
};

// Mock contacts - this would come from the user's linked contacts
const mockContacts: Contact[] = [
  { email: 'john@example.com', name: 'John Doe', isContact: true },
  { email: 'jane@example.com', name: 'Jane Smith', isContact: true },
  { email: 'bob@company.com', name: 'Bob Johnson', isContact: true },
];

export default function CreateMeetingPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [duration, setDuration] = useState(60);
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs().add(2, 'week'));
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);

  // "Me" attendee - always first in the list when isAttending is true
  const meAttendee: Attendee = {
    id: 'me',
    email: 'me@example.com', // Would be actual user email
    name: 'Me',
    isContact: true,
  };

  const [isAttending, setIsAttending] = useState(true);
  const [otherAttendees, setOtherAttendees] = useState<Attendee[]>([]);

  // Computed: combine "Me" with other attendees
  const attendees = isAttending ? [meAttendee, ...otherAttendees] : otherAttendees;

  const handleAddAttendee = (value: string | Contact | null) => {
    if (!value) return;

    let newAttendee: Attendee;

    if (typeof value === 'string') {
      // User entered a raw email - check if it exists in contacts
      if (!value.trim()) return;
      const matchingContact = mockContacts.find(
        c => c.email.toLowerCase() === value.trim().toLowerCase()
      );

      if (matchingContact) {
        newAttendee = {
          id: Date.now().toString(),
          email: matchingContact.email,
          name: matchingContact.name,
          isContact: true,
        };
      } else {
        newAttendee = {
          id: Date.now().toString(),
          email: value.trim(),
          isContact: false,
        };
      }
    } else {
      // User selected from dropdown
      newAttendee = {
        id: Date.now().toString(),
        email: value.email,
        name: value.name,
        isContact: value.isContact,
      };
    }

    // Don't add duplicates (check against all attendees including "Me")
    const allAttendees = isAttending ? [meAttendee, ...otherAttendees] : otherAttendees;
    if (allAttendees.some(a => a.email === newAttendee.email)) {
      setInputValue('');
      return;
    }

    setOtherAttendees([...otherAttendees, newAttendee]);
    setInputValue('');
  };

  const handleRemoveAttendee = (id: string) => {
    if (id === 'me') {
      setIsAttending(false);
    } else {
      setOtherAttendees(otherAttendees.filter(a => a.id !== id));
    }
  };

  // Mock suggested times - would be calculated based on attendees' calendars
  // Organized by availability score (best first)
  const suggestedTimesByAvailability = attendees.length > 0 ? {
    'Everyone Available': [
      {
        date: 'Friday, Jan 17',
        time: '1:00 PM - 2:00 PM',
        available: attendees.length,
        total: attendees.length,
        attendeeAvailability: attendees.map((a) => ({
          ...a,
          status: 'available'
        }))
      },
      {
        date: 'Wednesday, Jan 15',
        time: '10:00 AM - 11:00 AM',
        available: attendees.length,
        total: attendees.length,
        attendeeAvailability: attendees.map((a) => ({
          ...a,
          status: 'available'
        }))
      },
    ],
    'Most Available': [
      {
        date: 'Tuesday, Jan 14',
        time: '2:00 PM - 3:00 PM',
        available: Math.floor(attendees.length * 0.7),
        total: attendees.length,
        attendeeAvailability: attendees.map((a, i) => ({
          ...a,
          status: i % 3 === 0 ? 'available' : i % 3 === 1 ? 'unavailable' : 'unknown'
        }))
      },
      {
        date: 'Wednesday, Jan 15',
        time: '3:00 PM - 4:00 PM',
        available: Math.floor(attendees.length * 0.6),
        total: attendees.length,
        attendeeAvailability: attendees.map((a, i) => ({
          ...a,
          status: i % 3 === 0 ? 'available' : 'unknown'
        }))
      },
      {
        date: 'Thursday, Jan 16',
        time: '11:00 AM - 12:00 PM',
        available: Math.floor(attendees.length * 0.65),
        total: attendees.length,
        attendeeAvailability: attendees.map((a, i) => ({
          ...a,
          status: i % 2 === 0 ? 'available' : 'unknown'
        }))
      },
    ],
    'Some Conflicts': [
      {
        date: 'Tuesday, Jan 14',
        time: '4:00 PM - 5:00 PM',
        available: Math.floor(attendees.length * 0.4),
        total: attendees.length,
        attendeeAvailability: attendees.map((a, i) => ({
          ...a,
          status: i % 2 === 0 ? 'available' : 'unavailable'
        }))
      },
    ],
  } : {};

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ minHeight: '100vh', bgcolor: '#EDF5F9' }}>
        <IconButton
          onClick={() => router.push('/home')}
          sx={{ position: 'absolute', top: 24, left: 24 }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Box sx={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', p: 4 }}>
          <Box sx={{ width: '100%', maxWidth: 1200 }}>
            <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Image
                src="/images/logomark.svg"
                alt="timesēkr"
                width={150}
                height={40}
                priority
              />
              <Typography variant="body1" color="text.secondary">
                Create your meeting
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 4 }}>
              {/* Left Column - Meeting Details */}
              <Box sx={{
                flex: 1,
                bgcolor: 'white',
                p: 4,
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Meeting Details
              </Typography>

          <Stack spacing={2}>
            <TextField
              fullWidth
              size="small"
              label="Meeting Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={textFieldStyle}
            />

            <TextField
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              label="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                Duration
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                {[15, 30, 45, 60, 90, 120].map((mins) => (
                  <Button
                    key={mins}
                    variant={duration === mins ? 'contained' : 'outlined'}
                    onClick={() => setDuration(mins)}
                    sx={{
                      minWidth: 'auto',
                      px: 2,
                      borderRadius: '12px',
                      textTransform: 'none',
                    }}
                  >
                    {mins < 60 ? `${mins}m` : mins === 60 ? '1h' : `${mins / 60}h`}
                  </Button>
                ))}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <TextField
                    size="small"
                    placeholder="Other"
                    type="number"
                    value={![15, 30, 45, 60, 90, 120].includes(duration) ? duration : ''}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val >= 5 && val <= 480) setDuration(val);
                    }}
                    sx={{
                      width: 70,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        height: '36.5px',
                      },
                      '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {
                        opacity: 1,
                      }
                    }}
                  />
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>min</Typography>
                </Box>
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                Search Within
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <DatePicker
                  label="From"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: 'small',
                      sx: textFieldStyle,
                    },
                  }}
                />
                <DatePicker
                  label="To"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  minDate={startDate || undefined}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: 'small',
                      sx: textFieldStyle,
                    },
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 1 }}>
              <Typography variant="subtitle2">
                Add Attendees
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={isAttending}
                    onChange={(e) => setIsAttending(e.target.checked)}
                    size="small"
                  />
                }
                label={<Typography variant="body2">I am attending</Typography>}
                labelPlacement="start"
                sx={{ ml: 0, gap: 1 }}
              />
            </Box>

          <Autocomplete
            multiple
            freeSolo
            value={attendees}
            options={mockContacts}
            filterOptions={(options, params) => {
              const filtered = options.filter((option) => {
                const searchStr = params.inputValue.toLowerCase();
                return (
                  option.name.toLowerCase().includes(searchStr) ||
                  option.email.toLowerCase().includes(searchStr)
                );
              });

              // If there's input and it's not already in contacts, add it as an option to invite
              const existsInContacts = options.some(
                (option) => option.email.toLowerCase() === params.inputValue.toLowerCase()
              );

              if (params.inputValue && !existsInContacts) {
                filtered.push({
                  email: params.inputValue,
                  name: params.inputValue,
                  isContact: false,
                } as Contact);
              }

              return filtered;
            }}
            getOptionLabel={(option) => {
              if (typeof option === 'string') return option;
              if ('email' in option) return option.email;
              return '';
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            onChange={(event, newValue) => {
              // Filter out "Me" if present - we manage that separately with isAttending
              const filteredValue = newValue.filter(a => a.id !== 'me');

              // Check if user added a new attendee
              if (filteredValue.length > otherAttendees.length) {
                const lastValue = filteredValue[filteredValue.length - 1];
                if (typeof lastValue === 'string') {
                  // User typed and pressed enter
                  const matchingContact = mockContacts.find(
                    c => c.email.toLowerCase() === lastValue.trim().toLowerCase()
                  );
                  const newAttendee: Attendee = matchingContact
                    ? {
                        id: Date.now().toString(),
                        email: matchingContact.email,
                        name: matchingContact.name,
                        isContact: true,
                      }
                    : {
                        id: Date.now().toString(),
                        email: lastValue.trim(),
                        isContact: false,
                      };
                  setOtherAttendees([...otherAttendees, newAttendee]);
                } else {
                  // User selected from dropdown
                  const newAttendee: Attendee = {
                    id: Date.now().toString(),
                    email: lastValue.email,
                    name: lastValue.name,
                    isContact: lastValue.isContact,
                  };
                  setOtherAttendees([...otherAttendees, newAttendee]);
                }
              } else {
                // User removed attendees - sync with filtered value
                setOtherAttendees(filteredValue);
              }
              setInputValue('');
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option.id}
                  icon={option.isContact ? <PersonIcon /> : <EmailIcon />}
                  label={option.name || option.email}
                  size="small"
                  variant={option.isContact ? 'filled' : 'outlined'}
                  sx={{
                    bgcolor: option.isContact ? 'primary.main' : 'transparent',
                    color: option.isContact ? 'white' : 'text.primary',
                    borderColor: option.isContact ? 'primary.main' : 'grey.400',
                    border: !option.isContact ? '1px dashed grey' : undefined,
                    '& .MuiChip-icon': {
                      color: option.isContact ? 'white' : 'text.secondary',
                    },
                    '& .MuiChip-deleteIcon': {
                      color: option.isContact ? 'white' : 'text.secondary',
                      '&:hover': {
                        color: option.isContact ? 'grey.200' : 'text.primary',
                      },
                    },
                  }}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                size="small"
                placeholder={attendees.length === 0 ? "Enter email or search contacts" : ""}
                variant="outlined"
              />
            )}
            renderOption={(props, option) => {
              if (typeof option === 'string') return null;

              const { key, ...otherProps } = props;
              return (
                <Box component="li" key={key} {...otherProps}>
                  {option.isContact ? (
                    <>
                      <PersonIcon sx={{ mr: 1, fontSize: 20, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2">{option.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {option.email}
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <>
                      <EmailIcon sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
                      <Box>
                        <Typography variant="body2">{option.email}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Will send invite
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>
              );
            }}
          />

          </Stack>
            </Box>

            {/* Right Column - Suggested Times */}
            <Box sx={{
              flex: 1,
              bgcolor: 'white',
              p: 4,
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Suggested Times
              </Typography>

              {attendees.length === 0 ? (
                <Box sx={{
                  p: 4,
                  textAlign: 'center',
                  bgcolor: 'grey.50',
                  borderRadius: '12px',
                  border: '1px solid',
                  borderColor: 'grey.200'
                }}>
                  <Typography variant="body2" color="text.secondary">
                    Add attendees to see suggested meeting times
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={3}>
                  {Object.entries(suggestedTimesByAvailability).map(([category, slots]) => (
                    <Box key={category}>
                      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, color: 'text.primary' }}>
                        {category}
                      </Typography>
                      <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                        gap: 1.5
                      }}>
                        {slots.map((slot, index) => {
                          const slotId = `${category}-${index}`;
                          const isSelected = selectedTimeSlots.includes(slotId);
                          const selectionNumber = isSelected ? selectedTimeSlots.indexOf(slotId) + 1 : null;
                          return (
                            <Box
                              key={slotId}
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedTimeSlots(selectedTimeSlots.filter(id => id !== slotId));
                                } else if (selectedTimeSlots.length < 3) {
                                  setSelectedTimeSlots([...selectedTimeSlots, slotId]);
                                }
                              }}
                              sx={{
                                p: 1.5,
                                border: '2px solid',
                                borderColor: isSelected ? 'primary.main' : 'grey.300',
                                borderRadius: '12px',
                                cursor: selectedTimeSlots.length >= 3 && !isSelected ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s',
                                bgcolor: isSelected ? 'primary.main' : 'transparent',
                                color: isSelected ? 'white' : 'text.primary',
                                opacity: selectedTimeSlots.length >= 3 && !isSelected ? 0.5 : 1,
                                position: 'relative',
                                '&:hover': {
                                  borderColor: selectedTimeSlots.length >= 3 && !isSelected ? 'grey.300' : 'primary.main',
                                  transform: selectedTimeSlots.length >= 3 && !isSelected ? 'none' : 'translateY(-2px)',
                                  boxShadow: isSelected ? '0 4px 12px rgba(22, 20, 107, 0.3)' : selectedTimeSlots.length >= 3 && !isSelected ? 'none' : '0 2px 8px rgba(0,0,0,0.1)',
                                },
                              }}
                            >
                              {isSelected && (
                                <Box
                                  sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    width: 20,
                                    height: 20,
                                    borderRadius: '50%',
                                    bgcolor: 'white',
                                    color: 'primary.main',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 12,
                                    fontWeight: 700,
                                  }}
                                >
                                  {selectionNumber}
                                </Box>
                              )}
                              <Typography variant="caption" sx={{
                                display: 'block',
                                mb: 0.5,
                                fontWeight: 500,
                                color: isSelected ? 'white' : 'text.secondary'
                              }}>
                                {slot.date}
                              </Typography>
                              <Typography variant="body2" sx={{
                                fontWeight: 600,
                                mb: 0.5,
                                color: isSelected ? 'white' : 'text.primary'
                              }}>
                                {slot.time}
                              </Typography>
                              <Typography variant="caption" sx={{
                                color: isSelected ? 'rgba(255,255,255,0.9)' : 'text.secondary'
                              }}>
                                {slot.available === slot.total ? (
                                  'All free'
                                ) : (
                                  `${slot.available}/${slot.total} free`
                                )}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  ))}

                  {selectedTimeSlots.length > 0 && (
                    <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid', borderColor: 'grey.200' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          Selected Times ({selectedTimeSlots.length}/3)
                        </Typography>
                        <Button
                          variant="contained"
                          disabled={selectedTimeSlots.length === 0}
                          onClick={() => {
                            // TODO: Send meeting request with selected times
                            console.log('Send meeting request with:', selectedTimeSlots);
                          }}
                          sx={{ borderRadius: '12px' }}
                        >
                          Send Meeting Request
                        </Button>
                      </Box>
                      <Stack spacing={1}>
                        {selectedTimeSlots.map((slotId, idx) => {
                          const selectedSlotData = Object.entries(suggestedTimesByAvailability)
                            .flatMap(([category, slots]) =>
                              slots.map((slot, index) => ({ ...slot, id: `${category}-${index}` }))
                            )
                            .find(slot => slot.id === slotId);

                          return selectedSlotData ? (
                            <Box
                              key={slotId}
                              sx={{
                                p: 2,
                                border: '1px solid',
                                borderColor: 'grey.200',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box
                                  sx={{
                                    width: 28,
                                    height: 28,
                                    borderRadius: '50%',
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 14,
                                    fontWeight: 700,
                                    flexShrink: 0,
                                  }}
                                >
                                  {idx + 1}
                                </Box>
                                <Box>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {selectedSlotData.date}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {selectedSlotData.time}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {selectedSlotData.attendeeAvailability.slice(0, 3).map((attendee, i) => (
                                  <Box
                                    key={attendee.id}
                                    sx={{
                                      width: 32,
                                      height: 32,
                                      borderRadius: '50%',
                                      bgcolor: attendee.status === 'available' ? 'success.light' : attendee.status === 'unavailable' ? 'error.light' : 'grey.200',
                                      border: '2px solid white',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      ml: i > 0 ? -1 : 0,
                                    }}
                                  >
                                    {attendee.status === 'available' ? (
                                      <CheckCircleIcon sx={{ fontSize: 16, color: 'success.dark' }} />
                                    ) : attendee.status === 'unavailable' ? (
                                      <CancelIcon sx={{ fontSize: 16, color: 'error.dark' }} />
                                    ) : (
                                      <HelpOutlineIcon sx={{ fontSize: 16, color: 'grey.600' }} />
                                    )}
                                  </Box>
                                ))}
                                {selectedSlotData.attendeeAvailability.length > 3 && (
                                  <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                                    +{selectedSlotData.attendeeAvailability.length - 3}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          ) : null;
                        })}
                      </Stack>
                    </Box>
                  )}
                </Stack>
              )}
            </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
