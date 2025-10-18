import { keyframes } from '@emotion/react';
import { Box } from '@mui/material';
const pulse = keyframes`
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
`;
export function DotLoader({ dotSize = 4, loading = true, customSx }) {
  if (!loading) {
    return null;
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: `${dotSize * 0.75}px`,
        mx: 1,
        ...customSx,
      }}
    >
      <Box
        sx={{
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          backgroundColor: 'gray.400',
          animation: `${pulse} 1s ease-in-out infinite`,
        }}
      />
      <Box
        sx={{
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          backgroundColor: 'gray.400',
          animation: `${pulse} 1s ease-in-out 0.2s infinite`,
        }}
      />
      <Box
        sx={{
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          backgroundColor: 'gray.400',
          animation: `${pulse} 1s ease-in-out 0.4s infinite`,
        }}
      />
    </Box>
  );
}
