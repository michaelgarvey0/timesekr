import { ScatterChartProps } from '@mui/x-charts';
import { BaseDataVizCompositionProps, DataVizComposition } from '~/components/DataVizComposition';
import { SimpleScatterChart } from '~/components/SimpleScatterChart';

export function ScatterChartComposition({
  title,
  totalValue,
  totalRenderer,
  chartProps,
  chartHeight,
}: BaseDataVizCompositionProps & {
  chartProps: ScatterChartProps;
}) {
  return (
    <DataVizComposition
      title={title}
      totalValue={totalValue}
      totalRenderer={totalRenderer}
      chartHeight={chartHeight}
      chart={<SimpleScatterChart {...chartProps} />}
    />
  );
}
