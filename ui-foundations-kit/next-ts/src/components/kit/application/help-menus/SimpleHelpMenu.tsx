'use client'
import * as React from 'react';
import { Button, Menu, MenuItem, Tooltip, Divider } from '@mui/material';
import { IoMdHelp } from 'react-icons/io';

export default function SimpleHelpMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title='Help and Resources' arrow placement='top-start'>
        <Button
          onClick={handleClick}
          size='large'
          sx={{
            color: 'primary.200',
            display: { xs: 'none', sm: 'flex' },
            backgroundColor: 'gray.800',
            '&:hover, &:focus, &:active': {
              backgroundColor: 'gray.700',
            },
            position: 'fixed',
            bottom: 0,
            right: 0,
            margin: 3,
            px: 0,
            boxShadow: 2,
            borderRadius: 99,
            minWidth: 'inherit',
            width: 36,
            height: 36,
          }}
        >
          <IoMdHelp />
        </Button>
      </Tooltip>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        disablePortal={true}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        sx={{
          transform: 'translateY(-12px)',
        }}
      >
        <MenuItem dense onClick={handleClose}>
          Help Center
        </MenuItem>
        <MenuItem dense onClick={handleClose}>
          Support Forum
        </MenuItem>
        <MenuItem dense onClick={handleClose}>
          Changelog
        </MenuItem>
        <Divider />
        <MenuItem dense onClick={handleClose}>
          Keyboard shortcuts
        </MenuItem>
        <MenuItem dense onClick={handleClose}>
          Contact Support
        </MenuItem>
        <MenuItem dense onClick={handleClose}>
          Change language
        </MenuItem>
      </Menu>
    </>
  );
}
