import * as React from 'react';
import { FilledInput, FormControl, FormLabel } from '@mui/material';
// simple input with label
export default function Input() {
  return (
    <FormControl>
      <FormLabel>Email</FormLabel>
      <FilledInput placeholder='email@domain.com' />
    </FormControl>
  );
}
