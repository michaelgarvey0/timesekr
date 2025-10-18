import { Box } from '@mui/material';
export function GradientBlur({ color, size = 250, coordinates, opacity = 0.5 }) {
  return (
    <Box
      role="presentation"
      sx={{
        isolation: 'isolate',
        overflow: 'hidden',
        position: 'absolute',
        zIndex: 0,
        bgcolor: color || 'primary.300',
        height: size,
        width: size,
        borderRadius: 999,
        opacity: opacity,
        filter: `blur(${size / 5}px)`,
        mixBlendMode: 'multiply',
        transform: 'translate3d(0, 0, 0)',
        ...coordinates,
      }}
    />
  );
}
