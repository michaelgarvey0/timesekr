'use client';

import { Box, Typography, Button, Chip, Stack, Modal, IconButton, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';

interface InviteeResponseModalProps {
  meeting: any;
  onClose: () => void;
}

export default function InviteeResponseModal({ meeting, onClose }: InviteeResponseModalProps) {
  const [responses, setResponses] = useState<{ [key: number]: 'available' | 'unavailable' | null }>({});
  const [cannotMakeAny, setCannotMakeAny] = useState(false);

  const handleResponseChange = (timeId: number, value: 'available' | 'unavailable' | null) => {
    setResponses(prev => ({
      ...prev,
      [timeId]: value
    }));
    if (cannotMakeAny) setCannotMakeAny(false);
  };

  const handleCannotMakeAnyChange = (checked: boolean) => {
    setCannotMakeAny(checked);
    if (checked) {
      // Clear all individual responses
      const clearedResponses: { [key: number]: null } = {};
      meeting.proposedTimes.forEach((time: any) => {
        clearedResponses[time.id] = null;
      });
      setResponses(clearedResponses);
    }
  };

  const handleSubmit = () => {
    // TODO: Submit the responses
    console.log('Submitting responses:', { responses, cannotMakeAny });
    alert('Response submitted!');
    onClose();
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '95%', sm: '90%', md: 700 },
          maxHeight: '85vh',
          bgcolor: 'background.paper',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Fixed Modal Header */}
        <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexShrink: 0 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              {meeting.title}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              {'organizer' in meeting && (
                <Typography variant="body2" color="text.secondary">
                  Organized by {meeting.organizer}
                </Typography>
              )}
              <Chip
                label={meeting.status}
                size="small"
                color={meeting.statusColor as any}
              />
            </Stack>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Scrollable Content Area */}
        <Box sx={{ overflowY: 'auto', flex: 1, p: 3 }}>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            Please select which times work for you. The organizer will use your response to pick the best time for everyone.
          </Typography>

          {/* Proposed Times */}
          <Stack spacing={2.5}>
            {meeting.proposedTimes.map((time: any) => {
              const isWinningTime = time.id === meeting.winningTime.id;
              return (
                <Box
                  key={time.id}
                  sx={{
                    p: 2.5,
                    bgcolor: isWinningTime ? '#f0f9ff' : '#f8fafc',
                    border: isWinningTime ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                    borderRadius: '8px',
                    position: 'relative',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5, color: isWinningTime ? '#1e40af' : 'inherit' }}>
                        {time.day} @ {time.time}
                      </Typography>
                      <Typography variant="caption" color={isWinningTime ? 'primary' : 'text.secondary'}>
                        {time.votes}/{meeting.totalAttendees} people available
                      </Typography>
                    </Box>
                    {isWinningTime && (
                      <Chip
                        label="Most Popular"
                        size="small"
                        color="primary"
                        sx={{ height: 24, fontSize: '0.75rem', fontWeight: 600 }}
                      />
                    )}
                  </Box>

                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      value={responses[time.id] || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleResponseChange(time.id, value === 'available' ? 'available' : value === 'unavailable' ? 'unavailable' : null);
                      }}
                    >
                      <FormControlLabel
                        value="available"
                        control={<Radio disabled={cannotMakeAny} />}
                        label="Available"
                        sx={{
                          mr: 3,
                          '& .MuiFormControlLabel-label': {
                            fontWeight: responses[time.id] === 'available' ? 600 : 400
                          }
                        }}
                      />
                      <FormControlLabel
                        value="unavailable"
                        control={<Radio disabled={cannotMakeAny} />}
                        label="Not Available"
                        sx={{
                          '& .MuiFormControlLabel-label': {
                            fontWeight: responses[time.id] === 'unavailable' ? 600 : 400
                          }
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              );
            })}
          </Stack>

          {/* Cannot Make Any Option */}
          <Box sx={{ mt: 3, p: 2.5, bgcolor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px' }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cannotMakeAny}
                    onChange={(e) => handleCannotMakeAnyChange(e.target.checked)}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ fontWeight: cannotMakeAny ? 600 : 400 }}>
                    I cannot make any of these times
                  </Typography>
                }
              />
            </FormGroup>
            {cannotMakeAny && (
              <Typography variant="caption" color="text.secondary" sx={{ ml: 4, display: 'block', mt: 0.5 }}>
                The organizer will be notified that none of these times work for you.
              </Typography>
            )}
          </Box>
        </Box>

        {/* Fixed Modal Footer */}
        <Box sx={{ p: 3, borderTop: '1px solid #e5e7eb', bgcolor: '#fafbfc', flexShrink: 0 }}>
          <Stack direction="row" spacing={1.5}>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{ textTransform: 'none', flex: 1, minHeight: '42px' }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={<CheckIcon />}
              onClick={handleSubmit}
              sx={{ textTransform: 'none', flex: 2, minHeight: '42px' }}
            >
              Submit Response
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}
