import { Box, Button, LinearProgress, Stack } from '@mui/material';
import { TbLoader } from 'react-icons/tb';
import { useBroadcastTour } from '../context/BroadcastTourProvider';
import { useFrameworkNavigate } from '../framework/useFrameworkNavigate';
export function OnboardingButton() {
  const { broadcastTour } = useBroadcastTour();
  const navigate = useFrameworkNavigate();
  return (
    <Button
      variant="outlined"
      color="secondary"
      size="small"
      onClick={() => {
        navigate('/dashboard/home');
        broadcastTour('welcome');
      }}
      sx={{
        borderRadius: 2,
        width: '100%',
        whiteSpace: 'nowrap',
        textTransform: 'none',
        borderColor: 'gray.200',
        p: 2,
      }}
    >
      <Stack spacing={1} sx={{ width: '100%' }}>
        <Box
          sx={{
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            lineHeight: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '16px',
              height: '16px',
              backgroundColor: 'gray.100',
              borderRadius: 1,
            }}
          >
            <TbLoader size={16} />
          </Box>
          Take a tour of the app
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            fontSize: '9px',
            fontWeight: 500,
            borderRadius: 1,
            lineHeight: 1,
            color: 'primary.600',
          }}
        >
          2/7 steps completed
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none',
            width: '100%',
            // round the linear progress bar
            '.MuiLinearProgress-bar': {
              borderRadius: 999,
            },
            '.MuiLinearProgress-root': {
              borderRadius: 999,
              backgroundColor: 'primary.100',
              height: 5,
            },
          }}
        >
          <LinearProgress
            variant="determinate"
            sx={{
              width: '100%',
            }}
            value={(2 / 7) * 100}
          />
        </Box>
      </Stack>
    </Button>
  );
}
