import { DataVizComposition } from '../components/DataVizComposition';
import { SimpleBarChart } from '../components/SimpleBarChart';
export function BarChartComposition({ title, totalValue, totalRenderer, chartProps, chartHeight }) {
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
