import * as React from 'react';
import { Box, Button, Divider, Menu, MenuItem } from '@mui/material';
import { TbHelp, TbLogout, TbSettings } from 'react-icons/tb';
// menu with a status of who is signed in
export default function MenuLoggedIn() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Open Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        disablePortal={true}
      >
        <MenuItem
          disabled
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              lineHeight: 1,
              fontSize: 9,
              mt: 1,
            }}
          >
            Signed in as:
          </Box>
          <Box sx={{ fontWeight: 500 }}>kyle@uifoundations.com</Box>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleClose}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <TbSettings />
          Settings
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <TbHelp />
          Help
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <TbLogout />
          Sign Out
        </MenuItem>
      </Menu>
    </Box>
  );
}
