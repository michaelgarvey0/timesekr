import { Avatar, Box, Button, Menu, MenuItem, Stack } from '@mui/material';
import { TbArrowsDiff, TbChevronDown, TbPlus, TbSettings } from 'react-icons/tb';
import { CreateOrganizationDialog } from '~/components/CreateOrganizationDialog';
import { MenuDivider } from '~/components/MenuDivider';
import { useDisclosure } from '~/hooks/useDisclosure';

export function OrganizationSelector() {
  const selectorDisclosure = useDisclosure({ provideAnchorEl: true });
  const createOrgDisclosure = useDisclosure();

  return (
    <>
      <Button
        id="org-button"
        aria-controls={selectorDisclosure.isOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={selectorDisclosure.isOpen ? 'true' : undefined}
        onClick={selectorDisclosure.onOpen}
        color="secondary"
        startIcon={
          <Avatar
            sx={{ height: 24, width: 24, fontSize: 'sm' }}
            src="/ui-foundations.svg"
            alt="Active organization avatar"
          >
            UI
          </Avatar>
        }
        endIcon={<TbChevronDown size={16} />}
        sx={{
          px: 1.5,
          fontWeight: 600,
          color: 'gray.800',
          width: '100%',
          justifyContent: 'flex-start',
          fontSize: 'base',
        }}
      >
        <Box
          sx={{
            textAlign: 'left',
            width: '100%',
          }}
        >
          UI Foundations
        </Box>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={selectorDisclosure.anchorEl}
        open={selectorDisclosure.isOpen}
        onClose={selectorDisclosure.onClose}
        MenuListProps={{
          'aria-labelledby': 'org-button',
        }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 250,
              fontSize: 'sm',
            },
          },
        }}
      >
        <MenuItem disabled>
          <TbArrowsDiff />
          Switch Organization
        </MenuItem>
        <MenuDivider />
        <MenuItem onClick={selectorDisclosure.onClose}>
          <OrganizationRow name="UI Foundations" src="/ui-foundations.svg" />
        </MenuItem>
        <MenuItem onClick={selectorDisclosure.onClose}>
          <OrganizationRow name="Diamond Events" src="/gem-events.svg" />
        </MenuItem>
        <MenuDivider />
        <MenuItem onClick={selectorDisclosure.onClose}>
          <TbSettings />
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            selectorDisclosure.onClose();
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

function OrganizationRow({ name, src }: { name: string; src?: string }) {
  return (
    <Stack direction="row" spacing={1}>
      <Avatar src={src} sx={{ height: 24, width: 24, fontSize: 'sm' }}>
        UI
      </Avatar>
      <Box>{name}</Box>
    </Stack>
  );
}
