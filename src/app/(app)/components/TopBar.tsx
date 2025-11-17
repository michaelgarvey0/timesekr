'use client';

import { AppBar, Toolbar, Box, Avatar, IconButton, Menu, MenuItem, Typography, Divider, Button, ButtonGroup, ListItemIcon, ListItemText } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface TopBarProps {
  viewMode?: 'organizer' | 'invitee';
  onViewModeChange?: (mode: 'organizer' | 'invitee') => void;
  showViewModeToggle?: boolean;
}

export default function TopBar({ viewMode = 'organizer', onViewModeChange, showViewModeToggle = false }: TopBarProps) {
  const router = useRouter();
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: 'white',
        borderBottom: '1px solid',
        borderColor: 'grey.200',
        color: 'text.primary'
      }}
    >
      <Toolbar sx={{ minHeight: '56px', py: 1 }}>
        {/* Logo */}
        <Box sx={{ flexGrow: 0, mr: 4 }}>
          <Image src="/images/logomark.svg" alt="timesēkr" width={120} height={32} priority />
        </Box>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Profile */}
        <IconButton
          onClick={(e) => setProfileMenuAnchor(e.currentTarget)}
          sx={{ p: 0 }}
        >
          <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>M</Avatar>
        </IconButton>

        {/* Profile Menu */}
        <Menu
          anchorEl={profileMenuAnchor}
          open={Boolean(profileMenuAnchor)}
          onClose={() => setProfileMenuAnchor(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Box sx={{ px: 2, py: 1.5, minWidth: 200 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Michael Garvey
            </Typography>
            <Typography variant="caption" color="text.secondary">
              michael@example.com
            </Typography>
          </Box>
          <Divider />

          {/* View Mode Switcher */}
          {showViewModeToggle && onViewModeChange && (
            <>
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                  VIEW AS
                </Typography>
                <ButtonGroup variant="outlined" fullWidth size="small">
                  <Button
                    onClick={() => onViewModeChange('organizer')}
                    variant={viewMode === 'organizer' ? 'contained' : 'outlined'}
                    sx={{ textTransform: 'none', py: 0.75 }}
                  >
                    Organizer
                  </Button>
                  <Button
                    onClick={() => onViewModeChange('invitee')}
                    variant={viewMode === 'invitee' ? 'contained' : 'outlined'}
                    sx={{ textTransform: 'none', py: 0.75 }}
                  >
                    Invitee
                  </Button>
                </ButtonGroup>
              </Box>
              <Divider />
            </>
          )}

          <MenuItem onClick={() => setProfileMenuAnchor(null)}>
            <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => router.push('/')}>
            <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
