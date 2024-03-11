/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}', './Styles/**/*.{css,scss,sass}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        'custom-blue': '#0072b2',
        'custom-white': 'faf3dd',
        'custom-lightgreen': '68b0ab',
        'custom-mint': '#bee3db',
        'custom-light-blue': '#56b4e9',
        'custom-green': '#08605F',
        'custom-yellow': '#f0e442',
        'custom-light-gray': '#cecece',
        'custom-gray':'b0c1c3',
        'custom-beige': 'faf3dd',
      }
    }
  },
  plugins: [require("daisyui")]
};