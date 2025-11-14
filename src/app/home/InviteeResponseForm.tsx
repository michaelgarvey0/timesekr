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
          const isSelected = inviteeResponses[time.id] || false;
          const hasConflict = conflicts[time.id] || false;
          return (
            <Box
              key={time.id}
              sx={{
                flex: 1,
                p: 2,
                bgcolor: hasConflict ? '#fef2f2' : (isSelected ? '#f0f9ff' : '#f8fafc'),
                border: hasConflict ? '2px solid #fca5a5' : (isSelected ? '2px solid #3b82f6' : '1px solid #e5e7eb'),
                borderRadius: '8px',
                position: 'relative',
                minHeight: 120,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Top row: Chips and Checkbox aligned */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 'auto', gap: 0.5 }}>
                {isWinningTime && (
                  <Chip
                    label="Most Popular"
                    size="small"
                    color="primary"
                    sx={{ height: 20, fontSize: '0.65rem', fontWeight: 600 }}
                  />
                )}
                {!isWinningTime && <Box />}
                <Checkbox
                  checked={isSelected}
                  onChange={(e) => onResponseChange(time.id, e.target.checked)}
                  disabled={cannotMakeAny || !isEditing}
                  sx={{
                    p: 0,
                    '& .MuiSvgIcon-root': { fontSize: 28 }
                  }}
                />
              </Box>

              {/* Bottom aligned time info */}
              <Box sx={{ textAlign: 'center', mt: 'auto' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {time.day}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {time.time}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  {time.votes}/{meeting.totalAttendees} available
                </Typography>
                {hasConflict ? (
                  <Typography variant="caption" sx={{ color: '#dc2626', fontWeight: 500, display: 'block' }}>
                    {conflictDetails[time.id] || 'Conflicts with your calendar'}
                  </Typography>
                ) : (
                  <Typography variant="caption" sx={{ color: '#16a34a', fontWeight: 500, display: 'block' }}>
                    No conflicts
                  </Typography>
                )}
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
