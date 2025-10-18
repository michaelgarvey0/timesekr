'use client'
import { Divider } from '@mui/material';

export function MenuDivider() {
  return (
    <Divider
      sx={{
        '&&': {
          my: 0.25,
          mx: 0.5,
        },
      }}
    />
  );
}
