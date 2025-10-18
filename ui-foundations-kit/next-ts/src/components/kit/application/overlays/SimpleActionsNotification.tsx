'use client'
import * as React from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { FiX } from 'react-icons/fi';
import { HiOutlineArchive } from 'react-icons/hi';
// Simple notification with actions
export default function SimpleActionsNotification({
  title = 'Project archived',
  subtitle = 'Your project has been removed from this view, you will no longer be able to find it',
  onClose = () => {},
  icon = <HiOutlineArchive size={24} />,
  onComplete = () => {},
  onDismiss = () => {},
}) {
  return (
    <Box
      sx={{
        maxWidth: '400px',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        columnGap: 2,
        bgcolor: 'background.paper',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'gray.200',
        borderRadius: 2,
        p: 1.5,
        boxShadow: 3,
        fontSize: 'sm',
        color: 'gray.800',
      }}
    >
      <Box
        sx={{
          color: 'gray.500',
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          sx={{
            color: 'gray.800',
            fontWeight: 500,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: 'sm',
            color: 'gray.500',
          }}
        >
          {subtitle}
        </Typography>
        <Box
          sx={{
            ml: -1,
            mt: 0.5,
          }}
        >
          <Button
            size='small'
            sx={{
              px: 1,
              py: 0.25,
              minWidth: 0,
            }}
            onClick={onComplete}
          >
            Undo
          </Button>
          <Button
            color='secondary'
            size='small'
            sx={{
              px: 1,
              py: 0.25,
              minWidth: 0,
            }}
            onClick={onDismiss}
          >
            Dismiss
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          m: -0.5,
        }}
      >
        <IconButton onClick={onClose}>
          <FiX />
        </IconButton>
      </Box>
    </Box>
  );
}
