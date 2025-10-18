// This entire file should be copied and included in your own project, wrapping
// your React app in the ThemeProvider exported at the bottom of the file.
// ------------------------------------------------------------------------- */
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import * as React from 'react';
import { CssBaseline, GlobalStyles } from '@mui/material';
// -------------------------------
// Define some custom JSX elements
// -------------------------------
const radioCheckedIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM13.7071 8.70711C14.0976 8.31658 14.0976 7.68342 13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289L9 10.5858L7.70711 9.29289C7.31658 8.90237 6.68342 8.90237 6.29289 9.29289C5.90237 9.68342 5.90237 10.3166 6.29289 10.7071L8.29289 12.7071C8.68342 13.0976 9.31658 13.0976 9.70711 12.7071L13.7071 8.70711Z"
      fill="currentColor"
    />
  </svg>
);
const radioUncheckedIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2.5" y="2.5" width="15" height="15" rx="7.5" stroke="currentColor" />
  </svg>
);
const checkboxIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="2.5"
      y="2.5"
      width="15"
      height="15"
      rx="2.5"
      stroke="currentColor"
      strokeWidth={1.25}
    />
  </svg>
);
const checkboxIndeterminateIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 2C3.34315 2 2 3.34315 2 5V15C2 16.6569 3.34315 18 5 18H15C16.6569 18 18 16.6569 18 15V5C18 3.34315 16.6569 2 15 2H5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H7Z"
      fill="currentColor"
    />
  </svg>
);
const checkboxCheckedIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 2C3.34315 2 2 3.34315 2 5V15C2 16.6569 3.34315 18 5 18H15C16.6569 18 18 16.6569 18 15V5C18 3.34315 16.6569 2 15 2H5ZM13.7071 8.70711C14.0976 8.31658 14.0976 7.68342 13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289L9 10.5858L7.70711 9.29289C7.31658 8.90237 6.68342 8.90237 6.29289 9.29289C5.90237 9.68342 5.90237 10.3166 6.29289 10.7071L8.29289 12.7071C8.68342 13.0976 9.31658 13.0976 9.70711 12.7071L13.7071 8.70711Z"
      fill="currentColor"
    />
  </svg>
);
// -------------------------------
// Define shared tokens/constants
// -------------------------------
const primaryColorScale = {
  50: 'hsl(214, 100%, 97%)',
  100: 'hsl(214, 95%, 93%)',
  200: 'hsl(213, 97%, 87%)',
  300: 'hsl(213, 96%, 78%)',
  400: 'hsl(213, 94%, 68%)',
  500: 'hsl(217, 91%, 60%)',
  600: 'hsl(221, 84%, 54%)',
  700: 'hsl(224, 76%, 48%)',
  800: 'hsl(226, 71%, 40%)',
  900: 'hsl(226, 65%, 34%)',
  main: 'hsl(221, 84%, 54%)',
  subtle: 'hsla(217, 83%, 70%, 0.1)',
};
const yellowColorScale = {
  50: 'hsl(55, 92%, 95%)',
  100: 'hsl(55, 97%, 88%)',
  200: 'hsl(53, 98%, 77%)',
  300: 'hsl(50, 98%, 64%)',
  400: 'hsl(48, 96%, 53%)',
  500: 'hsl(45, 93%, 47%)',
  600: 'hsl(41, 96%, 40%)',
  700: 'hsl(35, 92%, 33%)',
  800: 'hsl(32, 81%, 29%)',
  900: 'hsl(28, 73%, 26%)',
  main: 'hsl(41, 96%, 40%)',
  subtle: 'hsla(45, 93%, 47%, 0.1)',
};
const greenColorScale = {
  50: 'hsl(152, 81%, 96%)',
  100: 'hsl(149, 80%, 90%)',
  200: 'hsl(152, 76%, 80%)',
  300: 'hsl(156, 72%, 67%)',
  400: 'hsl(158, 64%, 52%)',
  500: 'hsl(160, 84%, 39%)',
  600: 'hsl(161, 94%, 30%)',
  700: 'hsl(163, 94%, 24%)',
  800: 'hsl(163, 88%, 20%)',
  900: 'hsl(164, 86%, 16%)',
  main: 'hsl(161, 94%, 30%)',
  subtle: 'hsla(160, 84%, 39%, 0.1)',
};
const redColorScale = {
  50: 'hsl(0, 86%, 97%)',
  100: 'hsl(0, 93%, 94%)',
  200: 'hsl(0, 96%, 89%)',
  300: 'hsl(0, 94%, 82%)',
  400: 'hsl(0, 91%, 71%)',
  500: 'hsl(0, 84%, 60%)',
  600: 'hsl(0, 72%, 51%)',
  700: 'hsl(0, 74%, 42%)',
  800: 'hsl(0, 70%, 35%)',
  900: 'hsl(0, 63%, 31%)',
  main: 'hsl(0, 72%, 51%)',
  subtle: 'hsla(0, 84%, 60%, 0.1)',
};
const fuchsiaColorScale = {
  50: 'hsl(289, 100%, 98%)',
  100: 'hsl(287, 100%, 95%)',
  200: 'hsl(288, 96%, 91%)',
  300: 'hsl(291, 93%, 83%)',
  400: 'hsl(292, 91%, 73%)',
  500: 'hsl(292, 84%, 61%)',
  600: 'hsl(293, 69%, 49%)',
  700: 'hsl(295, 72%, 40%)',
  800: 'hsl(295, 70%, 33%)',
  900: 'hsl(297, 64%, 28%)',
  main: 'hsl(293, 69%, 49%)',
  subtle: 'hsla(292, 84%, 61%, 0.1)',
};
const violetColorScale = {
  50: 'hsl(250, 100%, 98%)',
  100: 'hsl(251, 91%, 95%)',
  200: 'hsl(251, 95%, 92%)',
  300: 'hsl(253, 95%, 85%)',
  400: 'hsl(255, 92%, 76%)',
  500: 'hsl(258, 90%, 66%)',
  600: 'hsl(262, 83%, 58%)',
  700: 'hsl(263, 70%, 50%)',
  800: 'hsl(263, 69%, 42%)',
  900: 'hsl(264, 67%, 35%)',
  main: 'hsl(262, 83%, 58%)',
  subtle: 'hsla(258, 90%, 66%, 0.1)',
};
const blueColorScale = {
  50: 'hsl(204, 100%, 97%)',
  100: 'hsl(204, 94%, 94%)',
  200: 'hsl(201, 94%, 86%)',
  300: 'hsl(199, 95%, 74%)',
  400: 'hsl(198, 93%, 60%)',
  500: 'hsl(199, 89%, 48%)',
  600: 'hsl(200, 98%, 39%)',
  700: 'hsl(201, 96%, 32%)',
  800: 'hsl(201, 90%, 27%)',
  900: 'hsl(202, 80%, 24%)',
  main: 'hsl(200, 98%, 39%)',
  subtle: 'hsla(199, 89%, 48%, 0.1)',
};
const grayColorScale = {
  50: 'hsl(210, 20%, 98%)',
  100: 'hsl(218, 14%, 96%)',
  200: 'hsl(218, 13%, 90%)',
  300: 'hsl(217, 12%, 84%)',
  400: 'hsl(218, 11%, 65%)',
  500: 'hsl(220, 10%, 46%)',
  600: 'hsl(216, 14%, 34%)',
  700: 'hsl(217, 18%, 26%)',
  800: 'hsl(215, 27%, 17%)',
  900: 'hsl(218, 39%, 10%)',
  main: 'hsl(216, 14%, 34%)',
  subtle: 'hsla(220, 11%, 94%, 0.75)',
};
const darkGrayColorScale = {
  50: 'hsl(210, 20%, 12%)',
  100: 'hsl(218, 14%, 14%)',
  200: 'hsl(218, 13%, 20%)',
  300: 'hsl(217, 12%, 26%)',
  400: 'hsl(218, 11%, 45%)',
  500: 'hsl(220, 10%, 64%)',
  600: 'hsl(216, 14%, 76%)',
  700: 'hsl(217, 18%, 84%)',
  800: 'hsl(215, 27%, 93%)',
  900: 'hsl(218, 39%, 100%)',
  main: 'hsl(216, 14%, 76%)',
  subtle: 'hsla(220, 11%, 94%, 0.75)',
};
const orangeColorScale = {
  50: 'hsl(31, 100%, 97%)',
  100: 'hsl(31, 100%, 93%)',
  200: 'hsl(31, 100%, 85%)',
  300: 'hsl(31, 100%, 75%)',
  400: 'hsl(31, 100%, 60%)',
  500: 'hsl(31, 100%, 50%)',
  600: 'hsl(31, 100%, 40%)',
  700: 'hsl(31, 100%, 30%)',
  800: 'hsl(31, 100%, 20%)',
  900: 'hsl(31, 100%, 10%)',
  main: 'hsl(31, 100%, 50%)',
  subtle: 'hsla(31, 100%, 50%, 0.1)',
};
function invertColorScale(colorScale) {
  return {
    ...colorScale,
    50: colorScale[900],
    100: colorScale[800],
    200: colorScale[700],
    300: colorScale[600],
    400: colorScale[500],
    500: colorScale[400],
    600: colorScale[300],
    700: colorScale[200],
    800: colorScale[100],
    900: colorScale[50],
    main: colorScale[500],
    subtle: colorScale.subtle,
  };
}
const lightPaletteScales = {
  background: {
    default: 'hsla(210, 20%, 99%, 1)',
    paper: '#fff',
  },
  // built in MUI color scales
  primary: primaryColorScale,
  secondary: grayColorScale,
  warning: yellowColorScale,
  // custom color scales
  red: redColorScale,
  orange: orangeColorScale,
  yellow: yellowColorScale,
  green: greenColorScale,
  blue: blueColorScale,
  fuchsia: fuchsiaColorScale,
  violet: violetColorScale,
  gray: grayColorScale,
};
const darkPaletteScales = {
  background: {
    default: 'hsla(220, 2%, 12%, 1)',
    paper: '#2a2b2e',
  },
  // built in MUI color scales
  primary: invertColorScale(primaryColorScale),
  secondary: darkGrayColorScale,
  warning: yellowColorScale,
  // custom color scales
  red: invertColorScale(redColorScale),
  orange: invertColorScale(orangeColorScale),
  yellow: invertColorScale(yellowColorScale),
  green: invertColorScale(greenColorScale),
  blue: invertColorScale(blueColorScale),
  fuchsia: invertColorScale(fuchsiaColorScale),
  violet: invertColorScale(violetColorScale),
  gray: darkGrayColorScale,
};
// create the typography scale in pixels based on a 16px base font size
const typographySizesPx = {
  '2xs': 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
  '7xl': 72,
};
// -------------------------------
// Step 1: Define theme tokens
// -------------------------------
const customTheme = createTheme({
  palette: {
    mode: 'light',
    ...lightPaletteScales,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 720,
      md: 960,
      lg: 1240,
      xl: 1920,
    },
  },
  shape: {
    borderRadius: 6,
  },
  // overwrite the shadows since 25 is way too many options, use softer shadows so they don't get overdone
  shadows: [
    'none',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)', // border-like
    '0 1px 3px rgb(44 42 38 / 7%), 0 4px 16px rgb(44 42 38 / 6%)', // xs
    '0 1px 4px rgb(44 42 38 / 7%), 0 4px 24px rgb(44 42 38 / 7%)', // sm
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // md
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // lg
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', // xl
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  ],
  transitions: {
    duration: {
      // for micro interactions
      short: 150,
      // basic (default) timing
      standard: 200,
      // for complex animations
      complex: 300,
    },
  },
  // allow styling individual fontSizes in a component with the fontSize prop: "xs", "sm", "md", etc.
  typography: {
    fontSize: 14,
    '2xs': '0.625rem',
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    // use Inter, and then the default MacOS font stack
    fontFamily: [
      '"Inter"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 78 / 70,
    },
    h2: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 44 / 36,
    },
    h3: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 44 / 36,
      letterSpacing: 0,
    },
    h4: {
      fontSize: '0.75rem',
      lineHeight: 42 / 28,
      letterSpacing: 0,
    },
  },
});
export const allAvailColorScales = {
  primary: {
    value: 'primary',
    label: 'Primary',
    colorScale: {
      light: lightPaletteScales.primary,
      dark: darkPaletteScales.primary,
    },
  },
  fuchsia: {
    value: 'fuchsia',
    label: 'Fuchsia',
    colorScale: {
      light: lightPaletteScales.fuchsia,
      dark: darkPaletteScales.fuchsia,
    },
  },
  violet: {
    value: 'violet',
    label: 'Violet',
    colorScale: {
      light: lightPaletteScales.violet,
      dark: darkPaletteScales.violet,
    },
  },
  blue: {
    value: 'blue',
    label: 'Blue',
    colorScale: {
      light: lightPaletteScales.blue,
      dark: darkPaletteScales.blue,
    },
  },
  green: {
    value: 'green',
    label: 'Green',
    colorScale: {
      light: lightPaletteScales.green,
      dark: darkPaletteScales.green,
    },
  },
  yellow: {
    value: 'yellow',
    label: 'Yellow',
    colorScale: {
      light: lightPaletteScales.yellow,
      dark: darkPaletteScales.yellow,
    },
  },
  red: {
    value: 'red',
    label: 'Red',
    colorScale: {
      light: lightPaletteScales.red,
      dark: darkPaletteScales.red,
    },
  },
  orange: {
    value: 'orange',
    label: 'Orange',
    colorScale: {
      light: lightPaletteScales.orange,
      dark: darkPaletteScales.orange,
    },
  },
};
export const ALL_AVAIL_COLOR_SCALES_LIST = Object.values(allAvailColorScales);
export const allRadiusScales = {
  none: {
    label: 'None',
    amount: 0,
    value: 'none',
    description: 'Developer focused',
  },
  sm: {
    label: 'Small',
    amount: 3,
    value: 'sm',
    description: 'Elegant and refined',
  },
  md: {
    label: 'Medium',
    amount: 6,
    value: 'md',
    description: 'Balanced and versatile',
  },
  lg: {
    label: 'Large',
    amount: 12,
    value: 'lg',
    description: 'Friendly and easy',
  },
};
export const ALL_RADIUS_SCALES_LIST = Object.values(allRadiusScales);
export const ALL_AVAIL_FONTS = {
  Inter: { value: 'Inter' },
  Ubuntu: { value: 'Ubuntu' },
  Roboto: { value: 'Roboto' },
  Manrope: { value: 'Manrope' },
};
export const ALL_AVAIL_FONTS_LIST = Object.values(ALL_AVAIL_FONTS);
// -------------------------------
// Lastly, create a Theme Provider
// -------------------------------
export function ThemeProvider({ children }) {
  const activePalette = lightPaletteScales;
  const activeRadius = {
    amount: customTheme.shape.borderRadius,
  };
  // step 2 to use custom theme values to modify the theme with our new defaults
  const theme = createTheme(customTheme, {
    components: {
      MuiAccordion: {
        defaultProps: {
          disableGutters: true,
        },
        styleOverrides: {
          root: {
            borderStyle: 'none',
            background: activePalette.background.default,
            '&:not(:last-child)': {
              borderBottom: 0,
            },
            '&:before': {
              opacity: '1 !important',
              background: activePalette.gray['200'],
            },
            '&.Mui-expanded': {
              margin: 0,
            },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            padding: 0,
            fontWeight: 500,
            '&.Mui-expanded': {
              color: activePalette.primary['700'],
            },
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: {
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            color: activePalette.gray['600'],
            'p:not(:last-child)': {
              marginBottom: customTheme.spacing(1),
            },
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.severity === 'info' && {
              '.MuiAlert-icon': {
                color: activePalette.blue['600'],
              },
              backgroundColor: activePalette.primary['50'],
              color: activePalette.gray['600'],
              border: `1px solid ${activePalette.primary['200']}`,
            }),
          }),
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            // flatten the app bar by default
            boxShadow: customTheme.shadows[0],
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          inputRoot: {
            // specifically adjusted to match other inputs
            paddingBottom: `6px !important `,
            paddingLeft: `12px !important `,
            paddingRight: `32px !important `,
            paddingTop: `6px !important `,
          },
          paper: {
            borderRadius: activeRadius.amount * 1.5,
            transform: 'translateY(4px) !important',
            boxShadow: customTheme.shadows[2],
          },
          listbox: {
            padding: customTheme.spacing(0.5),
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          },
          option: {
            minHeight: `36px !important`,
            borderRadius: activeRadius.amount,
          },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          // remove the infamous Material Design button ripple
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            '&': {
              lineHeight: 1.6,
            },
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.variant === 'contained' && {
              color: activePalette.background.paper,
            }),
            ...((ownerState.variant === 'contained' || ownerState.variant === 'outlined') && {
              boxShadow: customTheme.shadows[1],
            }),
            ...(ownerState.variant === 'contained' &&
              ownerState.color === 'primary' && {
                transition: customTheme.transitions.create(`all`),
                fontWeight: 600,
                '&:hover': {
                  filter: 'contrast(1.1)',
                },
              }),
            ...(ownerState.variant === 'outlined' &&
              (ownerState.color === 'gray' || ownerState.color === 'secondary') && {
                background: activePalette.background.paper,
                borderColor: activePalette.gray['300'],
                '&:hover': {
                  background: activePalette.gray['50'],
                  borderColor: activePalette.gray['300'],
                  boxShadow: customTheme.shadows[1],
                },
              }),
            cursor: 'pointer',
            textTransform: 'inherit',
            letterSpacing: 0.2,
            borderRadius: activeRadius.amount * 1.25,
          }),
        },
      },
      MuiButtonGroup: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiCardActions: {
        styleOverrides: {
          root: {
            background: activePalette.gray['100'],
            justifyContent: 'flex-end',
            color: activePalette.gray['500'],
            transition: customTheme.transitions.create('background'),
            fontWeight: '500',
            '&:hover': {
              background: activePalette.gray['50'],
            },
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: customTheme.spacing(2),
            '&:last-child': {
              paddingBottom: customTheme.spacing(2),
            },
          },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          title: {
            fontSize: customTheme.typography.xl,
            fontWeight: '500',
            color: activePalette.gray['700'],
          },
          action: {
            alignSelf: 'center',
            marginRight: 0,
            fontSize: customTheme.typography.sm,
            color: activePalette.gray['500'],
          },
        },
      },
      MuiChartsAxisHighlight: {
        styleOverrides: {
          root: {
            stroke: activePalette.gray['300'],
          },
        },
      },
      MuiHighlightElement: {
        styleOverrides: {
          root: {
            stroke: activePalette.background.default,
            strokeWidth: 2,
          },
        },
      },
      MuiChartsTooltip: {
        styleOverrides: {
          row: {
            '.MuiChartsTooltip-cell': {
              borderBottomColor: activePalette.gray['200'],
            },
          },
          table: {
            border: `1px solid ${activePalette.gray['200']}`,
            borderRadius: activeRadius.amount,
            boxShadow: customTheme.shadows[4],
          },
          valueCell: {
            fontSize: customTheme.typography.xs,
            paddingLeft: customTheme.spacing(1),
          },
        },
      },
      MuiCheckbox: {
        defaultProps: {
          icon: checkboxIcon,
          indeterminateIcon: checkboxIndeterminateIcon,
          checkedIcon: checkboxCheckedIcon,
        },
        styleOverrides: {
          root: {
            borderRadius: activeRadius.amount,
          },
        },
      },
      MuiContainer: {
        defaultProps: {
          maxWidth: false,
        },
        styleOverrides: {
          root: {
            maxWidth: 1380,
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          row: {
            borderTopColor: activePalette.gray['200'],
            backgroundColor: activePalette.background.paper,
            '&:hover': {
              backgroundColor: activePalette.gray['50'],
            },
            '&.Mui-selected': {
              backgroundColor: activePalette.gray['50'],
              '&:hover': {
                // @ts-ignore
                backgroundColor: activePalette.primary['subtle'],
                filter: 'contrast(0.9)',
              },
            },
          },
          columnHeaders: {
            borderWidth: 0.5,
          },
          footerContainer: {
            borderWidth: 0.5,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: activeRadius.amount * 2,
            padding: customTheme.spacing(3),
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderBottomWidth: 0.5,
            borderColor: activePalette.gray['200'],
          },
        },
      },
      MuiIconButton: {
        defaultProps: {
          size: 'small',
        },
        styleOverrides: {
          root: {
            borderRadius: activeRadius.amount * 1.5,
          },
        },
      },
      MuiInputBase: {
        defaultProps: {
          size: 'small',
        },
        styleOverrides: {
          root: {
            backgroundColor: activePalette.background.paper,
            boxShadow: `${customTheme.shadows[1]}`,
            borderColor: activePalette.gray['300'],
            borderWidth: 1,
            borderStyle: 'solid',
            borderRadius: activeRadius.amount,
          },
        },
      },
      MuiFormControl: {
        defaultProps: {
          variant: 'filled',
        },
        styleOverrides: {
          root: {
            borderColor: activePalette.gray['300'],
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontSize: customTheme.typography.sm,
            fontWeight: '500',
            color: activePalette.gray['800'],
            marginBottom: customTheme.spacing(1.5),
            '&.Mui-focused': {
              color: 'inherit !important',
            },
          },
        },
      },
      MuiFilledInput: {
        defaultProps: {
          hiddenLabel: true,
          disableUnderline: true,
        },
        styleOverrides: {
          root: {
            backgroundColor: activePalette.background.paper,
            borderRadius: activeRadius.amount,
            '&.Mui-focused': {
              backgroundColor: activePalette.background.paper,
              borderColor: activePalette.primary['400'],
            },
            '&:hover:not(.Mui-disabled)': {
              backgroundColor: activePalette.background.paper,
            },
            '&.Mui-disabled': {
              backgroundColor: activePalette.gray['100'],
            },
          },
        },
      },
      MuiGridFilterForm: {
        styleOverrides: {
          closeIcon: {
            minWidth: 30,
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            '.MuiListItemText-primary': {
              fontWeight: '500',
              color: activePalette.gray['700'],
            },
          },
        },
      },
      MuiMenu: {
        defaultProps: {
          elevation: 2,
        },
        styleOverrides: {
          list: {
            padding: customTheme.spacing(0.5),
            // mui applies a 0 margin to the right of all lists that can put things off balance
            paddingRight: `${customTheme.spacing(0.5)} !important`,
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          },
          paper: {
            borderRadius: `${activeRadius.amount * 2}px !important`,
          },
        },
      },
      MuiMenuItem: {
        defaultProps: {
          dense: true,
        },
        styleOverrides: {
          root: {
            columnGap: customTheme.spacing(1),
            borderRadius: activeRadius.amount,
            paddingLeft: customTheme.spacing(1),
            paddingRight: customTheme.spacing(1),
            '&:focus': {
              backgroundColor: activePalette.secondary['subtle'],
              '&.Mui-selected': {
                // @ts-ignore
                backgroundColor: activePalette.primary['subtle'],
              },
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: activePalette.gray['300'],
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            borderColor: activePalette.gray['200'],
            borderWidth: 0.5,
            borderStyle: 'solid',
            color: activePalette.gray['800'],
          },
        },
      },
      MuiPopover: {
        defaultProps: {
          elevation: 1,
          transitionDuration: 225,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          PaperProps: {
            sx: {
              boxShadow: customTheme.shadows[2],
            },
          },
        },
        styleOverrides: {
          paper: {
            transform: 'translateY(4px) !important',
          },
        },
      },
      MuiRadio: {
        defaultProps: {
          icon: radioUncheckedIcon,
          checkedIcon: radioCheckedIcon,
        },
      },
      MuiNativeSelect: {
        defaultProps: {
          variant: 'filled',
        },
        styleOverrides: {
          root: {
            borderColor: activePalette.gray['300'],
          },
          select: {
            minWidth: 100,
            '&:focus': {
              backgroundColor: activePalette.background.paper,
            },
          },
        },
      },
      MuiSelect: {
        defaultProps: {
          variant: 'filled',
        },
        styleOverrides: {
          root: {
            borderColor: activePalette.gray['300'],
          },
          select: {
            minWidth: 100,
            borderRadius: activeRadius.amount,
            '&:focus': {
              backgroundColor: activePalette.background.paper,
              borderRadius: activeRadius.amount,
            },
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 42,
            height: 26,
            padding: 0,
            '& .MuiSwitch-switchBase': {
              padding: 0,
              margin: 2,
              transitionDuration: '200ms',
              '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: activePalette.background.paper,
                '& + .MuiSwitch-track': {
                  backgroundColor: activePalette.green['600'],
                  opacity: 1,
                  border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                  opacity: 0.5,
                },
              },
              '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: activePalette.green['500'],
                border: `6px solid ${activePalette.background.paper}`,
              },
              '&.Mui-disabled .MuiSwitch-thumb': {
                color: activePalette.gray[100],
              },
              '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.7,
              },
            },
            '& .MuiSwitch-thumb': {
              boxSizing: 'border-box',
              width: 22,
              height: 22,
            },
            '& .MuiSwitch-track': {
              borderRadius: 26 / 2,
              backgroundColor: activePalette.background.default,
              opacity: 1,
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: activePalette.gray['200'],
            borderWidth: 0.5,
          },
        },
      },
      MuiTablePagination: {
        styleOverrides: {
          select: {
            paddingTop: '0 !important',
            paddingBottom: 0,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            paddingLeft: 0,
            paddingRight: 0,
            minWidth: 60,
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          flexContainer: {
            gap: customTheme.spacing(4),
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'filled',
        },
      },
      MuiTooltip: {
        defaultProps: {
          arrow: true,
        },
        styleOverrides: {
          tooltip: {
            color: activePalette.gray['50'],
            background: activePalette.gray['900'],
          },
          arrow: {
            color: activePalette.gray['900'],
          },
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: {
            background: activePalette.background.paper,
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            gap: 6,
            textTransform: 'inherit',
            '&.Mui-selected': {
              color: activePalette.primary['700'],
              fontWeight: 700,
            },
            '&.Mui-disabled': {
              color: activePalette.gray['300'],
            },
          },
          sizeSmall: {
            paddingTop: customTheme.spacing(0.25),
            paddingBottom: customTheme.spacing(0.25),
            paddingLeft: customTheme.spacing(1),
            paddingRight: customTheme.spacing(1),
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: ({ ownerState }) => {
            let tracking = 'inherit';
            const sizeToken = ownerState?.sx?.fontSize;
            if (sizeToken in typographySizesPx) {
              const pixelSize = typographySizesPx[ownerState.sx.fontSize];
              if (typeof pixelSize === 'number') {
                // automatically apply suggest dynamic tracking based on recommendations for Inter:
                // https://rsms.me/inter/dynmetrics/
                const a = -0.0223;
                const b = 0.185;
                const c = -0.1745;
                tracking = `${a + b * Math.E ** (c * pixelSize)}em`;
              }
            }
            return {
              color: activePalette.gray['800'],
              lineHeight: tracking,
            };
          },
        },
      },
    },
  });
  return (
    <MuiThemeProvider theme={theme}>
      {/* Set global MUI styles */}
      <GlobalStyles
        styles={{
          '*, *::before, *::after': {
            boxSizing: 'border-box',
          },
          html: {
            minHeight: '100vh',
          },
          body: {
            minHeight: '100vh',
          },
          '.Mui-focusVisible': {
            boxShadow: `0 0 0 2px ${theme.palette.primary['200']} !important`,
          },
          '.MuiTablePagination-select': {
            paddingBottom: `1px !important`,
          },
          '.MuiDataGrid-menuList': {
            '&&&': {
              padding: 4,
            },
          },
        }}
      />
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
