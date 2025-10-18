import { FormControl, FormLabel } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function ComboboxMulti() {
  return (
    <FormControl>
      <FormLabel>Event names</FormLabel>
      <Autocomplete
        multiple={true}
        disablePortal
        options={dummyEvents}
        renderInput={params => (
          <TextField
            variant='filled'
            sx={{
              '.MuiInputBase-root': {
                flexWrap: 'nowrap',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                paddingRight: 16,
              },
            }}
            {...params}
          />
        )}
        // @ts-ignore getOptionLabel gets confused by the `multiple` prop
        getOptionLabel={option => option.title}
        disableCloseOnSelect
        renderTags={value => value.map(opt => opt.title).join(', ')}
        sx={{
          width: 450,
        }}
      />
    </FormControl>
  );
}

const dummyEvents = [
  {
    id: 1,
    title: 'Tech Conference 2024',
    description: 'A conference about the latest in technology.',
    date: '2024-09-15',
    location: 'San Francisco, CA',
    attendees: ['Alice', 'Bob', 'Charlie'],
  },
  {
    id: 2,
    title: 'Music Festival',
    description: 'A fun-filled day with live music and food.',
    date: '2024-08-20',
    location: 'Los Angeles, CA',
    attendees: ['Dave', 'Eve', 'Frank'],
  },
  {
    id: 3,
    title: 'Art Exhibition',
    description: 'An exhibition showcasing modern art.',
    date: '2024-10-05',
    location: 'New York, NY',
    attendees: ['Grace', 'Heidi', 'Ivan'],
  },
  {
    id: 4,
    title: 'Startup Pitch Night',
    description: 'Pitch your startup idea to potential investors.',
    date: '2024-11-12',
    location: 'Austin, TX',
    attendees: ['Jack', 'Kathy', 'Leo'],
  },
  {
    id: 5,
    title: 'Cooking Workshop',
    description: 'Learn to cook delicious meals with a professional chef.',
    date: '2024-07-30',
    location: 'Chicago, IL',
    attendees: ['Mallory', 'Nate', 'Oscar'],
  },
] as const;
