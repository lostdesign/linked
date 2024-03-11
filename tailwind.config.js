/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,vue}'
  ],
  theme: {
    extend: {
      colors: {
        'pink': '#D1014C',
        'bright-pink': '#FF005C',
        'secondary-black': '#1f1f1f'
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#141414',
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
      transform: ['active'],
      dark: ['hover']
    }
  },
  plugins: [],
}

