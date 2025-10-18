import { BarList, BarListProps } from '~/components/BarList';
import { BaseDataVizCompositionProps, DataVizComposition } from '~/components/DataVizComposition';

export function BarListComposition<T extends object>({
  title,
  totalValue,
  totalRenderer,
  chartProps,
  chartHeight,
}: BaseDataVizCompositionProps & {
  chartProps: BarListProps<T>;
}) {
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
