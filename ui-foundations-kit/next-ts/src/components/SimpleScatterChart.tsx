'use client'
import { useTheme } from '@mui/material';
import { ScatterChart, ScatterChartProps } from '@mui/x-charts';
import { baseChartStyles } from '~/core/chart-styles';

export function SimpleScatterChart(props: ScatterChartProps) {
  const theme = useTheme();
  return (
    <ScatterChart
      {...props}
      grid={{ horizontal: true, vertical: true, ...props.grid }}
      margin={{ top: 24, right: 24, bottom: 24, left: 48, ...props.margin }}
      colors={props?.colors || [theme.palette.primary['600']]}
      slotProps={{
        legend: {
          hidden: true,
          ...props.slotProps?.legend,
        },
        ...props.slotProps,
      }}
      slots={{
        ...props.slots,
      }}
      sx={{
        ...baseChartStyles(),
        ...(props?.sx || {}),
      }}
    />
  );
}
