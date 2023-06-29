/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          'pink': '#D1014C',
          'bright-pink': '#FF005C',
          'secondary-black': '#1f1f1f'
        }
      }
    },
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

