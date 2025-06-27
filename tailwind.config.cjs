/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        press: ['"Press Start 2P"', 'cursive'],
        truculenta: ['Truculenta', 'sans-serif'],
      },
      scale: {
        101: "1.01",
        102: "1.02",
        103: "1.03",
        104: "1.04",
        106: "1.06",
      },
      backdropBlur: {
        '4xl': '100px',
        'crazy': '160px',
      },
    },
  },
  plugins: [],
};
