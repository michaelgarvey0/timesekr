import * as React from 'react';
import { FilledInput, FormControl, FormLabel, IconButton } from '@mui/material';
import { TbEye, TbEyeOff } from 'react-icons/tb';
// password input with toggle visibility
export default function Input() {
  const [passwordVisibility, setPasswordVisibility] = React.useState(false);
  return (
    <FormControl>
      <FormLabel>Password</FormLabel>
      <FilledInput
        name="password"
        type={passwordVisibility ? 'password' : 'text'}
        endAdornment={
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => setPasswordVisibility(!passwordVisibility)}
            edge="end"
          >
            {passwordVisibility ? <TbEye /> : <TbEyeOff />}
          </IconButton>
        }
        autoComplete="password"
      />
    </FormControl>
  );
}
