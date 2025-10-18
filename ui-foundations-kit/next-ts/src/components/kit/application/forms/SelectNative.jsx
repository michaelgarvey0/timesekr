import * as React from 'react';
import { Select } from '@mui/material';
export default function SelectNative() {
  return (
    <Select native>
      <option value="kyle">Kyle Gill</option>
      <option value="petra">Petra Haan</option>
      <option value="otto">Otto von Ahn</option>
    </Select>
  );
}
