'use client'
import { DateRange } from '@mui/lab';
import { Box, Button, Popover, Stack } from '@mui/material';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';
import * as React from 'react';
import { TbCalendar, TbChevronDown } from 'react-icons/tb';
import { useDisclosure } from '~/hooks/useDisclosure';

export function DateRangerChanger() {
  const dateDisclosure = useDisclosure({
    provideAnchorEl: true,
  });
  const [value, setValue] = React.useState<DateRange<Dayjs>>([
    dayjs().subtract(4, 'week'),
    dayjs(),
  ]);
  return (
    <>
      <Button
        startIcon={<TbCalendar />}
        endIcon={
          <TbChevronDown
            size={14}
            style={{
              transform: dateDisclosure.isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease-in-out',
            }}
          />
        }
        onClick={dateDisclosure.onOpen}
        variant="outlined"
        color="secondary"
      >
        {value[0] ? value[0].format('MMM D, YYYY') : '---'}—
        {value[1] ? value[1].format('MMM D, YYYY') : '---'}
      </Button>
      <Popover
        open={dateDisclosure.isOpen}
        anchorEl={dateDisclosure.anchorEl}
        onClose={dateDisclosure.onClose}
        sx={{
          '.MuiPaper-root': {
            boxShadow: 2,
            display: 'flex',
            flexDirection: 'row',
          },
        }}
      >
        <DateRangeCalendar value={value} onChange={(newValue) => setValue(newValue)} />
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            padding: 1,
            borderLeft: (theme) => `1px solid ${theme.palette.gray['200']}`,
          }}
        >
          <Stack>
            <Button
              color="secondary"
              onClick={() => {
                dateDisclosure.onClose();
                setValue([dayjs().subtract(1, 'day'), dayjs().subtract(1, 'day')]);
              }}
            >
              Yesterday
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                dateDisclosure.onClose();
                setValue([dayjs().subtract(7, 'day'), dayjs()]);
              }}
            >
              Last 7 days
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                dateDisclosure.onClose();
                setValue([dayjs().subtract(30, 'day'), dayjs()]);
              }}
            >
              Last 30 days
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                dateDisclosure.onClose();
                setValue([dayjs().subtract(3, 'month'), dayjs()]);
              }}
            >
              Last 3 months
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                dateDisclosure.onClose();
                setValue([dayjs().startOf('year'), dayjs()]);
              }}
            >
              Year to date
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                dateDisclosure.onClose();
                setValue([dayjs().subtract(1, 'year'), dayjs()]);
              }}
            >
              Last year
            </Button>
          </Stack>
        </Box>
      </Popover>
    </>
  );
}
