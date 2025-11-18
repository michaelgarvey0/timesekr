'use client';

import { Box, Typography } from '@mui/material';
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
    <Box sx={{ minHeight: '100vh', p: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: 32, left: 32 }}>
        <Image
          src="/images/logomark.svg"
          alt="timesēkr"
          width={150}
          height={40}
          priority
        />
      </Box>

      <Box sx={{ maxWidth: 320, width: '100%' }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
          Invite your team
        </Typography>

        <ContactsConnectionForm
          onConnect={handleConnect}
          onSkip={handleSkip}
        />
      </Box>
    </Box>
  );
}
