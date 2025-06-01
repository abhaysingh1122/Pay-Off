/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f5ff',
          100: '#ebebff',
          200: '#d6d6ff',
          300: '#b3b3ff',
          400: '#8f8fff',
          500: '#5f5fff',
          600: '#4d4dff',
          700: '#3333cc',
          800: '#2929a3',
          900: '#1f1f7a',
        },
        secondary: {
          50: '#f8f5ff',
          100: '#f0ebff',
          200: '#e1d6ff',
          300: '#c7b3ff',
          400: '#a64dff',
          500: '#9333ea',
          600: '#7c28d9',
          700: '#6b21b3',
          800: '#581c87',
          900: '#461465',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #5F5FFF 0%, #A64DFF 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)',
      },
    },
  },
  plugins: [],
};