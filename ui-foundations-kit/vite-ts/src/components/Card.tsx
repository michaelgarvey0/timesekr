import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';

function Card({ customSx, ...props }: { customSx?: SxProps<Theme>; [key: string]: any }) {
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        border: (theme) => `1px solid ${theme.palette.gray['200']}`,
        backgroundColor: 'background.paper',
        color: 'gray.800',
        boxShadow: 1,
        ...customSx,
      }}
      {...props}
    />
  );
}

function CardHeader({ customSx, ...props }: { customSx?: SxProps<Theme>; [key: string]: any }) {
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        p: 3,
        ...customSx,
      }}
      {...props}
    />
  );
}

function CardTitle({ customSx, ...props }: { customSx?: SxProps<Theme>; [key: string]: any }) {
  return (
    <Box
      component="h3"
      sx={{
        my: 0,
        fontSize: 'md',
        fontWeight: 600,
        ...customSx,
      }}
      {...props}
    />
  );
}

function CardDescription({
  customSx,
  ...props
}: {
  customSx?: SxProps<Theme>;
  [key: string]: any;
}) {
  return (
    <Typography
      sx={{
        color: 'gray.600',
        fontSize: 'sm',
        ...customSx,
      }}
      {...props}
    />
  );
}

function CardContent({ customSx, ...props }: { customSx?: SxProps<Theme>; [key: string]: any }) {
  return (
    <Box
      component="div"
      sx={{
        p: 3,
        pt: 0,
        ...customSx,
      }}
      {...props}
    />
  );
}

function CardFooter({ customSx, ...props }: { customSx?: SxProps<Theme>; [key: string]: any }) {
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 3,
        pt: 0,
        ...customSx,
      }}
      {...props}
    />
  );
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
