/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'body-bg': '#F7FBFC',
        'secondary-bg' :"#ffffff",
        'btn-bg': '#769FCD',
        'btn-hover':"#B9D7EA",
        'border-color':"#D6E6F2",
        'primary-text':"#000000",
        'secondary-text': "#B4B4B8"
      },

  
    },
  },
  plugins: [],
}