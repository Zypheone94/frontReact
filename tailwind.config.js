/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
    },
    colors: {
      pink: '#F72585',
      purple: '#7209B7',
      deepPurple: '#3A0CA3',
      lightPurple: '#4361EE',
      pastelPurple: '#5F70BD',
      deleteRed: '#C0392B',
      white: '#ffffff'
    }
  },
  plugins: [],
}