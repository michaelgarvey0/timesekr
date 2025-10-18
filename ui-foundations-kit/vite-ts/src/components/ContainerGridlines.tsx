import { Box, Container } from '@mui/material';

import { VerticalDottedGridline } from '~/components/DottedGridline';

export function ContainerGridlines() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        isolation: 'isolate',
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          borderLeftWidth: 1,
          borderLeftStyle: 'dashed',
          borderLeftColor: 'gray.200',
          borderRightWidth: 1,
          borderRightStyle: 'dashed',
          borderRightColor: 'gray.200',
          opacity: 0.75,
          px: 1,
        }}
      >
        <VerticalDottedGridline />
      </Box>
    </Container>
  );
}
