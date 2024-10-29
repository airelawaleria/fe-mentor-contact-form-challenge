/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'karla-regular': ['KarlaRegular'],
        'karla-bold': ['KarlaBold'],
        'karla-italic': ['KarlaItalic'],
      },
      colors: {
        primary: {
          'green-200': '#DFF1E7',
          'green-600': '#0C7D69',
          red: '#D73C3C',
        },
        neutral: {
          'grey-500': '#87A3A6',
          'grey-900': '#2B4246',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
