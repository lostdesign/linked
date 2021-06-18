const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  purge: {
    enabled: false,
    content: ['./src/**/*.html', './src/**/*.vue', './src/**/*.svg']
  },
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#07080a',
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
  plugins: [require('@tailwindcss/forms')]
}
