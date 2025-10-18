import { DataVizComposition } from '../components/DataVizComposition';
import { SimplePieChart } from '../components/SimplePieChart';
export function PieChartComposition({ title, totalValue, totalRenderer, chartHeight, chartProps }) {
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
