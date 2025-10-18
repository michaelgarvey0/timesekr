import React from 'react';
import { Box, Theme, Typography } from '@mui/material';
import { HiBeaker } from 'react-icons/hi';
import { TbCurrencyDollar, TbGlobe, TbRocket, TbWorld } from 'react-icons/tb';
// 3 column features with icons
export default function FeaturesSimpleColumn() {
  const Feature = ({
    title,
    icon,
    children,
  }: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }) => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          px: { xs: 2, md: 4 },
        }}
      >
        <Box
          sx={{
            width: 'max-content',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 1.5,
            borderRadius: 999,
            bgcolor: 'primary.50',
            color: 'primary.600',
            borderColor: 'primary.600',
            borderWidth: 1.5,
            borderStyle: 'solid',
            mb: { sm: 0.5, md: 1 },
            boxShadow: 2,
          }}
        >
          {icon}
        </Box>
        <Typography
          variant='h3'
          sx={{
            fontWeight: 600,
            fontSize: '2xl',
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            lineHeight: '1.85',
          }}
          color='gray.600'
        >
          {children}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          sm: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gridGap: (theme: Theme) => theme.spacing(6),
        maxWidth: {
          sm: '50ch',
          md: '100%',
        },
      }}
    >
      <Feature title='Launch faster' icon={<TbRocket size={20} />}>
        What we lack in features we make up for in speed, less code runs faster
        than more code.
      </Feature>
      <Feature
        title='Drive revenue growth'
        icon={<TbCurrencyDollar size={20} />}
      >
        Slow and steady wins the race. Even growing 1% month over month is still
        technically considered growth.
      </Feature>

      <Feature title='Scale worldwide' icon={<TbGlobe size={20} />}>
        If you make sure to copy/paste the page contents into Google translate
        first, our site is accessible from anywhere in the world.
      </Feature>
    </Box>
  );
}
