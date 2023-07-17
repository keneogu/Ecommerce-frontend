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
      },
      screens: {
        'xs': '400px',
        // => @media (min-width: 640px) { ... }
  
        // 'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        // 'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [],
}

