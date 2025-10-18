import * as React from 'react';
import { Box, Container } from '@mui/material';
// constrained container with outer padding
export default function ContainerBasic() {
  return (
    <Box
      sx={{
        px: 3,
        bgcolor: 'red.50',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: 'gray.300',
          height: '100%',
          bgcolor: 'background.paper',
          position: 'relative',
          // this pseudo element can be deleted when used
          '::before': {
            content: '""',
            inset: 16,
            position: 'absolute',
            borderStyle: 'dashed',
            borderColor: 'gray.200',
            borderWidth: 3,
            borderRadius: 1,
          },
        }}
      />
    </Box>
  );
}
