'use client';

import { Box, Typography, Chip } from '@mui/material';
import { useRouter } from 'next/navigation';
import ContactsConnectionForm from '@/components/ContactsConnectionForm';

export default function ContactsOnboardingPage() {
  const router = useRouter();

  const handleConnect = () => {
    router.push('/home');
  };

  const handleSkip = () => {
    router.push('/home');
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      px: 4,
      py: 8,
      bgcolor: '#fafbfc',
    }}>
      <Box sx={{ maxWidth: 580, width: '100%' }}>
        {/* Step indicator - subtle and clean */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontSize: '0.8rem',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            Step 2 of 2
          </Typography>
        </Box>

        <Box sx={{ mb: 5, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mb: 1.5, fontWeight: 700, fontSize: '2.25rem' }}>
            One more step 🎯
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
            Import contacts to quickly schedule meetings with your network
          </Typography>
        </Box>

        <ContactsConnectionForm
          onConnect={handleConnect}
          onSkip={handleSkip}
        />
      </Box>
    </Box>
  );
}
