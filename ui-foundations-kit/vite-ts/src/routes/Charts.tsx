import { Box } from '@mui/material';
import { ChartCard } from '~/components/ChartCard';
import { DashboardHeader } from '~/components/DashboardHeader';
import { LabeledDivider } from '~/components/LabeledDivider';
import { PageContainer } from '~/components/PageContainer';
import { SimpleBarChart } from '~/components/SimpleBarChart';
import { SimpleLineChart } from '~/components/SimpleLineChart';
import { SimplePieChart } from '~/components/SimplePieChart';
import { SimpleScatterChart } from '~/components/SimpleScatterChart';
import { formatAbbreviatedNumber, formatShortDate } from '~/core/formatters';
import { DUMMY_EVENTS } from '~/data/events';
import { DUMMY_TIMESERIES } from '~/data/timeseries';

const COMMON_X_CONFIG = {
  id: 'categories',
  dataKey: 'date',
  scaleType: 'band',
} as const;

export function Charts() {
  return (
    <PageContainer customSx={{ gap: 4 }}>
      <DashboardHeader
        title="Charts"
        subtitle="Beautiful charts built with @mui/x-charts that can be incorporated into any dashboard"
      />
      <ChartGrid>
        <ChartCard title="Stacked Area Chart" description="Revenue over time from ticket sales">
          <SimpleLineChart
            dataset={DUMMY_TIMESERIES}
            xAxis={[
              {
                ...COMMON_X_CONFIG,
                valueFormatter: formatShortDate,
                tickNumber: 2,
                tickLabelInterval(value: any, index: number) {
                  // only show the first and last ticks
                  return index === 0 || index === DUMMY_TIMESERIES.length - 1;
                },
              },
            ]}
            series={[
              {
                dataKey: 'value',
                valueFormatter: (value) => (value ? `$${formatAbbreviatedNumber(value)}` : ''),
                stack: 'total',
                label: 'Pre-sale Revenue',
                area: true,
              },
              {
                dataKey: 'secondaryValue',
                valueFormatter: (value) => (value ? `$${formatAbbreviatedNumber(value)}` : ''),
                stack: 'total',
                label: 'Day-of Revenue',
                area: true,
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Category Pie Chart" description="Sales by event">
          <SimplePieChart
            dataset={DUMMY_TIMESERIES}
            slotProps={{
              legend: { hidden: true },
            }}
            series={[
              {
                data: [
                  { label: 'InnovateTech', value: 1200 },
                  { label: 'Visionary Symposium', value: 880 },
                  { label: 'Global Trends Conference', value: 175 },
                  { label: 'Code Conf', value: 28 },
                ],
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Stacked Horizontal Bar Chart" description="Weekly ticket sales">
          <SimpleBarChart
            layout="horizontal"
            yAxis={[
              {
                ...COMMON_X_CONFIG,
                data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              },
            ]}
            series={[
              {
                data: [33, 64, 56, 71, 99, 141, 32],
                label: 'Pre-sale Tickets',
                stack: 'total',
              },
              {
                data: [14, 58, 56, 61, 59, 41, 12],
                label: 'Day-of Tickets',
                stack: 'total',
              },
            ]}
          />
        </ChartCard>
      </ChartGrid>
      <LabeledDivider>Line Charts</LabeledDivider>
      <ChartGrid>
        <ChartCard title="Linear Line Chart" description="Ticket sales over time">
          <SimpleLineChart
            dataset={MINI_TIMESERIES}
            xAxis={[
              {
                ...COMMON_X_CONFIG,
                valueFormatter: formatShortDate,
                tickNumber: 2,
                tickLabelInterval(value: any, index: number) {
                  // only show the first and last ticks
                  return index === 0 || index === MINI_TIMESERIES.length - 1;
                },
              },
            ]}
            series={[
              {
                dataKey: 'value',
                valueFormatter: (value) => (value ? `$${formatAbbreviatedNumber(value)}` : ''),
                curve: 'linear',
                label: 'Pre-sale Revenue',
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Step Line Chart" description="Ticket price over time">
          <SimpleLineChart
            dataset={MINI_TIMESERIES}
            xAxis={[
              {
                ...COMMON_X_CONFIG,
                valueFormatter: formatShortDate,
                tickNumber: 2,
                tickLabelInterval(value: any, index: number) {
                  // only show the first and last ticks
                  return index === 0 || index === MINI_TIMESERIES.length - 1;
                },
              },
            ]}
            series={[
              {
                dataKey: 'value',
                valueFormatter: (value) => (value ? `$${formatAbbreviatedNumber(value)}` : ''),
                stack: 'total',
                label: 'Ticket price',
                curve: 'stepBefore',
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Curved Line Chart" description="Ticket sales over time">
          <SimpleLineChart
            dataset={MINI_TIMESERIES}
            xAxis={[
              {
                ...COMMON_X_CONFIG,
                valueFormatter: formatShortDate,
                tickNumber: 2,
                tickLabelInterval(value: any, index: number) {
                  // only show the first and last ticks
                  return index === 0 || index === MINI_TIMESERIES.length - 1;
                },
              },
            ]}
            series={[
              {
                dataKey: 'value',
                valueFormatter: (value) => (value ? `$${formatAbbreviatedNumber(value)}` : ''),
                label: 'Pre-sale Revenue',
                curve: 'catmullRom',
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Dotted Line Chart" description="Ticket sales over time">
          <SimpleLineChart
            dataset={MINI_TIMESERIES}
            xAxis={[
              {
                ...COMMON_X_CONFIG,
                valueFormatter: formatShortDate,
                tickNumber: 2,
                tickLabelInterval(value: any, index: number) {
                  // only show the first and last ticks
                  return index === 0 || index === MINI_TIMESERIES.length - 1;
                },
              },
            ]}
            series={[
              {
                dataKey: 'value',
                valueFormatter: (value) => (value ? `$${formatAbbreviatedNumber(value)}` : ''),
                curve: 'linear',
                label: 'Pre-sale Revenue',
                showMark: true,
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Line Chart + Legend" description="Ticket sales over time">
          <SimpleLineChart
            dataset={MINI_TIMESERIES}
            xAxis={[
              {
                ...COMMON_X_CONFIG,
                valueFormatter: formatShortDate,
                tickNumber: 2,
                tickLabelInterval(value: any, index: number) {
                  // only show the first and last ticks
                  return index === 0 || index === MINI_TIMESERIES.length - 1;
                },
              },
            ]}
            margin={{ top: 40 }}
            slotProps={{
              legend: {
                hidden: false,
                position: { vertical: 'top', horizontal: 'middle' },
                padding: 0,
              },
            }}
            series={[
              {
                dataKey: 'value',
                valueFormatter: (v, i) => `${v}${i.dataIndex > 3 ? ' (estimated)' : ''}`,
                curve: 'linear',
                label: 'Pre-sale Revenue',
                showMark: true,
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Multi Line Chart" description="Ticket sales over time">
          <SimpleLineChart
            dataset={DUMMY_TIMESERIES.slice(0, 7)}
            xAxis={[
              {
                ...COMMON_X_CONFIG,
                valueFormatter: formatShortDate,
                tickNumber: 2,
                tickLabelInterval(value: any, index: number) {
                  // only show the first and last ticks
                  return index === 0 || index === DUMMY_TIMESERIES.length - 1;
                },
              },
            ]}
            series={[
              {
                dataKey: 'value',
                valueFormatter: (value) => (value ? `$${formatAbbreviatedNumber(value)}` : ''),
                stack: 'total',
                label: 'Pre-sale Revenue',
              },
              {
                dataKey: 'secondaryValue',
                valueFormatter: (value) => (value ? `$${formatAbbreviatedNumber(value)}` : ''),
                stack: 'total',
                label: 'Day-of Revenue',
              },
            ]}
          />
        </ChartCard>
      </ChartGrid>
      <LabeledDivider>Bar Charts</LabeledDivider>
      <ChartGrid>
        <ChartCard title="Simple Bar Chart" description="Pres-sale ticket sales">
          <SimpleBarChart
            xAxis={[
              {
                ...COMMON_X_CONFIG,
                data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              },
            ]}
            series={[
              {
                data: [33, 64, 56, 71, 99, 141, 32],
                label: 'Pre-sale Tickets',
                stack: 'total',
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Simple Horizontal Bar Chart" description="Day-of ticket sales">
          <SimpleBarChart
            layout="horizontal"
            yAxis={[
              {
                ...COMMON_X_CONFIG,
                data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              },
            ]}
            series={[
              {
                data: [14, 58, 56, 61, 59, 41, 12],
                label: 'Day-of Tickets',
                stack: 'total',
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Multi Bar Chart" description="Pre-sale and day-of ticket sales">
          <SimpleBarChart
            xAxis={[
              {
                ...COMMON_X_CONFIG,
                data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              },
            ]}
            series={[
              {
                data: [33, 64, 56, 71, 99, 141, 32],
                label: 'Pre-sale Tickets',
              },
              {
                data: [14, 58, 56, 61, 59, 41, 12],
                label: 'Day-of Tickets',
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Stacked Bar Chart" description="Weekly ticket sales">
          <SimpleBarChart
            xAxis={[
              {
                ...COMMON_X_CONFIG,
                data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              },
            ]}
            series={[
              {
                data: [33, 64, 56, 71, 99, 141, 32],
                label: 'Pre-sale Tickets',
                stack: 'total',
              },
              {
                data: [14, 58, 56, 61, 59, 41, 12],
                label: 'Day-of Tickets',
                stack: 'total',
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Stacked Horizontal Bar Chart" description="Weekly ticket sales">
          <SimpleBarChart
            layout="horizontal"
            yAxis={[
              {
                ...COMMON_X_CONFIG,
                data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              },
            ]}
            series={[
              {
                data: [33, 64, 56, 71, 99, 141, 32],
                label: 'Pre-sale Tickets',
                stack: 'total',
              },
              {
                data: [14, 58, 56, 61, 59, 41, 12],
                label: 'Day-of Tickets',
                stack: 'total',
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Multi Bar Chart" description="Weekly ticket sales">
          <SimpleBarChart
            xAxis={[
              {
                ...COMMON_X_CONFIG,
                data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              },
            ]}
            series={[
              {
                data: [33, 64, 56, 71, 99, 141, 32],
                label: 'Pre-sale Tickets',
                stack: 'total',
              },
              {
                data: [14, 58, 56, 61, 59, 41, 12],
                label: 'Day-of Tickets',
                stack: 'total',
              },
            ]}
          />
        </ChartCard>
      </ChartGrid>
      <LabeledDivider>Area Charts</LabeledDivider>
      <ChartGrid>
        <ChartCard title="Simple Area Chart" description="Ticket price over time">
          <SimpleLineChart
            dataset={MINI_TIMESERIES}
            xAxis={[
              {
                ...COMMON_X_CONFIG,
                valueFormatter: formatShortDate,
                tickNumber: 2,
                tickLabelInterval(value: any, index: number) {
                  // only show the first and last ticks
                  return index === 0 || index === MINI_TIMESERIES.length - 1;
                },
              },
            ]}
            series={[
              {
                dataKey: 'value',
                valueFormatter: (value) => (value ? `$${formatAbbreviatedNumber(value)}` : ''),
                stack: 'total',
                label: 'Ticket price',
                curve: 'stepBefore',
                area: true,
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Linear Area Chart" description="Ticket sales over time">
          <SimpleLineChart
            dataset={MINI_TIMESERIES}
            xAxis={[
              {
                ...COMMON_X_CONFIG,
                valueFormatter: formatShortDate,
                tickNumber: 2,
                tickLabelInterval(value: any, index: number) {
                  // only show the first and last ticks
                  return index === 0 || index === MINI_TIMESERIES.length - 1;
                },
              },
            ]}
            series={[
              {
                dataKey: 'value',
                valueFormatter: (value) => (value ? `$${formatAbbreviatedNumber(value)}` : ''),
                curve: 'linear',
                label: 'Pre-sale Revenue',
                area: true,
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Curved Area Chart" description="Ticket sales over time">
          <SimpleLineChart
            dataset={MINI_TIMESERIES}
            xAxis={[
              {
                ...COMMON_X_CONFIG,
                valueFormatter: formatShortDate,
                tickNumber: 2,
                tickLabelInterval(value: any, index: number) {
                  // only show the first and last ticks
                  return index === 0 || index === MINI_TIMESERIES.length - 1;
                },
              },
            ]}
            series={[
              {
                dataKey: 'value',
                valueFormatter: (value) => (value ? `$${formatAbbreviatedNumber(value)}` : ''),
                label: 'Pre-sale Revenue',
                curve: 'catmullRom',
                area: true,
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Dotted Area Chart" description="Ticket sales over time">
          <SimpleLineChart
            dataset={MINI_TIMESERIES}
            xAxis={[
              {
                ...COMMON_X_CONFIG,
                valueFormatter: formatShortDate,
                tickNumber: 2,
                tickLabelInterval(value: any, index: number) {
                  // only show the first and last ticks
                  return index === 0 || index === MINI_TIMESERIES.length - 1;
                },
              },
            ]}
            series={[
              {
                dataKey: 'value',
                valueFormatter: (value) => (value ? `$${formatAbbreviatedNumber(value)}` : ''),
                curve: 'linear',
                label: 'Pre-sale Revenue',
                showMark: true,
                area: true,
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Area Chart + Legend" description="Ticket sales over time">
          <SimpleLineChart
            dataset={MINI_TIMESERIES}
            xAxis={[
              {
                ...COMMON_X_CONFIG,
                valueFormatter: formatShortDate,
                tickNumber: 2,
                tickLabelInterval(value: any, index: number) {
                  // only show the first and last ticks
                  return index === 0 || index === MINI_TIMESERIES.length - 1;
                },
              },
            ]}
            margin={{ top: 40 }}
            slotProps={{
              legend: {
                hidden: false,
                position: { vertical: 'top', horizontal: 'middle' },
                padding: 0,
              },
            }}
            series={[
              {
                dataKey: 'value',
                valueFormatter: (v, i) => `${v}${i.dataIndex > 3 ? ' (estimated)' : ''}`,
                curve: 'linear',
                label: 'Pre-sale Revenue',
                showMark: true,
                area: true,
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Multi Are Chart" description="Ticket sales over time">
          <SimpleLineChart
            dataset={DUMMY_TIMESERIES.slice(0, 7)}
            xAxis={[
              {
                ...COMMON_X_CONFIG,
                valueFormatter: formatShortDate,
                tickNumber: 2,
                tickLabelInterval(value: any, index: number) {
                  // only show the first and last ticks
                  return index === 0 || index === DUMMY_TIMESERIES.length - 1;
                },
              },
            ]}
            series={[
              {
                dataKey: 'value',
                valueFormatter: (value) => (value ? `$${formatAbbreviatedNumber(value)}` : ''),
                stack: 'total',
                label: 'Pre-sale Revenue',
                area: true,
              },
              {
                dataKey: 'secondaryValue',
                valueFormatter: (value) => (value ? `$${formatAbbreviatedNumber(value)}` : ''),
                stack: 'total',
                label: 'Day-of Revenue',
                area: true,
              },
            ]}
          />
        </ChartCard>
      </ChartGrid>
      <LabeledDivider>Pie Charts</LabeledDivider>
      <ChartGrid>
        <ChartCard title="Simple Donut Chart" description="Sales by event">
          <SimplePieChart
            dataset={DUMMY_TIMESERIES}
            slotProps={{
              legend: { hidden: true },
            }}
            series={[
              {
                data: [
                  { label: 'InnovateTech', value: 1200 },
                  { label: 'Visionary Symposium', value: 880 },
                  { label: 'Global Trends Conference', value: 175 },
                  { label: 'Code Conf', value: 28 },
                ],
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Simple Pie Chart" description="Sales by event">
          <SimplePieChart
            dataset={DUMMY_TIMESERIES}
            slotProps={{
              legend: { hidden: true },
            }}
            series={[
              {
                data: [
                  { label: 'InnovateTech', value: 1200 },
                  { label: 'Visionary Symposium', value: 880 },
                  { label: 'Global Trends Conference', value: 175 },
                  { label: 'Code Conf', value: 28 },
                ],
                innerRadius: 0,
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Labeled Pie Chart" description="Sales by event">
          <SimplePieChart
            dataset={DUMMY_TIMESERIES}
            slotProps={{
              legend: { hidden: true },
            }}
            series={[
              {
                data: [
                  { label: 'InnovateTech', value: 1200 },
                  { label: 'Visionary Symposium', value: 880 },
                  { label: 'Global Trends Conference', value: 175 },
                  { label: 'Code Conf', value: 28 },
                ],
                arcLabel: (item) => `${item.value}`,
                cx: 75,
                cy: 75,
                innerRadius: 0,
                outerRadius: 75,
                paddingAngle: 0,
                cornerRadius: 0,
              },
            ]}
          />
        </ChartCard>
      </ChartGrid>
      <LabeledDivider>Scatter Plots</LabeledDivider>
      <ChartGrid>
        <ChartCard title="Simple Scatter Plot" description="Sales by event">
          <SimpleScatterChart
            slotProps={{
              legend: { hidden: true },
            }}
            yAxis={[
              {
                valueFormatter: (value: number) => `$${formatAbbreviatedNumber(value)}`,
              },
            ]}
            series={[
              {
                label: 'All Events',
                data: DUMMY_EVENTS.map((ev) => ({
                  id: ev.event_name,
                  x: ev.count_signed_up,
                  y: ev.cost_per_ticket * ev.count_signed_up,
                })),
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Scatter Plot + Legend" description="Event sales">
          <SimpleScatterChart
            slotProps={{
              legend: { hidden: false },
            }}
            margin={{ top: 40 }}
            yAxis={[
              {
                valueFormatter: (value: number) => `$${formatAbbreviatedNumber(value)}`,
              },
            ]}
            series={[
              {
                label: 'All Events',
                data: DUMMY_EVENTS.map((ev) => ({
                  id: ev.event_name,
                  x: ev.count_signed_up,
                  y: ev.cost_per_ticket * ev.count_signed_up,
                })),
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Plain Scatter Plot" description="Ticket Prices by # Purchased">
          <SimpleScatterChart
            slotProps={{
              legend: { hidden: true },
            }}
            xAxis={[
              {
                valueFormatter: (value: number) => `$${formatAbbreviatedNumber(value)}`,
              },
            ]}
            grid={{
              vertical: false,
              horizontal: false,
            }}
            series={[
              {
                label: 'All Events',
                data: DUMMY_EVENTS.map((ev) => ({
                  id: ev.event_name,
                  x: ev.cost_per_ticket * ev.count_signed_up,
                  y: ev.count_signed_up,
                })),
              },
            ]}
          />
        </ChartCard>
      </ChartGrid>
    </PageContainer>
  );
}

function ChartGrid({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: { xs: 'grid', md: 'grid' },
        gridTemplateColumns: {
          xs: '1fr',
          md: '1fr 1fr',
          lg: '1fr 1fr 1fr',
        },
        gridAutoRows: '350px',
        gap: 2,
      }}
    >
      {children}
    </Box>
  );
}

const MINI_TIMESERIES = [
  { date: '2021-01-01', value: 1210 },
  { date: '2021-01-02', value: 980 },
  { date: '2021-01-03', value: 1400 },
  { date: '2021-01-04', value: 1510 },
  { date: '2021-01-05', value: 3560 },
  { date: '2021-01-06', value: 1310 },
  { date: '2021-01-07', value: 1010 },
];
