import * as React from 'react';
import { FilledInput, FormControl, FormLabel } from '@mui/material';
// simple input in pill shape
export default function Input() {
  return (
    <FormControl>
      <FormLabel>Email</FormLabel>
      <FilledInput
        placeholder='email@domain.com'
        sx={{
          mx: -2,
          borderRadius: 999,
        }}
      />
    </FormControl>
  );
}
