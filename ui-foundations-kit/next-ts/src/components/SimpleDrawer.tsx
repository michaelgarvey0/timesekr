'use client'
import { Box, Button, Drawer, IconButton, Typography } from '@mui/material';
import { HiX } from 'react-icons/hi';
import { DisclosureProps } from '~/hooks/useDisclosure';

export function SimpleDrawer({
  title,
  disclosure,
  children,
  onSubmit,
}: {
  title: string;
  disclosure: DisclosureProps;
  children: React.ReactNode;
  onSubmit: () => void;
}) {
  return (
    <Drawer
      anchor="right"
      open={disclosure.isOpen}
      onClose={disclosure.onClose}
      disablePortal={true}
      sx={{
        '.MuiPaper-root': {
          boxShadow: 2,
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            // backdropFilter: 'blur(2px)',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          },
        },
      }}
      PaperProps={{
        sx: {
          marginTop: 2,
          marginRight: 2,
          height: '97vh',
          borderRadius: 2,
          border: (theme) => `1px solid ${theme.palette.gray['300']}`,
        },
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '26rem',
          width: '100vw',
          py: 3,
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            px: 3,
          }}
        >
          <Typography variant="h2">{title}</Typography>
          <IconButton onClick={disclosure.onClose}>
            <HiX size={20} />
          </IconButton>
        </Box>
        <Box
          sx={{
            px: 3,
            flex: 1,
          }}
        >
          {children}
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
          bgcolor: 'gray.100',
          px: 3,
          py: 2,
        }}
      >
        <Button variant="outlined" color="secondary" onClick={disclosure.onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onSubmit}>
          Save
        </Button>
      </Box>
    </Drawer>
  );
}
