'use client'
import * as React from 'react';
import { Box, Button, Drawer, IconButton, Typography } from '@mui/material';
import { HiX } from 'react-icons/hi';
// Drawer with a title and empty panel
export default function DrawerEmpty() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = (open: boolean) => (_event: React.SyntheticEvent) => {
    setOpen(open);
  };
  return (
    <>
      <Button onClick={toggleDrawer(true)}>Open</Button>
      <Drawer
        anchor='right'
        open={open}
        onClose={toggleDrawer(false)}
        disablePortal={true}
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
            <Typography variant='h2'>Drawer Title</Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <HiX size={20} />
            </IconButton>
          </Box>
          <Box
            sx={{
              px: 3,
              flex: 1,
            }}
          >
            <Box
              sx={{
                borderRadius: 1,
                borderWidth: 3,
                borderStyle: 'dashed',
                borderColor: 'gray.200',
                height: '100%',
              }}
            />
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
