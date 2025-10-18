import * as React from 'react';
import { Box, Button } from '@mui/material';
import { TbStar } from 'react-icons/tb';
// complex buttons
export default function ButtonComplex() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <Button
        color="secondary"
        variant="outlined"
        size="small"
        startIcon={<TbStar />}
        endIcon={
          <Box
            component="span"
            sx={{
              bgcolor: 'gray.100',
              borderRadius: 99,
              px: 1,
              '&&&': {
                fontWeight: 600,
                fontSize: 'xs',
              },
            }}
          >
            33
          </Box>
        }
      >
        Star
      </Button>
      <Button
        color="secondary"
        variant="outlined"
        size="medium"
        startIcon={<TbStar />}
        endIcon={
          <Box
            component="span"
            sx={{
              bgcolor: 'gray.100',
              borderRadius: 99,
              px: 1,
              '&&&': {
                fontWeight: 600,
                fontSize: 'sm',
              },
            }}
          >
            33
          </Box>
        }
      >
        Star
      </Button>
      <Button
        color="secondary"
        variant="outlined"
        size="large"
        startIcon={<TbStar />}
        endIcon={
          <Box
            component="span"
            sx={{
              bgcolor: 'gray.100',
              borderRadius: 99,
              px: 1,
              '&&&': {
                fontWeight: 600,
                fontSize: 'md',
              },
            }}
          >
            33
          </Box>
        }
      >
        Star
      </Button>
    </Box>
  );
}
