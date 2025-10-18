import { mangoFusionPalette, PieChart, PieChartProps } from '@mui/x-charts';

export function SimplePieChart(props: PieChartProps) {
  return (
    <PieChart
      slotProps={{
        ...props?.slotProps,
        legend: {
          ...props?.slotProps?.legend,
          direction: 'row',
          position: {
            ...props?.slotProps?.legend?.position,
            horizontal: 'left',
            vertical: 'bottom',
          },
          itemMarkWidth: 10,
          itemMarkHeight: 3,
        },
      }}
      colors={props?.colors || mangoFusionPalette('light')}
      {...props}
      series={props.series.map((ser) => ({
        cx: 75,
        cy: 75,
        innerRadius: 50,
        outerRadius: 75,
        paddingAngle: 1,
        cornerRadius: 3,
        ...ser,
      }))}
    />
  );
}
