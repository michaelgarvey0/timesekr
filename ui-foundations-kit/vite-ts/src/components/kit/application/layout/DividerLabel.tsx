import * as React from 'react';
import { Box } from '@mui/material';
// divider with simple centered label
export default function DividerLabel() {
  return (
    <Box
      role='separator'
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
          backgroundColor: 'gray.300',
          marginRight: 2,
        },
        '&::after': {
          content: '""',
          flex: 1,
          height: '1px',
          backgroundColor: 'gray.300',
          marginLeft: 2,
        },
      }}
    >
      Continue with
    </Box>
  );
}
