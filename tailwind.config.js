/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors: {
        light: {
          primary: '#FFFFFF',
          secondary: '#F2F2F2',
          accent: '#7FBA00',
          text: '#000000',
        },
        dark: {
          primary: '#292929',
          secondary: '#212121',
          accent: '#546A29',
          text: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

