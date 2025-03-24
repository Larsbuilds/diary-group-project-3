/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        highlight: '#F0A240',
        'text-dark': '#3C4154',
        'text-light': '#FFFFFF',
        'bg-dark': '#082140',
        'other': {
          pink: '#FCADC3',
          blue: '#5C6BBE',
          purple: '#A25E9B'
        }
      },
      fontSize: {
        // Default sizes
        'h1-base': ['55px', {
          lineHeight: '1.2',
          letterSpacing: '-0.02em',
        }],
        'h2-base': ['55px', {
          lineHeight: '1.2',
          letterSpacing: '-0.02em',
        }],
        'p-base': ['16px', {
          lineHeight: '1.5',
        }],
        // Medium viewport sizes
        'h1-md': ['75px', {
          lineHeight: '1.2',
          letterSpacing: '-0.02em',
        }],
        'h2-md': ['28px', {
          lineHeight: '1.2',
          letterSpacing: '-0.02em',
        }],
        'p-md': ['18px', {
          lineHeight: '1.5',
        }],
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(to right, #FCADC3, #5C6BBE)',
      },
    },
  },
  plugins: [],
} 