import { Theme } from '@mui/material';

export function baseChartStyles() {
  return {
    '.MuiChartsAxis-directionX': {
      '.MuiChartsAxis-line': {
        stroke: (theme: Theme) => theme.palette.gray['200'],
      },
    },
    '.MuiChartsAxis-left': {
      // hide the left axis by default
      '.MuiChartsAxis-line': {
        display: 'none',
      },
    },
    '.MuiChartsGrid-horizontalLine': {
      // make the background lines dashed
      stroke: (theme: Theme) => theme.palette.gray['200'],
      strokeDasharray: '6 2',
    },
    '.MuiChartsGrid-verticalLine': {
      stroke: (theme: Theme) => theme.palette.gray['200'],
      strokeDasharray: '6 2',
    },
    '.MuiChartsAxis-tick': {
      visibility: 'hidden',
    },
    '.MuiChartsAxis-tickLabel': {
      fill: (theme: Theme) => theme.palette.gray['600'],
    },
  };
}
