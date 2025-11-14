'use client';

import { useState } from 'react';
import { Box, Button, ButtonGroup, Stack, Modal, Typography, Divider, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import DesignOption1 from './design-option-1';
import DesignOption3 from './design-option-3';
import { useDeviceView } from '../contexts/DeviceViewContext';

export default function HomePage() {
  const [viewState, setViewState] = useState<'option1' | 'option3'>('option1');
  const [cardView, setCardView] = useState<'detailed' | 'compact'>('detailed');
  const [viewMode, setViewMode] = useState<'organizer' | 'invitee'>('organizer');
  const { deviceView, setDeviceView } = useDeviceView();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <Box>
      {/* Settings Button */}
      <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
        <Button
          variant="contained"
          onClick={() => setSettingsOpen(true)}
          startIcon={<SettingsIcon />}
          sx={{ textTransform: 'none', boxShadow: 3 }}
        >
          View Settings
        </Button>
      </Box>

      {/* Settings Modal */}
      <Modal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 400 },
            bgcolor: 'background.paper',
            borderRadius: '12px',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              View Settings
            </Typography>
            <IconButton onClick={() => setSettingsOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Stack spacing={3}>
            {/* Device View */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5, color: 'text.secondary' }}>
                DEVICE
              </Typography>
              <ButtonGroup variant="outlined" fullWidth>
                <Button
                  onClick={() => setDeviceView('desktop')}
                  variant={deviceView === 'desktop' ? 'contained' : 'outlined'}
                  sx={{ textTransform: 'none' }}
                >
                  Desktop
                </Button>
                <Button
                  onClick={() => setDeviceView('mobile')}
                  variant={deviceView === 'mobile' ? 'contained' : 'outlined'}
                  sx={{ textTransform: 'none' }}
                >
                  Mobile
                </Button>
              </ButtonGroup>
            </Box>

            <Divider />

            {/* View Mode */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5, color: 'text.secondary' }}>
                VIEW AS
              </Typography>
              <ButtonGroup variant="outlined" fullWidth>
                <Button
                  onClick={() => setViewMode('organizer')}
                  variant={viewMode === 'organizer' ? 'contained' : 'outlined'}
                  sx={{ textTransform: 'none' }}
                >
                  Organizer
                </Button>
                <Button
                  onClick={() => setViewMode('invitee')}
                  variant={viewMode === 'invitee' ? 'contained' : 'outlined'}
                  sx={{ textTransform: 'none' }}
                >
                  Invitee
                </Button>
              </ButtonGroup>
            </Box>

            <Divider />

            {/* Design Layout */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5, color: 'text.secondary' }}>
                LAYOUT
              </Typography>
              <ButtonGroup variant="outlined" fullWidth>
                <Button
                  onClick={() => setViewState('option1')}
                  variant={viewState === 'option1' ? 'contained' : 'outlined'}
                  sx={{ textTransform: 'none' }}
                >
                  Tabs
                </Button>
                <Button
                  onClick={() => setViewState('option3')}
                  variant={viewState === 'option3' ? 'contained' : 'outlined'}
                  sx={{ textTransform: 'none' }}
                >
                  Sidebar
                </Button>
              </ButtonGroup>
            </Box>

            <Divider />

            {/* Card View */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5, color: 'text.secondary' }}>
                CARD STYLE
              </Typography>
              <ButtonGroup variant="outlined" fullWidth>
                <Button
                  onClick={() => setCardView('detailed')}
                  variant={cardView === 'detailed' ? 'contained' : 'outlined'}
                  sx={{ textTransform: 'none' }}
                >
                  Detailed
                </Button>
                <Button
                  onClick={() => setCardView('compact')}
                  variant={cardView === 'compact' ? 'contained' : 'outlined'}
                  sx={{ textTransform: 'none' }}
                >
                  Compact
                </Button>
              </ButtonGroup>
            </Box>
          </Stack>

          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setSettingsOpen(false)}
              sx={{ textTransform: 'none' }}
            >
              Done
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Content */}
      {viewState === 'option1' && <DesignOption1 cardView={cardView} viewMode={viewMode} isMobile={deviceView === 'mobile'} />}
      {viewState === 'option3' && <DesignOption3 cardView={cardView} viewMode={viewMode} isMobile={deviceView === 'mobile'} />}
    </Box>
  );
}
