'use client'
import * as React from 'react';
import { FilledInput, FormControl, FormLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
// simple input with hidden label
export default function Input() {
  return (
    <FormControl>
      <FormLabel sx={visuallyHidden}>Email</FormLabel>
      <FilledInput placeholder='email@domain.com' />
    </FormControl>
  );
}
