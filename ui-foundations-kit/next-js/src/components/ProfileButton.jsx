'use client';
import { Avatar, Box, Button, Menu, MenuItem } from '@mui/material';
import { TbDotsVertical, TbPlus, TbSettings, TbUserCircle } from 'react-icons/tb';
import { CreateOrganizationDialog } from '../components/CreateOrganizationDialog';
import { MenuDivider } from '../components/MenuDivider';
import { FrameworkLink } from '../framework/FrameworkLink';
import { useDisclosure } from '../hooks/useDisclosure';
export function ProfileButton() {
  const profileDisclosure = useDisclosure({ provideAnchorEl: true });
  const createOrgDisclosure = useDisclosure();
  return (
    <>
      <Button
        id="org-button"
        aria-controls={profileDisclosure.isOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={profileDisclosure.isOpen ? 'true' : undefined}
        onClick={profileDisclosure.onOpen}
        color="secondary"
        startIcon={
          <Avatar
            sx={{
              height: 32,
              width: 32,
              border: (theme) => `1px solid ${theme.palette.gray[200]}`,
              boxShadow: 1,
              color: 'gray.700',
              backgroundColor: 'background.paper',
              '&&': { fontSize: 'sm' },
            }}
          >
            AA
          </Avatar>
        }
        endIcon={<TbDotsVertical size={16} />}
        sx={{
          px: 1.5,
          fontWeight: 500,
          color: 'gray.800',
          width: '100%',
          justifyContent: 'flex-start',
          fontSize: 'base',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            lineHeight: 1.2,
          }}
        >
          <Box>Ally Allen</Box>
          <Box
            sx={{
              fontWeight: 400,
              color: 'gray.500',
              fontSize: '2xs',
            }}
          >
            ally.allen@example.com
          </Box>
        </Box>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={profileDisclosure.anchorEl}
        open={profileDisclosure.isOpen}
        onClose={profileDisclosure.onClose}
        MenuListProps={{
          'aria-labelledby': 'org-button',
        }}
        // anchor to the top instead of the bottom
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 250,
              fontSize: 'sm',
              transform: 'translateY(-4px) !important',
              // dont give links underline or blue text
              a: {
                color: 'gray.800',
                textDecoration: 'none',
                '&:hover': {
                  bgcolor: 'transparent',
                },
              },
            },
          },
        }}
      >
        <FrameworkLink to="/dashboard/account">
          <MenuItem onClick={profileDisclosure.onClose}>
            <TbUserCircle />
            My Profile
          </MenuItem>
        </FrameworkLink>
        <MenuDivider />
        <MenuItem onClick={profileDisclosure.onClose}>
          <TbSettings />
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            profileDisclosure.onClose();
            createOrgDisclosure.onOpen();
          }}
        >
          <TbPlus />
          Create New Organization
        </MenuItem>
      </Menu>
      <CreateOrganizationDialog disclosure={createOrgDisclosure} />
    </>
  );
}
