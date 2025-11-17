'use client';

import { Box, Typography, Button, Avatar, Chip, Stack, LinearProgress, Modal, IconButton, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import RemoveIcon from '@mui/icons-material/Remove';

// Helper functions for attendee display
const getAttendeeDisplayName = (attendee: any) => {
  if (attendee.onPlatform && attendee.firstName && attendee.lastName) {
    return `${attendee.firstName} ${attendee.lastName}`;
  }
  return attendee.email || 'Unknown';
};

const getAttendeeInitials = (attendee: any) => {
  if (attendee.onPlatform && attendee.firstName && attendee.lastName) {
    return `${attendee.firstName[0]}${attendee.lastName[0]}`;
  }
  return attendee.email ? attendee.email[0].toUpperCase() : '?';
};

interface MeetingDetailsModalProps {
  meeting: any;
  onClose: () => void;
}

export default function MeetingDetailsModal({ meeting, onClose }: MeetingDetailsModalProps) {
  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '95%', sm: '90%', md: 1400 },
          maxHeight: '85vh',
          bgcolor: 'background.paper',
          boxShadow: 5,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Fixed Modal Header */}
        <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'grey.200', display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexShrink: 0 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              {meeting.title}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Typography variant="body2" color="text.secondary">
                {meeting.totalAttendees} attendees
              </Typography>
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
        <Box sx={{ overflowY: 'auto', flex: 1 }}>
          {/* Response Progress */}
          <Box sx={{ p: 3, bgcolor: 'background.level2' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>Response Progress</Typography>
              <Typography variant="body2" color="text.secondary">
                {meeting.responded}/{meeting.totalAttendees} responded
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(meeting.responded / meeting.totalAttendees) * 100}
              sx={{
                height: 8,
                borderRadius: 1,
                bgcolor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  bgcolor: meeting.status === 'Ready' ? 'success.main' : 'secondary.main',
                }
              }}
            />
          </Box>

          {/* Availability Grid */}
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Availability Grid
              </Typography>
              {meeting.responded < meeting.totalAttendees && (
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<EmailIcon />}
                  sx={{ textTransform: 'none' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Nudging ${meeting.totalAttendees - meeting.responded} non-responders`);
                  }}
                >
                  Nudge All Pending ({meeting.totalAttendees - meeting.responded})
                </Button>
              )}
            </Box>
            <Box sx={{ mb: 2, display: 'flex', gap: 3, justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', bgcolor: '#dcfce7' }}>
                  <CheckIcon sx={{ fontSize: 14, color: '#16a34a' }} />
                </Box>
                <Typography variant="caption" color="text.secondary">Available</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', bgcolor: '#fee2e2' }}>
                  <ClearIcon sx={{ fontSize: 14, color: '#dc2626' }} />
                </Box>
                <Typography variant="caption" color="text.secondary">Unavailable</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', bgcolor: '#f3f4f6' }}>
                  <RemoveIcon sx={{ fontSize: 14, color: '#9ca3af' }} />
                </Box>
                <Typography variant="caption" color="text.secondary">Not Selected</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, border: '1px solid #e5e7eb' }} />
                <Typography variant="caption" color="text.secondary">No Response</Typography>
              </Box>
            </Box>
            <Box sx={{ overflowX: 'auto' }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, bgcolor: 'background.level2', borderBottom: '2px solid', borderColor: 'grey.200', position: 'sticky', left: 0, zIndex: 1 }}>
                      Attendee
                    </TableCell>
                    {meeting.proposedTimes.map((time: any) => (
                      <TableCell
                        key={time.id}
                        align="center"
                        sx={{
                          fontWeight: 600,
                          bgcolor: time.id === meeting.winningTime.id ? 'background.accent' : 'background.level2',
                          borderBottom: '2px solid',
                          borderColor: 'grey.200',
                          minWidth: 160,
                        }}
                      >
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {time.day}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {time.time}
                          </Typography>
                        </Box>
                        {time.id === meeting.winningTime.id && (
                          <Chip
                            label="Best"
                            size="small"
                            color="primary"
                            sx={{ mt: 1, height: 20, fontSize: '0.65rem', fontWeight: 600 }}
                          />
                        )}
                      </TableCell>
                    ))}
                    <TableCell sx={{ fontWeight: 600, bgcolor: 'background.level2', borderBottom: '2px solid', borderColor: 'grey.200', minWidth: 100 }} align="center">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {meeting.attendees.map((attendee: any, idx: number) => (
                    <TableRow
                      key={idx}
                      sx={{
                        '&:hover': { bgcolor: 'background.level1' },
                      }}
                    >
                      <TableCell sx={{ position: 'sticky', left: 0, bgcolor: 'white', zIndex: 1, borderBottom: '1px solid', borderColor: 'grey.100' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar sx={{ bgcolor: attendee.onPlatform ? 'primary.main' : '#94a3b8', width: 32, height: 32, fontSize: '0.75rem' }}>
                            {getAttendeeInitials(attendee)}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.25 }}>
                              {getAttendeeDisplayName(attendee)}
                            </Typography>
                            {!attendee.onPlatform && (
                              <Typography variant="caption" color="text.secondary">
                                Email only
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      {meeting.proposedTimes.map((time: any) => {
                        const availability = attendee.availability?.[time.id];
                        const isWinningTime = time.id === meeting.winningTime.id;
                        return (
                          <TableCell
                            key={time.id}
                            align="center"
                            sx={{
                              bgcolor: isWinningTime ? 'background.accent' : 'inherit',
                              borderBottom: '1px solid',
                              borderColor: 'grey.100',
                            }}
                          >
                            {availability === 'available' && (
                              <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', bgcolor: '#dcfce7' }}>
                                <CheckIcon sx={{ fontSize: 18, color: '#16a34a' }} />
                              </Box>
                            )}
                            {availability === 'unavailable' && (
                              <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', bgcolor: '#fee2e2' }}>
                                <ClearIcon sx={{ fontSize: 18, color: '#dc2626' }} />
                              </Box>
                            )}
                            {!availability && attendee.responded && (
                              <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', bgcolor: '#f3f4f6' }}>
                                <RemoveIcon sx={{ fontSize: 18, color: '#9ca3af' }} />
                              </Box>
                            )}
                            {!availability && !attendee.responded && (
                              <Box sx={{ width: 32, height: 32 }} />
                            )}
                          </TableCell>
                        );
                      })}
                      <TableCell align="center" sx={{ borderBottom: '1px solid', borderColor: 'grey.100' }}>
                        {!attendee.responded && (
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<EmailIcon />}
                            sx={{ textTransform: 'none', minWidth: 80 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              alert(`Nudging ${getAttendeeDisplayName(attendee)}`);
                            }}
                          >
                            Nudge
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
        </Box>

        {/* Fixed Modal Footer */}
        <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'grey.200', bgcolor: 'background.level1', flexShrink: 0 }}>
          <Stack direction="row" spacing={1.5}>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              sx={{ textTransform: 'none', flex: 1, minHeight: '42px' }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              startIcon={<EmailIcon />}
              sx={{ textTransform: 'none', flex: 1, minHeight: '42px' }}
            >
              Send Reminder
            </Button>
            <Button
              variant="contained"
              startIcon={<EmailIcon />}
              sx={{ textTransform: 'none', flex: 1, minHeight: '42px' }}
            >
              Send Invite
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}
