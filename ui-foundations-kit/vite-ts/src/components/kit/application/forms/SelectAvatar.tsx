import * as React from 'react';
import {
  Avatar,
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

export default function SelectAvatar() {
  const [value, setValue] = React.useState('kyle');
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };
  return (
    <Select
      value={value}
      onChange={handleChange}
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <MenuItem value='kyle'>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Avatar
            src='https://github.com/gillkyle.png?size=100'
            sx={{
              height: 24,
              width: 24,
            }}
          />
          Kyle Gill
        </Box>
      </MenuItem>
      <MenuItem value='petra'>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Avatar
            src='https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100'
            sx={{
              height: 24,
              width: 24,
            }}
          />
          Petra Haan
        </Box>
      </MenuItem>
      <MenuItem value='otto'>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Avatar
            src='https://images.unsplash.com/photo-1597009468351-d9a2749a84fc?w=100'
            sx={{
              height: 24,
              width: 24,
            }}
          />
          Otto von Ahn
        </Box>
      </MenuItem>
    </Select>
  );
}
