import { Box, Container, Grid, Typography } from '@mui/material';

interface Stat {
  id: number;
  name: string;
  value: string;
}

const stats: Stat[] = [
  { id: 1, name: 'Licenses sold', value: '250+' },
  { id: 2, name: 'Components', value: '320' },
  { id: 3, name: 'Average rating', value: '5.0 stars' },
  { id: 4, name: 'Starting price', value: '$39' },
];

export function Stats() {
  return (
    <Box sx={{ bgcolor: 'background.paper', py: 12, sm: { py: 16 } }}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: '100%', mx: 'auto' }}>
          <Box
            sx={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                color: 'gray.900',
                fontSize: { xs: '3xl', sm: '5xl' },
                isolation: 'isolate',
              }}
            >
              Best in-class tooling
            </Typography>
            <Typography
              sx={{
                mt: 2,
                fontSize: 'lg',
                color: 'gray.600',
                maxWidth: 'md',
                textAlign: 'center',
                textWrap: 'balance',
                lineHeight: 1.75,
              }}
            >
              We provide the best APIs and tools to help you create and scale your application.
              Thousands of developers trust us to deliver a high-quality design system.
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 8,
              p: 0.5,
              borderRadius: 4.5,
              boxShadow: 1,
              backgroundColor: 'background.paper',
              border: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Grid container spacing={1} sx={{ borderRadius: 4, overflow: 'hidden' }}>
              {stats.map((stat, index) => (
                <Grid item key={stat.id} xs={12} sm={6} lg={3}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: 'gray.50',
                      p: 4,
                      // round the left corners of the first index, and the right corners of the last index
                      borderRadius: {
                        xs:
                          index === 0
                            ? '24px 24px 0 0'
                            : index === stats.length - 1
                              ? '0 0 24px 24px'
                              : 0,
                        sm:
                          index === 0
                            ? '24px 0 0 0'
                            : index === 1
                              ? '0 24px 0 0'
                              : index === 2
                                ? '0 0 0 24px'
                                : '0 0 24px 0',
                        lg:
                          index === 0
                            ? '24px 0 0 24px'
                            : index === stats.length - 1
                              ? '0 24px 24px 0'
                              : 0,
                      },
                    }}
                  >
                    <Typography
                      component="dt"
                      sx={{
                        fontSize: 'md',
                        fontWeight: 500,
                        lineHeight: '1.5rem',
                        color: 'gray.500',
                      }}
                    >
                      {stat.name}
                    </Typography>
                    <Typography
                      component="dd"
                      sx={{
                        order: -1,
                        fontSize: '4xl',
                        fontWeight: 800,
                        color: 'gray.900',
                        letterSpacing: -1,
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
