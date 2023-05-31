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
        primary: '#3373C4',
        secondary: '#FFFFFF', 
        accent: '#7FBA00', 
        text: '#000000', 
      },
      dark: {
        primary: '#3373C4', 
        secondary: '#3e3e42', 
        accent: '#546A29', 
        text: '#FFFFFF', 
      },
    },
  },
},
  plugins: [],
  darkMode: 'class',
}

