'use client';

import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ContactsConnectionForm from './components/ContactsConnectionForm';

export default function InviteTeamPage() {
  const router = useRouter();

  const handleConnect = () => {
    router.push('/dashboard');
  };

  const handleSkip = () => {
    router.push('/dashboard');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', p: 4, position: 'relative' }}>
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
  );
}
