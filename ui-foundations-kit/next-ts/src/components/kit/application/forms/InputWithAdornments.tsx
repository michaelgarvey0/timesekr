'use client'
import * as React from 'react';
import { FilledInput, FormControl, FormLabel } from '@mui/material';
// simple input with start and end adornments
export default function Input() {
  return (
    <FormControl>
      <FormLabel>Price</FormLabel>
      <FilledInput startAdornment='$' endAdornment='USD' placeholder='0' />
    </FormControl>
  );
}
