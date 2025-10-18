import { Box, Button, Container, Typography } from '@mui/material';
import { FiCheck } from 'react-icons/fi';
import { FAQ } from '../components/FAQ';
import { FeatureDefault } from '../components/FeatureDefault';
import { FeatureModern } from '../components/FeatureModern';
import { FeatureResponsive } from '../components/FeatureResponsive';
import { FeatureThemeable } from '../components/FeatureThemeable';
import { HomepageCode } from '../components/HomepageCode';
import { Features } from '../components/landing-page/components/Features';
import { WebsiteFeatures } from '../components/WebsiteFeatures';
import { DefaultLayout } from '../components/WebsiteLayout';
import { FrameworkLink } from '../framework/FrameworkLink';
export function Homepage() {
  return (
    <DefaultLayout>
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
              variant="h1"
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
                component="span"
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
              color="gray.600"
              sx={{
                maxWidth: { xs: 'inherit', sm: '46ch' },
              }}
            >
              UI Foundations Kit provides{' '}
              <Box
                component="span"
                sx={{
                  fontWeight: 600,
                  color: 'primary.800',
                }}
              >
                100+ well-designed, React components
              </Box>{' '}
              that work seamlessly with MUI v5. Build your next SaaS app without worrying about
              layouts, designs, or CSS, and modify whatever you want.
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
                  variant="contained"
                  color="primary"
                  size="large"
                  component="a"
                  target="_blank"
                  href="https://mui.com/store/items/ui-foundations-kit-saas-admin-dashboard-template/"
                >
                  Buy Template
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  component={FrameworkLink}
                  to="/dashboard/home"
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
                  <Box component="span" color="gray.600">
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
                  <Box component="span" color="gray.600">
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
              py: { xs: 3, sm: 4, md: 6 },
            }}
          >
            <HomepageCode />
          </Box>
        </Box>
      </Container>
      <Container>
        <WebsiteFeatures
          features={[
            {
              icon: <FeatureDefault />,
              title: 'Beautiful default theme',
              description:
                'Powered by harmonic scales and high-level utility abstractions like Tailwind and Styled System.',
            },
            {
              icon: <FeatureResponsive />,
              title: 'Fully responsive',
              description:
                'Supports all shapes and mobile sizes ergonomically built with the responsive object syntax.',
            },
            {
              icon: <FeatureThemeable />,
              title: 'Completely themeable',
              description:
                "TypeScript defined theme tokens, variants, and scales, or vanilla JavaScript if that's your thing.",
            },
            {
              icon: <FeatureModern />,
              title: 'Modern techniques',
              description:
                'Grid and flex native, using modern, supported syntax & properties like gap + layout components.',
            },
          ]}
        />
      </Container>
      <Container
        sx={{
          py: 10,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
            mb: 4,
          }}
        >
          <Typography
            sx={{
              color: 'primary.700',
              fontWeight: 600,
              fontSize: 'md',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Full featured components
          </Typography>
          <Typography
            sx={{
              mt: 0.5,
              color: 'gray.900',
              fontWeight: 700,
              fontSize: { xs: '3xl', sm: '5xl' },
              lineHeight: 1.2,
              textWrap: 'balance',
              isolation: 'isolate',
            }}
          >
            Hundreds of pre-built Kit Components
          </Typography>
          <Typography sx={{ mt: 1.5, color: 'gray.600', fontSize: 'lg', lineHeight: 1.75 }}>
            From autocompletes to entire data grids, we have you covered. Don't settle for just the
            common use cases.
          </Typography>
        </Box>
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <a href="https://kit.uifoundations.com/components" target="_blank">
            <Box
              sx={{
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                inset: 0,
                transition: 'all 0.3s',
                '&:hover': {
                  cursor: 'pointer',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  filter: 'brightness(0.8)',
                },
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    inset: -6,
                    borderRadius: 999,
                    backgroundColor: 'rgba(21, 150, 255, 0.3)',
                    backdropFilter: 'blur(4px)',
                  }}
                />
                <Box
                  sx={{
                    backgroundColor: 'gray.700',
                    borderRadius: 999,
                    paddingX: 2,
                    paddingY: 1,
                    color: 'background.paper',
                    fontSize: 'sm',
                    boxShadow: 4,
                    zIndex: 1,
                  }}
                >
                  Preview Kit Components
                </Box>
              </Box>
            </Box>
          </a>
          <Box
            id="image"
            sx={(theme) => ({
              mb: { xs: 2, sm: 6 },
              alignSelf: 'center',
              height: { xs: 200, sm: 700 },
              width: '100%',
              backgroundImage: 'url("/component-gallery.png")',
              backgroundSize: 'cover',
              borderRadius: '10px',
              outline: '1px solid',
              outlineColor: 'gray.200',
              boxShadow: 2,
            })}
          />
        </Box>
        <Box
          sx={{
            px: { xs: 0, sm: 2 },
          }}
        >
          <Features
            customSx={{
              borderTop: 'none',
              bgcolor: 'none',
              '.MuiContainer-root': {
                maxWidth: 'unset',
                px: 0,
                '& .features-grid': {
                  maxWidth: 'unset',
                },
              },
            }}
          />
          <FAQ />
        </Box>
      </Container>
    </DefaultLayout>
  );
}
