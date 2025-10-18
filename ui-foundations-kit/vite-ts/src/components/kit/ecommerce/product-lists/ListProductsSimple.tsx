import { Box, Grid, Link, Typography } from '@mui/material';
import { TbArrowRight } from 'react-icons/tb';

const products = [
  {
    id: 1,
    name: 'Leather-Bound Planner',
    color: 'Chestnut Brown',
    price: '$45',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1575467544611-470fa8053545',
    imageAlt: 'Leather-bound daily planner with gold embossing.',
  },
  {
    id: 2,
    name: 'Digital Smart Notebook',
    color: 'Slate Gray',
    price: '$89',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1529978567524-3dfb744b7769',
    imageAlt: 'Smart notebook with digital pen and app connectivity.',
  },
  {
    id: 3,
    name: 'Eco-Friendly Weekly Planner',
    color: 'Sage Green',
    price: '$28',
    href: '#',
    imageSrc:
      'https://plus.unsplash.com/premium_photo-1685134731588-783ca7471b65',
    imageAlt: 'Recycled paper weekly planner with plant-based ink.',
  },
  {
    id: 4,
    name: 'Luxury Fountain Pen Set',
    color: 'Rose Gold',
    price: '$120',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1633360821222-7e8df83639fb',
    imageAlt: 'Rose gold fountain pen set with ink cartridges.',
  },
] as const;

export default function ListProductsSimple() {
  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 2, py: 8 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant='h1'
            sx={{ fontWeight: 700, fontSize: '2xl', color: 'gray.900' }}
          >
            Best-selling products
          </Typography>
          <Link
            href='#'
            sx={{
              display: { xs: 'none', md: 'inline-flex' },
              alignItems: 'center',
              color: 'primary.600',
              textDecoration: 'none',
              '&:hover': { color: 'primary.700' },
            }}
          >
            See more
            <TbArrowRight style={{ marginLeft: 4 }} />
          </Link>
        </Box>

        <Grid container spacing={2} sx={{ mt: 3 }}>
          {products.map(product => (
            <Grid item key={product.id} xs={6} sm={6} md={3}>
              <Box
                sx={{ position: 'relative', '&:hover img': { opacity: 0.75 } }}
              >
                <Box
                  sx={{
                    height: { xs: 140, lg: 180, xl: 200 },
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: 1,
                    bgcolor: 'gray.200',
                  }}
                >
                  <img
                    alt={product.imageAlt}
                    src={product.imageSrc}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                </Box>
                <Typography sx={{ mt: 1, color: 'gray.700' }}>
                  <Link
                    href={product.href}
                    sx={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Box
                      component='span'
                      sx={{ position: 'absolute', inset: 0 }}
                    />
                    {product.name}
                  </Link>
                </Typography>
                <Typography sx={{ mt: 0.5, color: 'gray.600' }}>
                  {product.color}
                </Typography>
                <Typography
                  sx={{ mt: 0.5, fontWeight: 'medium', color: 'gray.900' }}
                >
                  {product.price}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4, display: { xs: 'block', md: 'none' } }}>
          <Link
            href='#'
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              color: 'blue.600',
              '&:hover': { color: 'blue.700' },
            }}
          >
            Shop the collection
            <TbArrowRight style={{ marginLeft: 4 }} />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
