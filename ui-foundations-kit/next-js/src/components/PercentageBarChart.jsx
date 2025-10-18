'use client';
import { Box } from '@mui/material';
export function PercentageBarChart({ value, barWidth = 4, barHeight = 18, numBars = 10 }) {
  const numBarsToHighlight = Math.round(value * numBars);
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {Array.from({ length: numBars }, (_, index) => (
        <Box
          key={index}
          sx={{
            display: 'inline-block',
            width: `${barWidth}px`,
            height: `${barHeight}px`,
            borderRadius: 1,
            backgroundColor: index < numBarsToHighlight ? 'primary.500' : 'gray.200',
            marginRight: 0.25,
          }}
        />
      ))}
    </Box>
  );
}
