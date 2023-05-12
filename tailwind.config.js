/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kenz: {
          50: '#ffe41b',
          100: '#ffe41e',
          200: '#383100',
          300: '#241f00',
          400: '#a59209',
        } 
      }
    },
  },
  plugins: [],
}

