'use client'
import {
  Box,
  Button,
  Divider,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  Tabs,
  TextareaAutosize,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import React from 'react';
import { TbPlus } from 'react-icons/tb';
import { toast } from 'sonner';
import { DashboardHeader } from '~/components/DashboardHeader';
import { EventCard } from '~/components/EventCard';
import { FileUpload } from '~/components/FileUpload';
import { PageContainer } from '~/components/PageContainer';
import { SimpleDrawer } from '~/components/SimpleDrawer';
import { DUMMY_EVENTS } from '~/data/events';
import { useDisclosure } from '~/hooks/useDisclosure';

type TabPanelProps = {
  index: number;
  value: number;
  children?: React.ReactNode;
};

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function Events() {
  const [value, setValue] = React.useState(0);
  const newEventDisclosure = useDisclosure();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const pastEvents = DUMMY_EVENTS.filter((event) => {
    return dayjs(event.event_date).isBefore(new Date(), 'day');
  });
  const liveEvents = DUMMY_EVENTS.filter((event) => {
    return dayjs(event.event_date).isSame(new Date(), 'day');
  });
  const upcomingEvents = DUMMY_EVENTS.filter((event) => {
    return dayjs(event.event_date).isAfter(new Date(), 'day');
  });

  return (
    <PageContainer>
      <DashboardHeader
        title="Events"
        actions={
          <>
            <Button startIcon={<TbPlus />} variant="contained" onClick={newEventDisclosure.onOpen}>
              New Event
            </Button>
            <SimpleDrawer
              title="New Event"
              disclosure={newEventDisclosure}
              onSubmit={() => {
                newEventDisclosure.onClose();
                toast.promise(() => new Promise((resolve) => setTimeout(() => resolve({}), 2000)), {
                  loading: 'Creating event...',
                  success: 'Event created!',
                  error: 'Failed to create event',
                });
              }}
            >
              <Stack spacing={3}>
                <FormControl>
                  <FormLabel id="name-label">Event Name</FormLabel>
                  <FilledInput aria-labelledby="name-label" />
                </FormControl>
                <FormControl
                  sx={{
                    width: '100%',
                  }}
                >
                  <FormLabel id="description-label">Description</FormLabel>
                  <Box
                    component={TextareaAutosize}
                    aria-labelledby="description-label"
                    maxLength={450}
                    sx={{
                      // style like other mui inputs
                      minHeight: 50,
                      borderRadius: 1,
                      border: (theme) => `1px solid ${theme.palette.gray['300']}`,
                      boxShadow: 1,
                      padding: 1,
                      fontFamily: 'Inter',
                      // only allow vertical resize
                      resize: 'vertical',
                      '&:focus': {
                        outline: 'none',
                        borderColor: 'primary.400',
                      },
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel id="date-label">Date</FormLabel>
                  <DatePicker
                    aria-labelledby="date-label"
                    slotProps={{
                      field: {
                        // @ts-ignore
                        variant: 'filled',
                      },
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Image</FormLabel>
                  <FileUpload />
                </FormControl>
                <FormControl>
                  <FormLabel id="visibility-radio-buttons-label">Visibility</FormLabel>
                  <RadioGroup
                    aria-labelledby="visibility-radio-buttons-label"
                    defaultValue="private"
                    sx={{
                      gap: 1.5,
                      '.MuiFormControlLabel-root': {
                        '.MuiRadio-root': {
                          alignSelf: 'flex-start',
                        },
                        '.MuiTypography-root': {
                          marginTop: 0.75,
                        },
                      },
                    }}
                  >
                    <FormControlLabel
                      value="private"
                      control={<Radio />}
                      label={
                        <Stack>
                          <Box>Private</Box>
                          <Box
                            sx={{
                              color: 'gray.500',
                              fontSize: 'sm',
                            }}
                          >
                            Only visible to you
                          </Box>
                        </Stack>
                      }
                    />
                    <FormControlLabel
                      value="private_to_admin"
                      control={<Radio />}
                      label={
                        <Stack>
                          <Box>Private to Admins</Box>
                          <Box
                            sx={{
                              color: 'gray.500',
                              fontSize: 'sm',
                            }}
                          >
                            Only event admins can view and edit
                          </Box>
                        </Stack>
                      }
                    />
                    <FormControlLabel
                      value="public"
                      control={<Radio />}
                      label={
                        <Stack>
                          <Box>Public</Box>
                          <Box
                            sx={{
                              color: 'gray.500',
                              fontSize: 'sm',
                            }}
                          >
                            Visible to all users
                          </Box>
                        </Stack>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </SimpleDrawer>
          </>
        }
      />
      <Stack>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Live" {...a11yProps(1)} />
          <Tab label="Upcoming" {...a11yProps(2)} />
          <Tab label="Past" {...a11yProps(3)} />
        </Tabs>
        <Divider />
      </Stack>
      <CustomTabPanel value={value} index={0}>
        <EventGrid events={DUMMY_EVENTS} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <EventGrid events={liveEvents} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <EventGrid events={upcomingEvents} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <EventGrid events={pastEvents} />
      </CustomTabPanel>
    </PageContainer>
  );
}

function EventGrid({ events }: { events: typeof DUMMY_EVENTS }) {
  const sortedEvents = [...events].sort((a, b) => {
    return dayjs(b.event_date).isBefore(dayjs(a.event_date)) ? -1 : 1;
  });
  return (
    <Stack direction="column" spacing={2}>
      {sortedEvents.map((event) => (
        <EventCard key={event.event_name} event={event} />
      ))}
    </Stack>
  );
}
