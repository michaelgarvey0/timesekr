import * as React from 'react';
import { Box, Button } from '@mui/material';
// primary buttons
export default function ButtonPrimary() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <Button color="primary" variant="contained" size="small">
        Button
      </Button>
      <Button color="primary" variant="contained" size="medium">
        Button
      </Button>
      <Button color="primary" variant="contained" size="large">
        Button
      </Button>
    </Box>
  );
}
