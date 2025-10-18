'use client'
import { Box, Stack, Typography } from '@mui/material';
import { PageContainer } from '~/components/PageContainer';
import { DefaultLayout } from '~/components/WebsiteLayout';

export function Error404() {
  return (
    <DefaultLayout>
      <PageContainer
        customSx={{
          minHeight: '75vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack
          spacing={2}
          sx={{
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              padding: 0.5,
              borderRadius: 3,
              backgroundColor: 'gray.100',
              display: 'flex',
              alignItems: 'center',
              width: 'max-content',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: 200,
                height: 150,
                border: (theme) => `1px solid ${theme.palette.grey[300]}`,
                borderRadius: 2.5,
                backgroundColor: 'background.paper',
              }}
            >
              <Box
                sx={{
                  padding: 1.5,
                  width: '100%',
                  borderBottom: (theme) => `1px solid ${theme.palette.grey[200]}`,
                }}
              >
                <Stack spacing={1} direction="row" sx={{}}>
                  <Box
                    sx={{ height: 8, width: 8, backgroundColor: 'green.600', borderRadius: 999 }}
                  />
                  <Box
                    sx={{ height: 8, width: 8, backgroundColor: 'yellow.600', borderRadius: 999 }}
                  />
                  <Box
                    sx={{ height: 8, width: 8, backgroundColor: 'red.600', borderRadius: 999 }}
                  />
                </Stack>
              </Box>
              <Box
                // make a decorative element with aria
                aria-hidden
                role="presentation"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '54px',
                  lineHeight: 1,
                  fontWeight: 600,
                  fontFamily: 'monospace',
                  width: '100%',
                  height: '100%',
                }}
              >
                404
              </Box>
            </Box>
          </Box>
          <Typography variant="h1">Page not found</Typography>
          <Box
            sx={{
              fontSize: 'md',
              color: 'gray.600',
              textAlign: 'center',
              maxWidth: '74ch',
              // balance text
              textWrap: 'balance',
            }}
          >
            The page you are looking for at{' '}
            <Box
              component="code"
              sx={{
                backgroundColor: 'gray.100',
                paddingX: 1,
                paddingY: 0.25,
                borderRadius: 1,
                fontWeight: 500,
              }}
            >
              {typeof window !== 'undefined' && window.location.href}
            </Box>{' '}
            could not be found. Please check the URL or use the navbar menu to find what you are
            looking for.
          </Box>
        </Stack>
      </PageContainer>
    </DefaultLayout>
  );
}
