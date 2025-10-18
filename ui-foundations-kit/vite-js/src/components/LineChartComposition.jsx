import { DataVizComposition } from '../components/DataVizComposition';
import { SimpleLineChart } from '../components/SimpleLineChart';
export function LineChartComposition({
  title,
  totalValue,
  totalRenderer,
  chartHeight,
  chartProps,
}) {
  return (
    <DataVizComposition
      title={title}
      totalValue={totalValue}
      totalRenderer={totalRenderer}
      chartHeight={chartHeight}
      chart={<SimpleLineChart {...chartProps} />}
    />
  );
}
