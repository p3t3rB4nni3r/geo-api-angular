const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    container: {
      center: true
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      smallH: { raw: '(max-height: 500px)' },
      mediumH: { raw: '(min-height: 501px) and (max-height: 799px)' },
      largeH: { raw: '(min-height: 800px)' }
    },
    colors: {
      gray: colors.gray,
      blue: colors.blue,
      red: colors.rose,
      pink: colors.fuchsia,
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {

    }
  },
  variants: {
    extend: {
      borderColor: ['focus-visible'],
      opacity: ['disabled'],
    }
  }
}