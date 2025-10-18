'use client';
import { DataVizComposition } from '../components/DataVizComposition';
import { SimpleScatterChart } from '../components/SimpleScatterChart';
export function ScatterChartComposition({
  title,
  totalValue,
  totalRenderer,
  chartProps,
  chartHeight,
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
