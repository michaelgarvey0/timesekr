import * as React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { FiX } from 'react-icons/fi';
import { HiOutlineCheckCircle } from 'react-icons/hi';
// Minimal notification
export default function SimpleNotification({
  title = 'Email Confirmed',
  subtitle = 'You can now browse around the app freely',
  onClose = () => {},
  icon = <HiOutlineCheckCircle size={24} />,
}) {
  return (
    <Box
      sx={{
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
          color: 'green.500',
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
