'use client';

import { Box, Typography, Button, Stack, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function WelcomeOnboardingPage() {
  const router = useRouter();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 2, sm: 4 } }}>
      <Box sx={{ maxWidth: 560, width: '100%', textAlign: 'center' }}>
        <Box sx={{ mb: { xs: 2, sm: 3 }, display: 'flex', justifyContent: 'center' }}>
          <Image
            src="/images/logomark.svg"
            alt="timesēkr"
            width={180}
            height={48}
            priority
          />
        </Box>

        <Typography variant="h3" sx={{ mb: 2, fontWeight: 600, fontSize: { xs: '1.75rem', sm: '3rem' } }}>
          Say goodbye to scheduling headaches 👋
        </Typography>

        <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400, lineHeight: 1.6, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          No more endless email chains or back-and-forth. Just instant availability.
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            mb: { xs: 3, sm: 4 },
            bgcolor: 'primary.50',
            border: '1px solid',
            borderColor: 'primary.100',
            borderRadius: 2,
          }}
        >
          <Stack spacing={2} sx={{ textAlign: 'left' }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <CheckCircleOutlineIcon sx={{ color: 'primary.main', fontSize: 24, mt: 0.25 }} />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Connect calendars, see everyone's availability
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  When everyone's connected, scheduling is instant
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <AutoAwesomeIcon sx={{ color: 'primary.main', fontSize: 24, mt: 0.25 }} />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Automated polls when calendars aren't linked
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Like Doodle, but smarter—with your preferences built in
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <CheckCircleOutlineIcon sx={{ color: 'primary.main', fontSize: 24, mt: 0.25 }} />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Coordinate across teams and organizations
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Schedule meetings with anyone, anywhere
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Paper>

        <Button
          variant="contained"
          size="large"
          onClick={() => router.push('/onboarding/calendars')}
          sx={{
            textTransform: 'none',
            px: 6,
            py: 1.5,
            fontSize: '1.1rem',
          }}
        >
          Let's get you set up
        </Button>
      </Box>
    </Box>
  );
}
