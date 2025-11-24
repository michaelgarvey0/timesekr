'use client';

import { Box, Typography, Button, Chip, Stack, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/Warning';

interface InviteeResponseFormProps {
  meeting: any;
  inviteeResponses: { [timeId: number]: boolean };
  cannotMakeAny: boolean;
  isSubmitted: boolean;
  isEditing: boolean;
  onResponseChange: (timeId: number, checked: boolean) => void;
  onCannotMakeAnyChange: (checked: boolean) => void;
  onEdit: () => void;
  onSubmit: () => void;
  conflicts?: { [timeId: number]: boolean };
  conflictDetails?: { [timeId: number]: string };
}

export default function InviteeResponseForm({
  meeting,
  inviteeResponses,
  cannotMakeAny,
  isSubmitted,
  isEditing,
  onResponseChange,
  onCannotMakeAnyChange,
  onEdit,
  onSubmit,
  conflicts = {},
  conflictDetails = {}
}: InviteeResponseFormProps) {
  const selectedCount = Object.values(inviteeResponses).filter(Boolean).length;
  const totalTimes = meeting.proposedTimes.length;

  return (
    <>
      {/* Selection Status Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Select all times that work for you
          </Typography>
          {selectedCount > 0 && (
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', mt: 0.5 }}>
              {selectedCount} of {totalTimes} selected
            </Typography>
          )}
        </Box>
        {selectedCount === totalTimes && (
          <Chip
            label="All times selected"
            color="success"
            size="small"
            icon={<CheckIcon />}
            sx={{ fontWeight: 600 }}
          />
        )}
      </Box>

      {/* Proposed Times - Compact Card Design */}
      <Stack spacing={1.5} sx={{ mb: 2 }}>
        {meeting.proposedTimes.map((time: any, index: number) => {
          const isWinningTime = time.id === meeting.winningTime.id;
          const isSelected = inviteeResponses[time.id] || false;
          const hasConflict = conflicts[time.id] || false;
          const availabilityPercent = (time.votes / meeting.totalAttendees) * 100;

          return (
            <Box
              key={time.id}
              onClick={() => {
                if (!cannotMakeAny && isEditing) {
                  onResponseChange(time.id, !isSelected);
                }
              }}
              sx={{
                p: 2.5,
                bgcolor: hasConflict ? '#fef2f2' : (isSelected ? '#f0f9ff' : 'background.paper'),
                border: '2px solid',
                borderColor: hasConflict ? '#fca5a5' : (isSelected ? '#3b82f6' : '#e5e7eb'),
                borderRadius: 2,
                cursor: (cannotMakeAny || !isEditing) ? 'default' : 'pointer',
                transition: 'all 0.2s',
                '&:hover': (cannotMakeAny || !isEditing) ? {} : {
                  borderColor: isSelected ? '#2563eb' : '#9ca3af',
                  boxShadow: 1,
                },
                display: 'flex',
                alignItems: 'center',
                gap: 3,
              }}
            >
              {/* Selection Number Badge */}
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  bgcolor: isSelected ? 'primary.main' : 'grey.200',
                  color: isSelected ? 'white' : 'text.secondary',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s',
                }}
              >
                {isSelected ? (
                  <CheckIcon sx={{ fontSize: 28 }} />
                ) : (
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {index + 1}
                  </Typography>
                )}
              </Box>

              {/* Time Details */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {time.day}
                  </Typography>
                  {isWinningTime && (
                    <Chip
                      label="Most Popular"
                      size="small"
                      color="primary"
                      sx={{ height: 22, fontSize: '0.7rem', fontWeight: 600 }}
                    />
                  )}
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {time.time} - {time.endTime}
                </Typography>

                {hasConflict ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <WarningIcon sx={{ fontSize: 16, color: 'error.main' }} />
                    <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 500 }}>
                      {conflictDetails[time.id] || 'Conflicts with your calendar'}
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="caption" sx={{ color: 'success.dark', fontWeight: 500 }}>
                    ✓ No conflicts
                  </Typography>
                )}
              </Box>

              {/* Availability Indicator */}
              <Box sx={{ textAlign: 'right', minWidth: 120 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: availabilityPercent >= 70 ? 'success.main' : availabilityPercent >= 40 ? 'warning.main' : 'error.main' }}>
                  {time.votes}/{meeting.totalAttendees}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                  available
                </Typography>
                <Box sx={{ mt: 1, height: 6, bgcolor: 'grey.200', borderRadius: 1, overflow: 'hidden' }}>
                  <Box
                    sx={{
                      height: '100%',
                      width: `${availabilityPercent}%`,
                      bgcolor: availabilityPercent >= 70 ? 'success.main' : availabilityPercent >= 40 ? 'warning.main' : 'error.main',
                      transition: 'width 0.3s',
                    }}
                  />
                </Box>
              </Box>
            </Box>
          );
        })}
      </Stack>

      {/* Cannot Make Any Option */}
      <Box sx={{ p: 2, bgcolor: '#fef2f2', border: '1px solid', borderColor: 'error.light', borderRadius: 1, mb: 2.5 }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={cannotMakeAny}
                onChange={(e) => onCannotMakeAnyChange(e.target.checked)}
                disabled={isSubmitted && !isEditing}
              />
            }
            label={
              <Typography variant="body2" sx={{ fontWeight: cannotMakeAny ? 600 : 400 }}>
                I cannot make any of these times
              </Typography>
            }
          />
        </FormGroup>
      </Box>

      {/* Submit/Edit Buttons */}
      {isSubmitted && !isEditing ? (
        <Button
          variant="outlined"
          fullWidth
          startIcon={<EditIcon />}
          sx={{ textTransform: 'none', minHeight: '42px' }}
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          Edit Response
        </Button>
      ) : (
        <Button
          variant="contained"
          fullWidth
          startIcon={<CheckIcon />}
          sx={{ textTransform: 'none', minHeight: '42px' }}
          onClick={(e) => {
            e.stopPropagation();
            onSubmit();
          }}
        >
          {isSubmitted ? 'Update Response' : 'Submit Response'}
        </Button>
      )}
    </>
  );
}
