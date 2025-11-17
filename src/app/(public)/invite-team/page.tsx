'use client';

import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ContactsConnectionForm from './components/ContactsConnectionForm';

const valueProps = [
  'Schedule meetings across organizations instantly',
  'Find availability without endless email chains',
  'Coordinate with teams across companies seamlessly',
  'Save hours on meeting scheduling',
];

export default function InviteTeamPage() {
  const router = useRouter();
  const [currentPropIndex, setCurrentPropIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPropIndex((prev) => (prev + 1) % valueProps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleConnect = () => {
    router.push('/dashboard');
  };

  const handleSkip = () => {
    router.push('/dashboard');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left side - Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          position: 'relative',
        }}
      >
        <IconButton
          onClick={() => router.back()}
          sx={{ position: 'absolute', top: 16, left: 16 }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Box sx={{ maxWidth: 320, width: '100%' }}>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
            <Image
              src="/images/logomark.svg"
              alt="timesēkr"
              width={150}
              height={40}
              priority
            />
          </Box>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
            Connect your contacts
          </Typography>

          <ContactsConnectionForm
            onConnect={handleConnect}
            onSkip={handleSkip}
          />
        </Box>
      </Box>

      {/* Right side - Image Container */}
      <Box
        sx={{
          flex: 1,
          p: '24px',
          pr: '24px',
          pt: '24px',
          pb: '24px',
          pl: 0,
        }}
      >
        <Box
          sx={{
            height: '100%',
            bgcolor: '#EDF5F9',
            borderRadius: 2,
            position: 'relative',
            boxShadow: 'inset 0 2px 32px rgba(0, 0, 0, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100%',
            }}
          >
            <Image
              src="/images/graphic.svg"
              alt="Graphic"
              width={400}
              height={400}
              style={{ width: '100%', height: 'auto' }}
            />
          </Box>

          <Box
            sx={{
              position: 'absolute',
              bottom: 48,
              left: 48,
              right: 48,
              textAlign: 'center',
            }}
          >
            <Typography
              key={currentPropIndex}
              variant="h5"
              sx={{
                fontWeight: 500,
                color: 'primary.main',
                animation: 'fadeInOut 4s ease-in-out',
                '@keyframes fadeInOut': {
                  '0%, 100%': { opacity: 0 },
                  '10%, 90%': { opacity: 1 },
                },
              }}
            >
              {valueProps[currentPropIndex]}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
