import { DUMMY_EVENTS } from './events';
// Transform the data into a format suitable for pivot table
export const AGE_DISTRIBUTION = DUMMY_EVENTS.flatMap((event) => [
  {
    event_name: event.event_name,
    age_group: '1-18',
    count: Math.floor(Math.random() * 50) + 10, // Random number between 10-60
  },
  {
    event_name: event.event_name,
    age_group: '19-30',
    count: Math.floor(Math.random() * 100) + 50, // Random number between 50-150
  },
  {
    event_name: event.event_name,
    age_group: '31-45',
    count: Math.floor(Math.random() * 80) + 40, // Random number between 40-120
  },
  {
    event_name: event.event_name,
    age_group: '46-65',
    count: Math.floor(Math.random() * 60) + 30, // Random number between 30-90
  },
  {
    event_name: event.event_name,
    age_group: '65+',
    count: Math.floor(Math.random() * 20) + 5, // Random number between 5-25
  },
]);
