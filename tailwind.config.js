/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        shake:{
          "0%":{
            transform:'translate(4px,0)',
          },
          "50%":{
            transform:'translate(-4px,0px)'
          },
          '100%':{
            transform:'translate(0,0)'
          }
        }
      },
    animation:{
      shake:'shake 150ms 2 linear'
    }
    },
  },
  plugins: [],
}

