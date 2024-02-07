/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './Styles/**/*.{css,scss,sass}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      colors: {
        'custom-black': '#101010',
        'custom-blue': '#0072b2',
        'custom-white': '#fff6fa',
        'custom-neon-blue': '#2272FF',
        'custom-orange': '#e69f00',
        'custom-light-blue': '#56b4e9',
        'custom-green': '#009e73',
        'custom-yellow': '#f0e442',
        'custom-light-gray':'#cecece',

      },
    },
  },
  plugins: [require("daisyui")],
}
