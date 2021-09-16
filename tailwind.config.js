const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  purge: {
    enabled: true,
    content: ['./src/**/*.html', './src/**/*.vue', './src/**/*.svg']
  },
  theme: {
    extend: {
      colors: {
        'pink': '#D1014C',
        'bright-pink': '#FF005C'
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#161616',
      white: '#ffffff',
      gray: colors.gray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber
    }
  },
  variants: {
    extends: {
      opacity: ['active', 'hover'],
      scale: ['active'],
      border: ['focus'],
      translate: ['active'],
      transform: ['active']
    }
  },
  plugins: []
}
