'use client';

import { Box, Typography, Button, Chip, Stack, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

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
  onSubmit
}: InviteeResponseFormProps) {
  return (
    <>
      {/* Invitee View: Response Form */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Please select which times work for you:
      </Typography>

      {/* Proposed Times with Checkboxes - Horizontal Layout */}
      <Stack direction="row" spacing={1.5} sx={{ mb: 2 }}>
        {meeting.proposedTimes.map((time: any) => {
          const isWinningTime = time.id === meeting.winningTime.id;
          return (
            <Box
              key={time.id}
              sx={{
                flex: 1,
                p: 2,
                bgcolor: isWinningTime ? '#f0f9ff' : '#f8fafc',
                border: isWinningTime ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                borderRadius: '8px',
                position: 'relative',
                minHeight: 120,
              }}
            >
              {/* Checkbox in top right */}
              <Checkbox
                checked={inviteeResponses[time.id] || false}
                onChange={(e) => onResponseChange(time.id, e.target.checked)}
                disabled={cannotMakeAny || !isEditing}
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  '& .MuiSvgIcon-root': { fontSize: 28 }
                }}
              />

              {/* Most Popular chip in top left */}
              {isWinningTime && (
                <Chip
                  label="Most Popular"
                  size="small"
                  color="primary"
                  sx={{ position: 'absolute', top: 8, left: 8, height: 20, fontSize: '0.65rem', fontWeight: 600 }}
                />
              )}

              {/* Centered time info */}
              <Box sx={{ textAlign: 'center', pt: isWinningTime ? 4 : 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: isWinningTime ? '#1e40af' : 'inherit' }}>
                  {time.day}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: isWinningTime ? '#1e40af' : 'inherit' }}>
                  {time.time}
                </Typography>
                <Typography variant="caption" color={isWinningTime ? 'primary' : 'text.secondary'}>
                  {time.votes}/{meeting.totalAttendees} available
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Stack>

      {/* Cannot Make Any Option */}
      <Box sx={{ p: 2, bgcolor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', mb: 2.5 }}>
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
