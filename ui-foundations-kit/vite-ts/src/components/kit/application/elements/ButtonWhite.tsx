import * as React from 'react';
import { Box, Button } from '@mui/material';
// white buttons
export default function ButtonWhite() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <Button color='secondary' variant='outlined' size='small'>
        Button
      </Button>
      <Button color='secondary' variant='outlined' size='medium'>
        Button
      </Button>
      <Button color='secondary' variant='outlined' size='large'>
        Button
      </Button>
    </Box>
  );
}
