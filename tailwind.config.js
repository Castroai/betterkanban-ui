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
        secondary: '#F5F5F5',
        accent: '#00B4D8',
        text: '#333333',
      },
      dark: {
        primary: '#333333',
        secondary: '#1A202C',
        accent: '#90CDF4',
        text: '#FFFFFF',
      },
    },
  },
},
  plugins: [],
  darkMode: 'class',
}

