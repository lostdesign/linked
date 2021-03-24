const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  purge: {
    enabled: true,
    content: [
      './src/**/*.html',
      './src/**/*.vue',
    ],
  },
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#161616',
      white: colors.white,
      gray: colors.gray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
    },
  },
  variants: {
    opacity: ['active', 'hover'],
    scale: ['active'],
    border: ['focus']
  },
  plugins: [
  ],
}
