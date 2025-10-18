import { Box, Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { TbArrowRight, TbCalendar, TbMapPin } from 'react-icons/tb';
import { match, P } from 'ts-pattern';
import { PercentageBarChart } from '~/components/PercentageBarChart';
import { formatAbbreviatedNumber } from '~/core/formatters';
import { DUMMY_EVENTS } from '~/data/events';

export function EventCard({ event }: { event: (typeof DUMMY_EVENTS)[0] }) {
  const capacityPercentage = event.count_signed_up / event.total_capacity;
  const dateMatch = dateMatcher(event.event_date);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        border: (theme) => `1px solid ${theme.palette.gray['200']}`,
        padding: 0.5,
        borderRadius: 1.5,
      }}
    >
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, width: '100%' }}>
        <CardMedia
          sx={{ aspectRatio: { xs: 16 / 9, sm: 4 / 3 }, minWidth: 200 }}
          image={event.image_url}
          title={`${event.event_name} conference hall`}
        />
        <Box
          sx={{
            padding: 1.5,
            width: '100%',
          }}
        >
          <CardContent
            sx={{
              paddingX: 1,
              paddingY: 1,
              paddingBottom: 2,
            }}
          >
            <Box
              sx={{
                fontSize: 'lg',
                fontWeight: 500,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              {event.event_name}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 'xs',
                  color: `${dateMatch.color}.700`,
                  backgroundColor: `${dateMatch.color}.50`,
                  paddingX: 1,
                  borderRadius: 1,
                  border: (theme: any) => `1px solid ${theme.palette[dateMatch.color][200]}`,
                }}
              >
                {dateMatch.label}
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: 'sm',
                color: 'gray.600',
              }}
            >
              {event.description}
            </Typography>
            <Stack
              sx={{
                mt: 1,
              }}
            >
              <IconDetail icon={<TbCalendar />}>
                {dayjs(event.event_date).format('MMM DD, YYYY')}
              </IconDetail>
              <IconDetail icon={<TbMapPin />}>{event.address}</IconDetail>
            </Stack>
          </CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 1,
              padding: 1,
              backgroundColor: 'gray.100',
              border: (theme) => `1px solid ${theme.palette.gray[200]}`,
              borderRadius: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                fontSize: 'xs',
                gap: 1,
              }}
            >
              <PercentageBarChart value={capacityPercentage} />
              <Box sx={{ color: 'gray.600' }}>
                {formatAbbreviatedNumber(capacityPercentage * 100)}% Capacity
              </Box>
            </Box>
            <Button size="small" color="secondary" endIcon={<TbArrowRight size={14} />}>
              Details
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

function IconDetail({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 0.5,
        alignItems: 'center',
        fontSize: 'xs',
        color: 'gray.500',
      }}
    >
      {icon}
      {children}
    </Box>
  );
}

function dateMatcher(date: string) {
  // get the upcoming, live, and past labels
  return match(date)
    .with(
      P.when((d) => dayjs(d).isSame(dayjs(), 'day')),
      () => ({
        label: 'Live',
        color: 'green',
      }),
    )
    .with(
      P.when((d) => dayjs(d).isAfter(dayjs(), 'day')),
      () => ({
        label: 'Upcoming',
        color: 'blue',
      }),
    )
    .with(
      P.when((d) => dayjs(d).isBefore(dayjs(), 'day')),
      () => ({
        label: 'Past',
        color: 'gray',
      }),
    )
    .otherwise(() => ({
      label: 'Unknown',
      color: 'gray',
    }));
}
