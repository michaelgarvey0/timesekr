/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
    },
    fontWeight: {
      light: '300',
      normal: '300',
      medium: '500',
      semibold: '600',
      bold: '600',
      extrabold: '700',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-sunset': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #667eea 0%, #84fab0 100%)',
        'gradient-fire': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'gradient-aurora': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'gradient-mesh': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      },
      colors: {
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
      },
    },
  },
  plugins: [],
}
