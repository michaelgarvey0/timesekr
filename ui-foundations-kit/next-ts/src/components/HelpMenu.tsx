'use client'
import { Button, Menu, MenuItem, Tooltip } from '@mui/material';
import { IoMdHelp } from 'react-icons/io';
import { TbHeadset, TbKeyboard, TbLanguage } from 'react-icons/tb';
import { MenuDivider } from '~/components/MenuDivider';
import { useDisclosure } from '~/hooks/useDisclosure';

export function HelpMenu() {
  const helpMenuDisclosure = useDisclosure({ provideAnchorEl: true });

  return (
    <>
      <Tooltip title="Help and Resources" arrow placement="top-start">
        <Button
          onClick={helpMenuDisclosure.onOpen}
          size="large"
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
            isolation: 'isolate',
            zIndex: 100,
          }}
        >
          <IoMdHelp />
        </Button>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={helpMenuDisclosure.anchorEl}
        open={helpMenuDisclosure.isOpen}
        onClose={helpMenuDisclosure.onClose}
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
        <MenuItem dense onClick={helpMenuDisclosure.onClose}>
          Help Center
        </MenuItem>
        <MenuItem dense onClick={helpMenuDisclosure.onClose}>
          Support Forum
        </MenuItem>
        <MenuItem dense onClick={helpMenuDisclosure.onClose}>
          Changelog
        </MenuItem>
        <MenuDivider />
        <MenuItem dense onClick={helpMenuDisclosure.onClose}>
          <TbKeyboard />
          Keyboard shortcuts
        </MenuItem>
        <MenuItem dense onClick={helpMenuDisclosure.onClose}>
          <TbHeadset />
          Contact Support
        </MenuItem>
        <MenuItem dense onClick={helpMenuDisclosure.onClose}>
          <TbLanguage />
          Change language
        </MenuItem>
      </Menu>
    </>
  );
}
