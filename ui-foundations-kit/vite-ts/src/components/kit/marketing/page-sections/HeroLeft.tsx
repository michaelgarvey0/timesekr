import { Box, Button, Container, Typography } from '@mui/material';
import { FiCheck } from 'react-icons/fi';

export default function HeroLeft() {
  return (
    <Container>
      <Box
        sx={{
          display: { xs: 'flex', md: 'grid' },
          flexDirection: { xs: 'column', md: 'row' },
          gridTemplateColumns: { xs: 'inherit', lg: '1fr 1fr' },
          gridTemplateRows: { xs: 'inherit', md: '1fr' },
          mb: 8,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            textAlign: 'left',
            px: { xs: 0, sm: 2 },
            py: { xs: 3, sm: 4, md: 6 },
            position: 'relative',
          }}
        >
          <Typography
            variant='h1'
            sx={{
              maxWidth: '12ch',
              lineHeight: 1,
              color: 'gray.800',
              letterSpacing: '-1.5px',
              fontSize: { xs: '4xl', sm: '5xl', md: '6xl' },
              fontWeight: 800,
              mb: 2,
            }}
          >
            Beautiful MUI{' '}
            <Box
              component='span'
              sx={{
                color: 'primary.500',
              }}
            >
              Building Blocks
            </Box>
          </Typography>
          <Typography
            mb={2}
            fontSize={{ xs: 'md', md: 'lg' }}
            color='gray.600'
            sx={{
              maxWidth: { xs: 'inherit', sm: '46ch' },
            }}
          >
            UI Foundations Kit provides{' '}
            <Box
              component='span'
              sx={{
                fontWeight: 600,
                color: 'primary.800',
              }}
            >
              100+ well-designed, React components
            </Box>{' '}
            that work seamlessly with MUI v5. Build your next SaaS app without
            worrying about layouts, designs, or CSS, and modify whatever you
            want.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  sm: 'row',
                },
                gap: 1,
              }}
            >
              <Button
                variant='contained'
                color='primary'
                size='large'
                component='a'
                href='https://mui.com/store/items/ui-foundations-kit-saas-admin-dashboard-template/'
              >
                Buy Template
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                component='a'
                href='https://demo.uifoundations.com/dashboard'
              >
                Preview Dashboard
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  sm: 'row',
                },
                gap: 1,
              }}
            >
              <Box
                sx={{
                  fontSize: 'xs',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: 'green.600',
                }}
              >
                <FiCheck />
                <Box component='span' color='gray.600'>
                  Trusted by 500+ teams
                </Box>
              </Box>
              <Box
                sx={{
                  fontSize: 'xs',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: 'green.600',
                }}
              >
                <FiCheck />
                <Box component='span' color='gray.600'>
                  100+ Carefully crafted UI components
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            borderRadius: 4,
            border: theme => `2px dashed ${theme.palette.divider}`,
            py: { xs: 3, sm: 4, md: 6 },
            backgroundColor: 'gray.50',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${'e5e7eb'}' fill-opacity='0.75' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></Box>
      </Box>
    </Container>
  );
}
