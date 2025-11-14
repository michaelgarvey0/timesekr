'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  typography: {
    // Lexend font (previous - keep for easy revert)
    // fontFamily: '"Lexend", Arial, sans-serif',
    // fontWeightRegular: 300, // Light
    // fontWeightBold: 600,    // Semibold
    // IBM Plex Sans font (current)
    fontFamily: '"IBM Plex Sans", Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#16146B',
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
