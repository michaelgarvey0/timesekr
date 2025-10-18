'use client'
import * as React from 'react';
import { Box, IconButton, LinearProgress, Typography } from '@mui/material';
import { TbEditCircle, TbPin, TbShare, TbShoe } from 'react-icons/tb';

export default function StatProgress() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        borderRadius: 1,
        p: 3,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'gray.200',
        width: '100%',
        maxWidth: 480,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          rowGap: 1,
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'primary.500',
              bgcolor: 'primary.100',
              borderRadius: 1,
              height: 36,
              width: 36,
            }}
          >
            <TbShoe size={20} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant='h2'>Step challenge</Typography>
            <Typography
              sx={{
                color: 'gray.500',
                fontSize: 'sm',
                lineHeight: 1,
              }}
            >
              20k per day
            </Typography>
          </Box>
        </Box>
        <Box>
          <IconButton>
            <TbShare />
          </IconButton>
          <IconButton>
            <TbEditCircle />
          </IconButton>
          <IconButton color='primary'>
            <TbPin />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          mb: 0.5,
        }}
      >
        <Typography
          sx={{
            fontSize: 'sm',
            color: 'gray.500',
          }}
        >
          Progress
        </Typography>
        <Typography
          sx={{
            fontSize: 'sm',
            color: 'gray.500',
          }}
        >
          46%
        </Typography>
      </Box>
      <Box>
        <LinearProgress
          value={46}
          variant='determinate'
          sx={{
            height: 10,
            borderRadius: 1,
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 'sm', sm: 'md' },
            fontWeight: 500,
            color: 'gray.700',
          }}
        >
          9,200{' '}
          <Box
            component='span'
            sx={{
              fontSize: 'xs',
              color: 'gray.500',
            }}
          >
            / 20,000
          </Box>
        </Typography>
        <Box
          component='span'
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 'max-content',
            px: 1,
            py: 0,
            fontSize: { xs: 10, sm: 'xs' },
            fontWeight: 600,
            color: 'yellow.700',
            bgcolor: 'yellow.100',
            borderRadius: 1,
            textTransform: 'uppercase',
          }}
        >
          11 hours left
        </Box>
      </Box>
    </Box>
  );
}
