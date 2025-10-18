'use client';
import { useTheme } from '@mui/material';
import { BarChart, mangoFusionPalette } from '@mui/x-charts';
import { baseChartStyles } from '../core/chart-styles';
export function SimpleBarChart(props) {
  const theme = useTheme();
  const chartBarRadius = Number(String(theme.shape.borderRadius).replace('px', ''));
  const isHorizontal = props.layout === 'horizontal';
  // make sure that resizing keeps the chart looking good, and not overflowing parent containers
  return (
    <BarChart
      {...props}
      grid={{ vertical: isHorizontal, horizontal: !isHorizontal, ...props.grid }}
      borderRadius={isHorizontal ? chartBarRadius / 2 : chartBarRadius}
      margin={{ top: 24, right: 8, bottom: 24, left: isHorizontal ? 36 : 8 }}
      colors={
        props?.colors || [theme.palette.primary['600'], ...mangoFusionPalette('light').slice(1)]
      }
      leftAxis={isHorizontal ? undefined : null}
      bottomAxis={isHorizontal ? null : undefined}
      sx={{
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
