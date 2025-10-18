'use client'
import * as React from 'react';
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Popover,
  Typography,
  Divider,
} from '@mui/material';
import { IoMdHelp } from 'react-icons/io';
import { HiX } from 'react-icons/hi';

export default function ExplanatoryHelpMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <>
      <Tooltip title='Help and Resources' arrow placement='top-start'>
        <Button
          onClick={handleClick}
          size='large'
          variant='outlined'
          color='secondary'
          sx={{
            display: { xs: 'none', sm: 'flex' },
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
      <Popover
        id='help-menu'
        open={open}
        disablePortal={true}
        anchorEl={anchorEl}
        onClose={handleClose}
        container={() => document.body}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        sx={{
          '.MuiPaper-root': {
            boxShadow: 2,
          },
        }}
      >
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            padding: 4,
            minWidth: 300,
            maxWidth: 440,
            gap: 2,
            position: 'relative',
            width: '100%',
          }}
        >
          <IconButton
            size='small'
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: '12px',
              right: '12px',
            }}
          >
            <HiX />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant='h3' fontSize='xl'>
              Help
            </Typography>
          </Box>
          <Box
            sx={{
              color: 'gray.600',
              fontSize: 'sm',
            }}
          >
            Running into an issue? You can reach out to us via email at{' '}
            <Box component='a' sx={{ color: 'primary.600' }} href={undefined}>
              support@uifoundations.com
            </Box>{' '}
            or check out some of our docs with the links below.
          </Box>
          <Divider
            light
            sx={{
              width: '100%',
            }}
          />
          <Box>
            <Typography variant='h4' fontSize='md'>
              Helpful links
            </Typography>
            <Box
              component='ul'
              sx={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              <Box component='li' sx={{ fontSize: 'sm' }}>
                <Box
                  component='a'
                  target='_blank'
                  rel='noopener noreferrer'
                  sx={{ color: 'primary.600' }}
                  href={undefined}
                >
                  Contact Sales
                </Box>
              </Box>
              <Box component='li' sx={{ fontSize: 'sm' }}>
                <Box
                  component='a'
                  target='_blank'
                  rel='noopener noreferrer'
                  sx={{ color: 'primary.600' }}
                  href={undefined}
                >
                  Support
                </Box>
              </Box>
            </Box>
          </Box>
          {children}
        </Box>
      </Popover>
    </>
  );
}
