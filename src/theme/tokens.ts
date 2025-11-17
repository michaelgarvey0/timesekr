// Design tokens from Figma

// Primitives
export const primitives = {
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  blue: {
    100: '#e8ecff',
    300: '#5763fb',
    500: '#10137b',
    700: '#0a0c4d',
    900: '#05061f',
  },
  green: {
    100: '#dcfce7',
    300: '#86efac',
    500: '#22c55e',
    700: '#15803d',
    900: '#14532d',
  },
  red: {
    100: '#fee2e2',
    300: '#fca5a5',
    500: '#ef4444',
    700: '#b91c1c',
    900: '#7f1d1d',
  },
  orange: {
    100: '#ffe3ad',
    300: '#ffb03f',
    500: '#fc6800',
    700: '#d43e00',
    900: '#8a2b05',
  },
};

// Semantic colors
export const semantic = {
  primary: {
    main: primitives.blue[500],
    light: primitives.blue[300],
    dark: primitives.blue[700],
  },
  secondary: {
    main: primitives.orange[500],
    light: primitives.orange[300],
    dark: primitives.orange[700],
  },
  error: {
    main: primitives.red[500],
    light: primitives.red[300],
    dark: primitives.red[900],
  },
  success: {
    main: primitives.green[500],
    light: primitives.green[300],
    dark: primitives.green[700],
  },
};

// Background/Surface
export const background = {
  default: '#ffffff',
  level1: primitives.gray[50],
  level2: primitives.gray[100],
  level3: primitives.gray[200],
  accent: '#ecf5fa',
  accentLight: '#f3f9fc',
};

// Text colors
export const text = {
  primary: primitives.gray[800],
  secondary: primitives.gray[600],
  disabled: primitives.gray[300],
  inverse: '#ffffff',
};

// State colors
export const states = {
  primary: {
    hover: primitives.blue[700],
    pressed: primitives.blue[900],
    disabled: primitives.gray[500],
  },
  secondary: {
    hover: primitives.orange[700],
    pressed: primitives.orange[900],
    disabled: primitives.gray[500],
  },
};

// Typography
export const typography = {
  size: {
    10: 10,
    12: 12,
    14: 14,
    16: 16,
    18: 18,
    20: 20,
    24: 24,
    28: 28,
    32: 32,
    36: 36,
    48: 48,
    60: 60,
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    sm: 1.2,
    md: 1.5,
    lg: 1.75,
  },
};

// Spacing
export const spacing = {
  0: 0,
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  20: 20,
  24: 24,
  32: 32,
  40: 40,
  48: 48,
  56: 56,
  64: 64,
  80: 80,
  96: 96,
  128: 128,
  // Semantic spacing
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

// Opacity
export const opacity = {
  0: 0,
  10: 0.1,
  25: 0.25,
  50: 0.5,
  75: 0.75,
  90: 0.9,
  100: 1,
};

// Border
export const border = {
  width: {
    none: 0,
    sm: 1,
    md: 2,
    lg: 4,
  },
  radius: {
    none: 0,
    sm: 4,
    md: 12,
    lg: 20,
    full: 9999,
  },
};

// Shadows
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
};
