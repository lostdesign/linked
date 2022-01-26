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
        'bright-pink': '#FF005C',
        'secondary-black': '#111'
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#0d0d0d',
      white: '#ffffff',
      gray: colors.gray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber
    }
  },
  variants: {
    extend: {
      ringWidth: ['hover'],
      ringColor: ['hover'],
      opacity: ['active', 'hover'],
      scale: ['active'],
      border: ['focus'],
      translate: ['active'],
      transform: ['active']
    }
  },
  plugins: []
}
