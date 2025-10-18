import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Link,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from '@mui/material';
import * as React from 'react';
import { TbChevronRight, TbStarFilled, TbWorld } from 'react-icons/tb';
const planner = {
  name: 'Daily Organizer Pro',
  href: '#',
  price: '$45',
  description:
    'Stay organized and boost productivity with this comprehensive daily planner. Features ample space for tasks, appointments, and notes to keep your day structured and efficient.',
  imageSrc: 'https://images.unsplash.com/photo-1612367980327-7454a7276aa7',
  imageAlt: 'Open planner with daily schedule and to-do list visible.',
  breadcrumbs: [
    { id: 1, name: 'Office', href: '#' },
    { id: 2, name: 'Planners', href: '#' },
  ],
  sizes: [
    { name: 'A5', description: 'Compact size for on-the-go planning.' },
    { name: 'A4', description: 'Larger format for detailed daily planning.' },
  ],
};
const reviews = { average: 4, totalCount: 1624 };
export default function PlannerComponent() {
  const theme = useTheme();
  const [selectedSize, setSelectedSize] = React.useState(null);
  console.log(selectedSize);
  return (
    <Box>
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2, py: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ maxWidth: 480 }}>
              <nav aria-label="Breadcrumb">
                <Box
                  component="ul"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    listStyleType: 'none',
                    padding: 0,
                  }}
                >
                  {planner.breadcrumbs.map((breadcrumb, index) => (
                    <li key={breadcrumb.id}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: 14,
                        }}
                      >
                        <Link
                          href={breadcrumb.href}
                          sx={{
                            fontWeight: 500,
                            color: 'text.secondary',
                            textDecoration: 'none',
                            '&:hover': { color: 'text.primary' },
                          }}
                        >
                          {breadcrumb.name}
                        </Link>
                        {index !== planner.breadcrumbs.length - 1 && (
                          <Box component="span" sx={{ mx: 2, color: 'text.disabled' }}>
                            <TbChevronRight />
                          </Box>
                        )}
                      </Box>
                    </li>
                  ))}
                </Box>
              </nav>
              <Typography variant="h1" sx={{ mt: 2, fontWeight: 800, fontSize: '3xl' }}>
                {planner.name}
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ color: 'gray.800', fontSize: 'xl' }}>{planner.price}</Typography>
                <Box sx={{ ml: 2, pl: 2, borderLeft: 1, borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {[...Array(5)].map((_, index) => (
                      <TbStarFilled
                        key={index}
                        size={20}
                        color={
                          index < reviews.average
                            ? theme.palette.yellow['400']
                            : theme.palette.gray['200']
                        }
                      />
                    ))}
                    <Typography sx={{ ml: 1, color: 'gray.500', fontWeight: 500 }}>
                      {reviews.totalCount} reviews
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography sx={{ mt: 2, color: 'text.secondary' }}>{planner.description}</Typography>
            </Box>
            <Box component="form" sx={{ maxWidth: 480, py: 2 }}>
              <FormControl>
                <FormLabel
                  sx={{
                    fontSize: 'lg',
                  }}
                >
                  Size
                </FormLabel>
                <RadioGroup value={selectedSize} onChange={(e, value) => setSelectedSize(value)}>
                  <Grid container spacing={2}>
                    {planner.sizes.map((size) => (
                      <Grid item xs={6} key={size.name}>
                        <FormControlLabel
                          value={size.name}
                          control={
                            <Radio
                              checked={selectedSize === size.name}
                              sx={{
                                alignSelf: 'flex-start',
                              }}
                            />
                          }
                          label={
                            <Box
                              sx={{
                                py: 0.5,
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: 'lg',
                                  fontWeight: 500,
                                }}
                              >
                                {size.name}
                              </Typography>
                              <Typography sx={{ color: 'gray.600', fontSize: 'sm' }}>
                                {size.description}
                              </Typography>
                            </Box>
                          }
                          sx={{
                            border: 1,
                            borderColor: 'divider',
                            borderRadius: 1,
                            p: 1,
                            m: 0,
                            width: '100%',
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </RadioGroup>
              </FormControl>

              <Button
                size="large"
                variant="contained"
                fullWidth
                sx={{ mt: 3, color: 'white', py: 1.5 }}
              >
                Add to cart
              </Button>
              <Box
                sx={{
                  mt: 3,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'gray.500',
                }}
              >
                <TbWorld size={20} color="currentColor" />
                <Typography sx={{ ml: 1, color: 'gray.500' }}>
                  Ships Worldwide ⋅ 100% Satisfaction Guarantee
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                aspectRatio: { xs: 'unset', md: '1/1' },
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src={planner.imageSrc}
                alt={planner.imageAlt}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  maxHeight: { xs: 300, md: 'initial' },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
