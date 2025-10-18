import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { TbComponents, TbFingerprint, TbPalette, TbRefresh } from 'react-icons/tb';
const features = [
  {
    name: 'Comprehensive Component Library',
    description:
      'Access a wide range of pre-built, customizable components to rapidly construct your user interface.',
    icon: TbComponents,
  },
  {
    name: 'Accessibility-First Design',
    description:
      'Ensure your application is usable by everyone with our WCAG 2.1 compliant components and helpful accessibility tools.',
    icon: TbFingerprint,
  },
  {
    name: 'Flexible Theming System',
    description:
      'Easily customize the look and feel of your application with our powerful and intuitive theming capabilities.',
    icon: TbPalette,
  },
  {
    name: 'Auto-updating Components',
    description:
      'Stay current with the latest design trends and best practices through our regularly updated component library.',
    icon: TbRefresh,
  },
];
export default function FeatureGrid() {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ maxWidth: 'md', mx: 'auto', textAlign: { lg: 'center' } }}>
          <Typography
            sx={{
              color: 'primary.700',
              fontWeight: 600,
              fontSize: 'md',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Modern UI Kit
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
            Everything you need in one place
          </Typography>
          <Typography
            sx={{
              mt: 1.5,
              color: 'gray.600',
              fontSize: 'lg',
              lineHeight: 1.75,
            }}
          >
            Our comprehensive React UI kit provides you with all the tools and components you need
            to create stunning, responsive, and accessible web applications quickly and efficiently.
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 4,
            maxWidth: 'lg',
            mx: 'auto',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2,
          }}
        >
          {features.map((feature) => (
            <Grid item xs={12} sm={6} key={feature.name}>
              <Box
                sx={{
                  padding: 0.5,
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  borderRadius: 2.5,
                  boxShadow: 1,
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    pt: 7,
                    border: 'none',
                    backgroundColor: 'gray.50',
                    p: 3,
                    borderRadius: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 36,
                      height: 36,
                      borderRadius: 999,
                      color: 'background.default',
                      bgcolor: 'primary.700',
                    }}
                  >
                    <feature.icon size={24} color="currentColor" />
                  </Box>
                  <Typography sx={{ color: 'gray.900', fontWeight: 600, fontSize: 'md' }}>
                    {feature.name}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 0.5,
                      color: 'gray.600',
                      fontSize: 'md',
                      lineHeight: 1.5,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
