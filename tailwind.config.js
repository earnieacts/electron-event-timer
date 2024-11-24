/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      },
      screens: {
        'fullscreen': {'raw': '(min-height: 900px) and (min-width: 1400px)'},
      },
    },
  },
  plugins: [],
};

