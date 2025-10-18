'use client'
import { Box } from '@mui/material';

export type BaseDataVizCompositionProps = {
  title: string;
  totalValue: number;
  totalRenderer?: (value: number) => string;
  chartHeight: number;
};
export function DataVizComposition({
  title,
  totalValue,
  totalRenderer,
  chartHeight,
  chart,
}: BaseDataVizCompositionProps & {
  chart: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
      }}
    >
      <Box
        sx={{
          fontSize: 'sm',
          color: 'gray.900',
          fontWeight: 500,
        }}
      >
        {title}
      </Box>
      <Box
        sx={{
          fontSize: '2xl',
          color: 'gray.700',
          fontWeight: 700,
          letterSpacing: -1,
          margin: 0,
        }}
      >
        {totalRenderer ? totalRenderer(totalValue) : totalValue}
      </Box>
      <Box
        sx={{
          height: chartHeight,
        }}
      >
        {chart}
      </Box>
    </Box>
  );
}
