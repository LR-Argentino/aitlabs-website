/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        'primary-green': '#a4f58a',
        'primary-green-dark': '#059669',
        'secondary-green': '#e1f4e3',
        'dark-bg': '#f9f9f9',
        'primary-text': '#111111',
        'secondary-text': '#666666',
        'light-gray': '#f0f0f0',
      },
      letterSpacing: {
        tight: '-0.02em',
        tighter: '-0.04em',
      },
    },
  },
  plugins: [],
}