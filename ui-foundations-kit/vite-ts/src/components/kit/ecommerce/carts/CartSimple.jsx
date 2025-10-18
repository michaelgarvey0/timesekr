import { Box, Button, IconButton, List, ListItem, Stack, Typography } from '@mui/material';
import { TbArrowRight, TbCheck, TbClock, TbX } from 'react-icons/tb';
const products = [
  {
    id: 1,
    quantity: 1,
    name: 'Elegant Leather Planner',
    href: '#',
    price: 44.99,
    color: 'Brown',
    inStock: true,
    imageSrc: 'https://images.unsplash.com/photo-1575467544611-470fa8053545',
    imageAlt: 'Brown leather planner with gold accents.',
    size: 'A4',
  },
  {
    id: 2,
    quantity: 2,
    name: 'Fountain Pen Set',
    href: '#',
    price: 119.99,
    color: 'Silver',
    inStock: false,
    leadTime: '2-3 weeks',
    imageSrc: 'https://images.unsplash.com/photo-1633360821222-7e8df83639fb',
    imageAlt: 'Set of three silver fountain pens in a velvet case.',
    size: 'Standard',
  },
];
export default function ShoppingCart() {
  return (
    <Box sx={{ bgcolor: 'background.paper', display: 'flex', width: '100%' }}>
      <Box
        sx={{
          flex: 1,
          width: '100%',
          maxWidth: { xs: 350, sm: 480, md: 720, lg: 960 },
          mx: 'auto',
          px: 2,
          py: 8,
          lg: { px: 0 },
        }}
      >
        <Typography
          sx={{
            textAlign: 'left',
            fontSize: 24,
            fontWeight: 'bold',
            color: 'gray.900',
          }}
        >
          Shopping Cart
        </Typography>
        <Box component="form" sx={{ mt: 6 }}>
          <Box component="section" aria-labelledby="cart-heading">
            <Typography id="cart-heading" sx={{ display: 'none' }}>
              Items in your shopping cart
            </Typography>

            <List
              sx={{
                borderTop: 1,
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              {products.map((product) => (
                <ListItem
                  key={product.id}
                  sx={{
                    py: 3,
                    px: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    flexDirection: {
                      xs: 'column',
                      md: 'row',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    sx={{
                      width: { xs: '100%', md: 96 },
                      height: 96,
                      mr: 2,
                      borderRadius: 1,
                      objectFit: 'cover',
                    }}
                  />
                  <Stack spacing={1} sx={{ flex: 1, width: '100%' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography
                          component="a"
                          href={product.href}
                          sx={{
                            fontWeight: 500,
                            textDecoration: 'none',
                            color: 'gray.700',
                            '&:hover': { color: 'gray.800' },
                          }}
                        >
                          {product.name}
                        </Typography>
                        <Typography sx={{ fontSize: 14, color: 'gray.500' }}>
                          {product.color}
                        </Typography>
                        {product.size && (
                          <Typography sx={{ fontSize: 14, color: 'gray.500' }}>
                            {product.size}
                          </Typography>
                        )}
                      </Box>
                      <Stack
                        sx={{
                          alignItems: 'flex-end',
                          gap: 1,
                        }}
                      >
                        <Typography sx={{ fontWeight: 500, color: 'gray.900' }}>
                          ${product.price * product.quantity}
                        </Typography>
                        {product.quantity > 1 && (
                          <Typography sx={{ color: 'gray.600' }}>
                            x{product.quantity} ({product.price} each)
                          </Typography>
                        )}
                      </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1} alignItems="center">
                        {product.inStock ? (
                          <TbCheck style={{ color: 'green' }} />
                        ) : (
                          <TbClock style={{ color: 'gray' }} />
                        )}
                        <Typography sx={{ fontSize: 14, color: 'gray.700' }}>
                          {product.inStock ? 'Available now' : `Ships in ${product.leadTime}`}
                        </Typography>
                      </Stack>
                      <IconButton
                        sx={{
                          backgroundColor: 'gray.50',
                        }}
                      >
                        <TbX />
                      </IconButton>
                    </Stack>
                  </Stack>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box component="section" aria-labelledby="summary-heading" sx={{ mt: 5 }}>
            <Typography id="summary-heading" sx={{ display: 'none' }}>
              Order summary
            </Typography>

            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ fontWeight: 'medium', color: 'gray.900' }}>
                  Estimated total
                </Typography>
                <Typography sx={{ fontWeight: 'medium', color: 'gray.900' }}>
                  $
                  {products
                    .reduce((acc, product) => acc + product.price * product.quantity, 0)
                    .toFixed(2)}
                </Typography>
              </Stack>
              <Typography sx={{ fontSize: 14, color: 'gray.500' }}>
                Shipping and taxes be calculated at checkout.
              </Typography>
            </Stack>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 5,
                py: 1.5,
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' },
              }}
            >
              Checkout
            </Button>
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Box
                component="a"
                href="#"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  textAlign: 'center',
                  color: 'gray.500',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: 'gray.400',
                  },
                }}
              >
                or continue shopping
                <TbArrowRight />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
