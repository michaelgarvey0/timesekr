import { Box, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { HelpMenu } from '~/components/HelpMenu';
import { MobileNav } from '~/components/MobileNav';
import { Sidebar, SIDEBAR_WIDTH } from '~/components/Sidebar';
import { useRegisterTours } from '~/context/TourProvider';

export function DashboardLayout() {
  useRegisterTours();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: `${SIDEBAR_WIDTH}px 1fr` },
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <Sidebar />
      <MobileNav />
      <HelpMenu />
      <Box
        sx={{
          py: { xs: 0, sm: 1 },
          pr: { xs: 0, sm: 1 },
          height: '100vh',
          width: {
            xs: `calc(100vw)`,
            sm: `calc(100vw - ${SIDEBAR_WIDTH}px)`,
          },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Paper
          sx={{
            height: '100%',
            width: '100%',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: (theme) => `${theme.palette.gray['400']} transparent`,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            border: (theme) => `1px solid ${theme.palette.gray['200']}`,
            boxShadow: 1,
            borderRadius: { xs: 0, sm: 1.5 },
            backgroundColor: 'background.paper',
          }}
        >
          <Outlet />
        </Paper>
      </Box>
    </Box>
  );
}
