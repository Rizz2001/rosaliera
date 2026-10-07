/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rosaliera: {
          50: '#F4F9F1',
          100: '#EBF7DF',
          500: '#7CC12A',
          600: '#58A618',
          700: '#468612',
          800: '#37680D',
          red: '#E53935',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
