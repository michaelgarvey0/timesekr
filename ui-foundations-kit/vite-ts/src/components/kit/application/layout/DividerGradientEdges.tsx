import * as React from 'react';
import { Box } from '@mui/material';
// divider with soft gradated edges
export default function DividerLabelWithGradientEdges() {
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
          backgroundImage: theme =>
            `linear-gradient(to left, ${theme.palette.gray['300']}, transparent)`,
          marginRight: 2,
        },
        '&::after': {
          content: '""',
          flex: 1,
          height: '1px',
          backgroundImage: theme =>
            `linear-gradient(to right, ${theme.palette.gray['300']}, transparent)`,
          marginLeft: 2,
        },
      }}
    >
      Get started
    </Box>
  );
}
