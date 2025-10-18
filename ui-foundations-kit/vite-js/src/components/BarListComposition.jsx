import { BarList } from '../components/BarList';
import { DataVizComposition } from '../components/DataVizComposition';
export function BarListComposition({ title, totalValue, totalRenderer, chartProps, chartHeight }) {
  return (
    <DataVizComposition
      title={title}
      totalValue={totalValue}
      totalRenderer={totalRenderer}
      chartHeight={chartHeight}
      chart={<BarList {...chartProps} />}
    />
  );
}
