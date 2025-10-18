'use client'
import { PieChartProps } from '@mui/x-charts';
import { BaseDataVizCompositionProps, DataVizComposition } from '~/components/DataVizComposition';
import { SimplePieChart } from '~/components/SimplePieChart';

export function PieChartComposition({
  title,
  totalValue,
  totalRenderer,
  chartHeight,
  chartProps,
}: BaseDataVizCompositionProps & {
  chartProps: PieChartProps;
}) {
  return (
    <DataVizComposition
      title={title}
      totalValue={totalValue}
      totalRenderer={totalRenderer}
      chartHeight={chartHeight}
      chart={<SimplePieChart {...chartProps} />}
    />
  );
}
