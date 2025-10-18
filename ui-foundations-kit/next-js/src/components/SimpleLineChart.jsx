'use client';
import { useTheme } from '@mui/material';
import { LineChart, mangoFusionPalette } from '@mui/x-charts';
import { baseChartStyles } from '../core/chart-styles';
export function SimpleLineChart(props) {
  const theme = useTheme();
  return (
    <LineChart
      {...props}
      grid={{ horizontal: true, ...props.grid }}
      margin={{ top: 24, right: 8, bottom: 24, left: 8, ...props.margin }}
      colors={
        props?.colors || [theme.palette.primary['600'], ...mangoFusionPalette('light').slice(1)]
      }
      leftAxis={null}
      series={[
        ...props.series.map((ser) => ({
          showMark: false,
          curve: 'linear',
          ...ser,
        })),
      ]}
      sx={{
        // make the first tick label text-anchor start, and the last one text-anchor end
        '.MuiChartsAxis-tickContainer:first-of-type': {
          '.MuiChartsAxis-tickLabel': {
            textAnchor: 'start',
          },
        },
        '.MuiChartsAxis-tickLabel:last-of-type': {
          textAnchor: 'end',
        },
        ...baseChartStyles(),
        ...(props?.sx || {}),
      }}
      slotProps={{
        ...props?.slotProps,
        legend: {
          hidden: true,
          ...props?.slotProps?.legend,
        },
      }}
    />
  );
}
