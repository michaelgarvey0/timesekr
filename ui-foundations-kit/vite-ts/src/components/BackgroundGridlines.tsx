import { Box } from '@mui/material';

export function BackgroundGridlines({
  blockSize = 16,
  blockColor = 'rgb(15 23 42 / 0.05',
  ...props
}) {
  return (
    <Box
      role="presentation"
      sx={{
        height: 400,
        width: '75%',
        top: 32,
        right: '33%',
        position: 'absolute',
        maskImage: 'radial-gradient(black, black 0, transparent 85%, transparent 100%)',
        backgroundPosition: 'bottom 1px center',
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${blockSize} ${blockSize}' width='${blockSize}' height='${blockSize}' fill='none' stroke='${blockColor}'%3e%3cpath d='M0 .5H${
          blockSize - 1
        }.5V${blockSize}'/%3e%3c/svg%3e")`,
        ...props.sx,
      }}
    />
  );
}
