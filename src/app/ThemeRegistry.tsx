'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { semantic, background, text, typography, border, primitives, shadows as tokenShadows } from '@/theme/tokens';

const theme = createTheme({
  palette: {
    primary: {
      main: semantic.primary.main,
      light: semantic.primary.light,
      dark: semantic.primary.dark,
    },
    secondary: {
      main: semantic.secondary.main,
      light: semantic.secondary.light,
      dark: semantic.secondary.dark,
    },
    error: {
      main: semantic.error.main,
      light: semantic.error.light,
      dark: semantic.error.dark,
    },
    success: {
      main: semantic.success.main,
      light: semantic.success.light,
      dark: semantic.success.dark,
    },
    background: {
      default: background.default,
      paper: background.level1,
      // @ts-ignore - Extending MUI background palette
      level2: background.level2,
      level3: background.level3,
      accent: background.accent,
      accentLight: background.accentLight,
    },
    text: {
      primary: text.primary,
      secondary: text.secondary,
      disabled: text.disabled,
    },
    grey: primitives.gray,
  },
  typography: {
    fontFamily: '"IBM Plex Sans", Arial, sans-serif',
    fontWeightRegular: typography.weight.regular,
    fontWeightMedium: typography.weight.medium,
    fontWeightBold: typography.weight.bold,
    h1: {
      fontSize: typography.size[60],
      fontWeight: typography.weight.bold,
      lineHeight: typography.lineHeight.sm,
    },
    h2: {
      fontSize: typography.size[48],
      fontWeight: typography.weight.bold,
      lineHeight: typography.lineHeight.sm,
    },
    h3: {
      fontSize: typography.size[36],
      fontWeight: typography.weight.semibold,
      lineHeight: typography.lineHeight.sm,
    },
    h4: {
      fontSize: typography.size[32],
      fontWeight: typography.weight.semibold,
      lineHeight: typography.lineHeight.sm,
    },
    h5: {
      fontSize: typography.size[24],
      fontWeight: typography.weight.semibold,
      lineHeight: typography.lineHeight.md,
    },
    h6: {
      fontSize: typography.size[20],
      fontWeight: typography.weight.semibold,
      lineHeight: typography.lineHeight.md,
    },
    body1: {
      fontSize: typography.size[16],
      fontWeight: typography.weight.regular,
      lineHeight: typography.lineHeight.md,
    },
    body2: {
      fontSize: typography.size[14],
      fontWeight: typography.weight.regular,
      lineHeight: typography.lineHeight.md,
    },
    subtitle1: {
      fontSize: typography.size[18],
      fontWeight: typography.weight.medium,
      lineHeight: typography.lineHeight.md,
    },
    subtitle2: {
      fontSize: typography.size[16],
      fontWeight: typography.weight.medium,
      lineHeight: typography.lineHeight.md,
    },
    caption: {
      fontSize: typography.size[12],
      fontWeight: typography.weight.regular,
      lineHeight: typography.lineHeight.md,
    },
    button: {
      fontSize: typography.size[14],
      fontWeight: typography.weight.medium,
      textTransform: 'none' as const,
      lineHeight: typography.lineHeight.md,
    },
  },
  shape: {
    borderRadius: border.radius.md,
  },
  spacing: 8, // Base unit - multiply by token values
  // Simplified shadow system - just use 0-5 in your code
  shadows: [
    'none',              // 0
    tokenShadows.sm,     // 1
    tokenShadows.md,     // 2 (default)
    tokenShadows.lg,     // 3
    tokenShadows.xl,     // 4
    tokenShadows['2xl'], // 5
    // MUI requires 25 levels, rest are just repeats
    tokenShadows['2xl'], tokenShadows['2xl'], tokenShadows['2xl'], tokenShadows['2xl'],
    tokenShadows['2xl'], tokenShadows['2xl'], tokenShadows['2xl'], tokenShadows['2xl'],
    tokenShadows['2xl'], tokenShadows['2xl'], tokenShadows['2xl'], tokenShadows['2xl'],
    tokenShadows['2xl'], tokenShadows['2xl'], tokenShadows['2xl'], tokenShadows['2xl'],
    tokenShadows['2xl'], tokenShadows['2xl'], tokenShadows['2xl'],
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: border.radius.md,
          textTransform: 'none',
          minHeight: '42px',
          transition: 'all 0.2s ease-in-out',
        },
        outlined: {
          backgroundColor: '#ffffff',
          '&:hover': {
            backgroundColor: primitives.gray[50],
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: border.radius.md,
            minHeight: '42px',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          minHeight: '42px',
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 2, // Use shadow md by default
      },
      styleOverrides: {
        root: {
          borderRadius: border.radius.md,
          border: '1px solid',
          borderColor: primitives.gray[300],
          transition: 'all 0.2s ease-in-out',
          backgroundColor: '#ffffff',
          '&:hover': {
            backgroundColor: primitives.gray[50],
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 2, // Use shadow md by default
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: border.radius.md,
        },
      },
    },
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
