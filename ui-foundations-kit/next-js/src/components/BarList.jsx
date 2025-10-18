'use client';
import { Box, Typography } from '@mui/material';
import React from 'react';
const getWidthsFromValues = (data, valueField) => {
  let maxValue = -Infinity;
  data.forEach((item) => {
    const value = item[valueField];
    maxValue = Math.max(maxValue, value);
  });
  return data.map((item) => {
    const value = item[valueField];
    if (value === 0) return 0;
    return Math.max((value / maxValue) * 100, 1);
  });
};
const DEFAULT_ROW_HEIGHT = 40;
const DEFAULT_ROW_GAP = 2;
export function BarList({
  data = [],
  valueFormatter = (value) => value.toString(),
  showAnimation = false,
  showTitle = true,
  nameField,
  valueField,
  barRenderer,
  colorGetter,
  rowHeight = DEFAULT_ROW_HEIGHT,
  rowGap = DEFAULT_ROW_GAP,
  ...other
}) {
  const widths = getWidthsFromValues(data, valueField);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        width: '100%',
      }}
    >
      {showTitle && <BarListTitle />}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: rowGap,
        }}
        {...other}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: rowGap,
            width: '100%',
          }}
        >
          {data.map((item, idx) => {
            const name = item[nameField];
            const value = item[valueField];
            return (
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                }}
                key={`barlist-${name}`}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 1.5,
                    backgroundColor: colorGetter ? colorGetter(item, idx) : 'primary.100',
                    width: `${widths[idx]}%`,
                    transition: showAnimation ? 'all 1s' : 'none',
                    height: rowHeight,
                    padding: 1,
                  }}
                ></Box>
                <Box
                  sx={{
                    position: 'absolute',
                    flexGrow: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: 'sm',
                    paddingX: 1,
                  }}
                >
                  {barRenderer ? barRenderer(item, idx) : name}
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: rowGap,
            marginLeft: 2,
          }}
        >
          {data.map((item) => {
            const name = item[nameField];
            const value = item[valueField];
            return (
              <Typography
                key={`barlist-value-${name}`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: rowHeight,
                  fontSize: 'inherit',
                }}
              >
                {valueFormatter(value)}
              </Typography>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
export function BarListTitle() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography sx={{ fontWeight: 500, color: 'gray.500' }}>Name</Typography>
      <Typography sx={{ fontWeight: 500, color: 'gray.500' }}>Count</Typography>
    </Box>
  );
}
