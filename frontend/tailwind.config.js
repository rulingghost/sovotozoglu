/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'soento-white': '#f8f8f8',
        'soento-green': '#0a6865',
      },
      width: {
        one: '400px',
        two: '750px',
        three: '950px',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          /* Hide scrollbar for modern browsers */
          '-ms-overflow-style': 'none' /* IE and Edge */,
          'scrollbar-width': 'none' /* Firefox */,
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none' /* Chrome, Safari, and Opera */,
        },
      })
    },
  ],
}
