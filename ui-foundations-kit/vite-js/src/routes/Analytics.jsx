import { Box } from '@mui/material';
import { cheerfulFiestaPalette } from '@mui/x-charts';
import { BarChartComposition } from '../components/BarChartComposition';
import { BarListComposition } from '../components/BarListComposition';
import { DashboardHeader } from '../components/DashboardHeader';
import { DateRangerChanger } from '../components/DateRangerChanger';
import { LineChartComposition } from '../components/LineChartComposition';
import { PageContainer } from '../components/PageContainer';
import { PieChartComposition } from '../components/PieChartComposition';
import { ScatterChartComposition } from '../components/ScatterChartComposition';
import { formatAbbreviatedNumber, formatShortDate } from '../core/formatters';
import { DUMMY_EVENTS } from '../data/events';
import { DUMMY_TIMESERIES } from '../data/timeseries';
export function Analytics() {
  return (
    <PageContainer>
      <DashboardHeader title="Analytics" actions={<DateRangerChanger />} />
      <Box
        data-tour="home-charts"
        sx={{
          display: { xs: 'block', md: 'grid' },
          gridTemplateColumns: {
            xs: undefined,
            md: '1fr 1fr 1fr',
          },
          // go 2fr 1fr on first row and 1fr 2fr on the second row
          gridTemplateAreas: {
            xs: undefined,
            md: `
              "chart1 chart1 chart2"
              "chart3 chart4 chart4"
              "chart5 chart5 chart5"
            `,
          },
          gap: 2,
          rowGap: 4,
        }}
      >
        <Box
          sx={{
            gridArea: 'chart1',
          }}
        >
          <LineChartComposition
            title="Ticket Revenue Over Time"
            totalValue={4500}
            totalRenderer={(value) => `$${value}`}
            chartHeight={250}
            chartProps={{
              dataset: DUMMY_TIMESERIES,
              xAxis: [
                {
                  id: 'categories',
                  dataKey: 'date',
                  scaleType: 'band',
                  valueFormatter: formatShortDate,
                  tickNumber: 2,
                  tickLabelInterval(value, index) {
                    // only show the first and last ticks
                    return index === 0 || index === DUMMY_TIMESERIES.length - 1;
                  },
                },
              ],
              series: [
                {
                  dataKey: 'value',
                  valueFormatter: (value) => (value ? `$${formatAbbreviatedNumber(value)}` : ''),
                },
              ],
            }}
          />
        </Box>
        <Box
          sx={{
            gridArea: 'chart2',
          }}
        >
          <BarChartComposition
            title="7d Tickets Sold"
            totalValue={210}
            chartHeight={250}
            chartProps={{
              xAxis: [
                {
                  id: 'barCategories',
                  data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                  scaleType: 'band',
                },
              ],
              series: [
                {
                  data: [14, 58, 56, 61, 59, 41, 12],
                },
              ],
            }}
          />
        </Box>
        <Box
          sx={{
            gridArea: 'chart3',
          }}
        >
          <PieChartComposition
            title="% of Tickets sold by Event"
            totalValue={100}
            totalRenderer={() => '100%'}
            chartHeight={250}
            chartProps={{
              colors: cheerfulFiestaPalette,
              slotProps: {
                legend: {
                  direction: 'row',
                  position: {
                    horizontal: 'left',
                    vertical: 'bottom',
                  },
                  itemMarkWidth: 10,
                  itemMarkHeight: 3,
                },
              },
              series: [
                {
                  cx: 75,
                  cy: 75,
                  innerRadius: 50,
                  outerRadius: 75,
                  paddingAngle: 1,
                  cornerRadius: 3,
                  data: [
                    { label: 'InnovateTech', value: 1200 },
                    { label: 'Visionary Symposium', value: 880 },
                    { label: 'Global Trends Conference', value: 175 },
                    { label: 'Code Conf', value: 28 },
                  ],
                },
              ],
            }}
          />
        </Box>
        <Box
          sx={{
            gridArea: 'chart4',
          }}
        >
          <BarListComposition
            title="Tickets sold by Event"
            totalValue={1200 + 175 + 42}
            chartHeight={250}
            chartProps={{
              data: [
                { name: 'InnovateTech', value: 1200 },
                { name: 'Visionary Symposium', value: 880 },
                { name: 'Global Trends Conference', value: 175 },
                { name: 'Code Conf', value: 28 },
              ],
              nameField: 'name',
              valueField: 'value',
            }}
          />
        </Box>
        <Box
          sx={{
            gridArea: 'chart5',
          }}
        >
          <ScatterChartComposition
            title="Attendance vs Earnings"
            totalValue={54000}
            totalRenderer={(value) => `$${formatAbbreviatedNumber(value)}`}
            chartHeight={250}
            chartProps={{
              slotProps: {
                legend: {
                  hidden: true,
                },
              },
              yAxis: [
                {
                  valueFormatter: (value) => `$${formatAbbreviatedNumber(value)}`,
                },
              ],
              series: [
                {
                  label: 'Event',
                  data: DUMMY_EVENTS.map((ev) => ({
                    id: ev.event_name,
                    x: ev.count_signed_up,
                    y: ev.cost_per_ticket * ev.count_signed_up,
                  })),
                },
              ],
            }}
          />
        </Box>
      </Box>
    </PageContainer>
  );
}
