'use client'
import { Box, FormControl, FormLabel } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function ComboboxCustom() {
  return (
    <FormControl>
      <FormLabel>Colors</FormLabel>
      <Autocomplete
        disablePortal
        multiple={true}
        defaultValue={[options[0]]}
        options={options}
        renderInput={params => <TextField variant='filled' {...params} />}
        renderTags={value => {
          return value.map(opt => (
            <span
              key={opt.value}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                marginRight: 8,
              }}
            >
              {opt.icon}
              <span>{opt.label}</span>
            </span>
          ));
        }}
        renderOption={(props, option) => (
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
            {...props}
          >
            {option.icon}
            <span>{option.label}</span>
          </li>
        )}
        sx={{
          width: 300,
        }}
      />
    </FormControl>
  );
}

function ColorDot({ color }: { color: string }) {
  return (
    <Box
      sx={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: color,
        display: 'inline-block',
        boxShadow: 3,
        border: color === 'white' ? '1px solid #ccc' : '1px solid #fff',
      }}
    />
  );
}

const options = [
  {
    label: 'Red',
    value: 'red',
    icon: <ColorDot color='red' />,
  },
  {
    label: 'Pink',
    value: 'pink',
    icon: <ColorDot color='pink' />,
  },
  {
    label: 'Orange',
    value: 'orange',
    icon: <ColorDot color='orange' />,
  },
  {
    label: 'Yellow',
    value: 'yellow',
    icon: <ColorDot color='yellow' />,
  },
  {
    label: 'Green',
    value: 'green',
    icon: <ColorDot color='green' />,
  },
  {
    label: 'Blue',
    value: 'blue',
    icon: <ColorDot color='blue' />,
  },
  {
    label: 'Indigo',
    value: 'indigo',
    icon: <ColorDot color='indigo' />,
  },
  {
    label: 'Purple',
    value: 'purple',
    icon: <ColorDot color='purple' />,
  },
  {
    label: 'Brown',
    value: 'brown',
    icon: <ColorDot color='brown' />,
  },
  {
    label: 'Black',
    value: 'black',
    icon: <ColorDot color='black' />,
  },
  {
    label: 'Gray',
    value: 'gray',
    icon: <ColorDot color='gray' />,
  },
  {
    label: 'White',
    value: 'white',
    icon: <ColorDot color='white' />,
  },
];
