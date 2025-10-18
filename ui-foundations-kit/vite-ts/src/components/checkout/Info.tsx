import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const products = [
  {
    name: 'Professional plan',
    desc: 'Monthly subscription',
    price: '$15.00',
  },
  {
    name: 'Dedicated support',
    desc: 'Included in the Professional plan',
    price: 'Free',
  },
  {
    name: 'Hardware',
    desc: 'Devices needed for development',
    price: '$69.99',
  },
  {
    name: 'Landing page template',
    desc: 'License',
    price: '$49.99',
  },
];

interface InfoProps {
  totalPrice: string;
}

export default function Info({ totalPrice }: InfoProps) {
  return (
    <React.Fragment>
      <Typography sx={{ color: 'gray.600' }}>Total</Typography>
      <Typography
        sx={{
          lineHeight: 1,
          fontWeight: 600,
          fontSize: '48px',
        }}
      >
        {totalPrice}
      </Typography>
      <List>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText sx={{ mr: 2 }} primary={product.name} secondary={product.desc} />
            <Typography sx={{ fontWeight: 500 }}>{product.price}</Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}
