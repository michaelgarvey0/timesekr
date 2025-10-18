import * as React from 'react';
import {
  FilledInput,
  FormControl,
  FormHelperText,
  FormLabel,
} from '@mui/material';
// simple input with help text
export default function Input() {
  return (
    <FormControl>
      <FormLabel>What is your favorite dish?</FormLabel>
      <FilledInput />
      <FormHelperText>
        Make sure your answer is vague enough you will forget it in a few months{' '}
      </FormHelperText>
    </FormControl>
  );
}
