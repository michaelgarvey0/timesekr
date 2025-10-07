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
    extend: {},
  },
  plugins: [],
}
