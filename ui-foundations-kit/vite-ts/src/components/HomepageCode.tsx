import { Box } from '@mui/material';
import * as React from 'react';

import { CodeRenderer } from '~/components/CodeRenderer';
import { FrameworkLink } from '~/framework/FrameworkLink';

export function HomepageCode() {
  const [activeLanguage, setActiveLanguage] = React.useState<'tsx' | 'jsx'>('tsx');

  const handleLanguageChange = (
    _event: React.MouseEvent<HTMLElement>,
    newActiveLanguage: 'tsx' | 'jsx',
  ) => {
    if (newActiveLanguage !== null) {
      setActiveLanguage(newActiveLanguage);
    }
  };
  const code = activeLanguage === 'jsx' ? tsxCode : tsxCode;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '100%',
        width: '100%',
        maxHeight: 400,
        '#code-box': {
          fontSize: 'xs',
          overflowY: 'hidden',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          height: '100%',
          maxHeight: 400,
          paddingLeft: { xs: 2, md: 6 },
          paddingRight: { xs: 2, md: 6 },
        }}
      >
        <CodeRenderer
          code={code}
          activeLanguage={activeLanguage}
          handleLanguageChange={handleLanguageChange}
        />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: -64,
          background:
            'linear-gradient(hsla(0,0%,100%,.4),hsla(0,0%,100%,.3) 25%,rgba(246,249,252,.3) 50%,rgba(246,249,252,.3) 60%)',
          borderRadius: 2,
          borderColor: 'gray.200',
          borderWidth: 1,
          borderStyle: 'solid',
          backdropFilter: 'saturate(125%) blur(4px)',
          p: { xs: 2, md: 1 },
        }}
      >
        <FrameworkLink to="/dashboard/home">
          <Box
            sx={{
              position: 'absolute',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              inset: 0,
              transition: 'background-color 0.3s',
              '&:hover': {
                cursor: 'pointer',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <Box
              sx={{
                backgroundColor: 'gray.700',
                borderRadius: 999,
                paddingX: 2,
                paddingY: 1,
                color: 'background.paper',
                fontSize: 'sm',
                boxShadow: 4,
              }}
            >
              Preview Dashboard
            </Box>
          </Box>
        </FrameworkLink>
        <Box
          sx={{
            bgcolor: 'background.paper',
            width: '100%',
            height: '100%',
            borderRadius: 1,
            boxShadow: 3,
            minHeight: '140px',
            maxHeight: '320px',
            overflowY: 'hidden',
            '& > div': {
              maxWidth: '100%',
            },
          }}
        >
          <img
            src="/homepage.png"
            alt="Homepage"
            style={{ width: '100%', height: '100%', aspectRatio: '1.818 / 1' }}
          />
        </Box>
      </Box>
    </Box>
  );
}

const tsxCode = `import { Box, Paper } from '@mui/material';
import { Sidebar, SIDEBAR_WIDTH } from '~/components/Sidebar';
import { useRegisterTours } from '~/context/TourProvider';
export function DashboardLayout() {
  useRegisterTours();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '200px 1fr' },
        width: '100%',
        height: '100%',
        minHeight: '100vh',
      }}
    >
      <Sidebar />
      <MobileNav />
      <HelpMenu />
      <Box
        sx={{
          py: { xs: 0, sm: 1 },
          pr: { xs: 0, sm: 1 },
          height: '100%',
          width: {
            xs: 'calc(100vw)',
            sm: 'calc(100vw - 200px)',
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
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
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
}`;
