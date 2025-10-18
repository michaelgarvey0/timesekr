import * as React from 'react';
import { Box, Button } from '@mui/material';
import { TbArrowRight } from 'react-icons/tb';
// end icon buttons
export default function ButtonEndIcon() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <Button color="primary" variant="contained" size="small" endIcon={<TbArrowRight />}>
        Get Started
      </Button>
      <Button color="primary" variant="contained" size="medium" endIcon={<TbArrowRight />}>
        Get Started
      </Button>
      <Button color="primary" variant="contained" size="large" endIcon={<TbArrowRight />}>
        Get Started
      </Button>
    </Box>
  );
}
