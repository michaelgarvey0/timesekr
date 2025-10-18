import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { TbCircleCheck } from 'react-icons/tb';

const frequencies = {
  monthly: { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  annually: { value: 'annually', label: 'Annually', priceSuffix: '/year' },
};
const frequenciesList = Object.values(frequencies);

const tiers = [
  {
    name: 'Basic Planner',
    id: 'tier-basic',
    href: '#',
    price: { monthly: '$29', annually: '$275' },
    description: 'Essential tools for small events and beginners.',
    features: [
      'Up to 5 events per month',
      'Basic event templates',
      'Guest list management (up to 100 guests)',
      'Email invitations',
      '24-hour support response time',
    ],
    mostPopular: false,
  },
  {
    name: 'Pro Organizer',
    id: 'tier-pro',
    href: '#',
    price: { monthly: '$79', annually: '$685' },
    description: 'Advanced features for growing event planning businesses.',
    features: [
      'Unlimited events',
      'Custom event templates',
      'Guest list management (up to 500 guests)',
      'Email and SMS invitations',
      'Basic vendor management',
      'Budget tracking',
      '12-hour support response time',
    ],
    mostPopular: true,
  },
  {
    name: 'Enterprise Events',
    id: 'tier-enterprise',
    href: '#',
    price: { monthly: '$199', annually: '$1805' },
    description: 'Comprehensive solution for large-scale event management.',
    features: [
      'Unlimited events',
      'Advanced customization options',
      'Unlimited guest list management',
      'Multi-channel invitations and RSVP tracking',
      'Advanced vendor management',
      'Detailed budget and expense tracking',
      'Custom reporting and analytics',
      'Dedicated account manager',
      '1-hour priority support response time',
    ],
    mostPopular: false,
  },
];

export function Pricing() {
  const [frequency, setFrequency] = useState<'annually' | 'monthly'>('monthly');
  const activeFrequency = frequencies[frequency];

  return (
    <Box sx={{ bgcolor: 'background.default', py: 8, sm: { py: 12 }, isolation: 'isolate' }}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 'md', mx: 'auto', textAlign: 'center' }}>
          <Typography
            sx={{
              color: 'primary.700',
              fontWeight: 600,
              fontSize: 'md',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Scales with you
          </Typography>
          <Typography
            sx={{
              mt: 0.5,
              color: 'gray.900',
              fontWeight: 700,
              fontSize: { xs: '3xl', sm: '5xl' },
            }}
          >
            Pricing plans for teams of&nbsp;all&nbsp;sizes
          </Typography>
        </Box>
        <Typography
          sx={{
            mt: 2,
            mx: 'auto',
            fontSize: 'lg',
            color: 'gray.600',
            maxWidth: 'md',
            textAlign: 'center',
            textWrap: 'balance',
            lineHeight: 1.75,
          }}
        >
          Choose an affordable plan that's packed with the best features for engaging your audience,
          creating customer loyalty, and driving sales.
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <ToggleButtonGroup
            value={activeFrequency.value}
            exclusive
            onChange={(_, newFrequency) => newFrequency && setFrequency(newFrequency)}
            sx={{
              padding: 0.5,
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'divider',
              borderRadius: '9999px',
              '& .MuiToggleButtonGroup-grouped': {
                border: 0,
                '&:not(:first-of-type)': {
                  borderRadius: '9999px',
                },
                '&:first-of-type': {
                  borderRadius: '9999px',
                },
              },
            }}
          >
            {frequenciesList.map((option) => (
              <ToggleButton
                key={option.value}
                value={option.value}
                sx={{
                  px: 1.25,
                  py: 0.5,
                  color: 'gray.500',
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'common.white',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  },
                }}
              >
                {option.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
        <Grid container spacing={2} sx={{ mt: 2.5, maxWidth: 'lg', mx: 'auto' }}>
          {tiers.map((tier) => (
            <Grid item xs={12} md={4} key={tier.id}>
              <Paper
                elevation={1}
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  p: 4,
                  border: 1,
                  borderColor: tier.mostPopular ? 'primary.main' : 'divider',
                  ...(tier.mostPopular && { borderWidth: 2 }),
                }}
              >
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Typography
                    sx={{
                      color: tier.mostPopular ? 'primary.700' : 'gray.900',
                      fontWeight: 600,
                      fontSize: 'xl',
                    }}
                  >
                    {tier.name}
                  </Typography>
                  {tier.mostPopular && (
                    <Typography
                      sx={{
                        bgcolor: 'primary.50',
                        color: 'primary.800',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '9999px',
                        fontSize: 'sm',
                        fontWeight: 600,
                      }}
                    >
                      Most popular
                    </Typography>
                  )}
                </Box>
                <Typography
                  sx={{ mt: 1, fontSize: 'sm', lineHeight: 1.5, color: 'gray.600', minHeight: 50 }}
                >
                  {tier.description}
                </Typography>
                <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'baseline', gap: 0.25 }}>
                  <Typography sx={{ fontSize: '2rem', fontWeight: 700, color: 'gray.900' }}>
                    {/* @ts-ignore */}
                    {tier.price[activeFrequency.value]}
                  </Typography>
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'gray.600' }}>
                    {activeFrequency.priceSuffix}
                  </Typography>
                </Box>
                <Button
                  href={tier.href}
                  variant={tier.mostPopular ? 'contained' : 'outlined'}
                  fullWidth
                  sx={{ mt: 1.5 }}
                >
                  Choose plan
                </Button>
                <Box component="ul" sx={{ mt: 2, listStyle: 'none', p: 0 }}>
                  {tier.features.map((feature) => (
                    <Box
                      component="li"
                      key={feature}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.75,
                        mt: 0.75,
                        color: 'gray.600',
                        svg: {
                          color: 'primary.600',
                        },
                      }}
                    >
                      <TbCircleCheck style={{ flexShrink: 0 }} />
                      <Typography sx={{ fontSize: '0.875rem' }}>{feature}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
