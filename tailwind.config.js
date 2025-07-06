/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#1359A9',
          600: '#0f4f96',
          700: '#0c4282',
          800: '#093570',
          900: '#072a5d',
        },
        secondary: {
          50: '#fff7ed',
          100: '#ffedd5',
          500: '#F26422',
          600: '#ea5a1f',
          700: '#d9511c',
          800: '#c7481a',
          900: '#b63f17',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};