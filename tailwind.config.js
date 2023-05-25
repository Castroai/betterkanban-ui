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
        primary: '#00A1E0', // Salesforce Blue
        secondary: '#EFD43C', // Salesforce Yellow
        accent: '#7FBA00', // Salesforce Green
        text: '#000000', // Black
      },
      dark: {
        primary: '#1E4E79', // Dark Blue
        secondary: '#B08800', // Dark Yellow
        accent: '#546A29', // Dark Green
        text: '#FFFFFF', // White
      },
    },
  },
},
  plugins: [],
  darkMode: 'class',
}

