const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/pages/**/*.tsx', './src/components/**/*.tsx', './src/layouts/**/*.tsx'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        orange: {
          primary: '#FF872E',
          'primary-hover': '#CE6C24'
        },
        'dark-blue': '#021C62'
      },
      fontFamily: {
        'header': ['"Roboto"', ...defaultTheme.fontFamily.sans],
        'text': ['"Hanken Grotesk"', ...defaultTheme.fontFamily.sans]
      },
      height: {
        'fill-available': 'calc(var(--vh, 1vh) * 100)'
      },
      borderWidth: {
        '10': '10px',
        '3': '3px'
      },
      boxShadow: {
        'tile': '0 0 10px 0 rgba(0, 0, 0, 0.17)'
      },
      spacing: {
        '1/8': '12.5%',
        '2/8': '25%',
        '6/8': '75%',
        '7/8': '87.5%'
      },
      scale: {
        '102': '1.02'
      }
    },
    screens: {
      '2xl': {'max': '1535px'},
      'xl': {'max': '1279px'},
      'lg': {'max': '1023px'},
      'md': {'max': '767px'},
      'sm': {'max': '639px'},
      'xs': {'max': '360px'}
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
