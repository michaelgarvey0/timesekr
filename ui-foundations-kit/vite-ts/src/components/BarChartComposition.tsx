import { BarChartProps } from '@mui/x-charts';
import { BaseDataVizCompositionProps, DataVizComposition } from '~/components/DataVizComposition';
import { SimpleBarChart } from '~/components/SimpleBarChart';

export function BarChartComposition({
  title,
  totalValue,
  totalRenderer,
  chartProps,
  chartHeight,
}: BaseDataVizCompositionProps & {
  chartProps: BarChartProps;
}) {
  return (
    <DataVizComposition
      title={title}
      totalValue={totalValue}
      totalRenderer={totalRenderer}
      chartHeight={chartHeight}
      chart={<SimpleBarChart {...chartProps} />}
    />
  );
}
