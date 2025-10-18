import { Box } from '@mui/material';
import * as React from 'react';
export function LabeledDivider({ children }) {
  return (
    <Box
      role="separator"
      sx={{
        display: 'flex',
        alignItems: 'center',
        color: 'gray.400',
        fontSize: 'sm',
        width: '100%',
        '&::before': {
          content: '""',
          flex: 1,
          height: '1px',
          backgroundColor: 'gray.200',
          marginRight: 2,
        },
        '&::after': {
          content: '""',
          flex: 1,
          height: '1px',
          backgroundColor: 'gray.200',
          marginLeft: 2,
        },
      }}
    >
      {children}
    </Box>
  );
}
