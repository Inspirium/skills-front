module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'open': 'Open Sans',
        'poppins': 'Poppins',
      },
      gridTemplateColumns: {
        'container': '1rem 1fr 1rem',
        'container2': '2rem 1fr 2rem',
      },
      colors: {
        'cup': {
          "50": "#7EC7E1",
          "100": "#70BCD7",
          "200": "#62B1CD",
          "300": "#6FBAD5",
          "400": "#479BB8",
          "500": "#0085b2",
          "600": "#007297",
          "700": "#1D7A9A",
          "800": "#106F8F",
          "900": "#026485",
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
