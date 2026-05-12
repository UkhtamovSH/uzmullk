/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        DEFAULT: '1197px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: '#007AFF',
        'dark-bg': '#0f1117',
        'dark-surface': '#1a1d27',
        'dark-border': '#2a2d3a',
        'dark-text': '#e2e4ec',
        'dark-muted': '#6b7280',
      },
    },
  },
  plugins: [],
}
