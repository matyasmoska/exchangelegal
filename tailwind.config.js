const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/pages/**/*.tsx', './src/components/**/*.tsx', './src/layouts/**/*.tsx'],
  darkMode: false,
  mode: 'jit',
  theme: { 
    extend: {
      typography: {
        DEFAULT: {
          css: {
            strong: { color: '#000000' },
            h1: {
              color: '#000000'
            },
            h2: {
              color: '#000000'
            },
            h3: {
              color: '#000000'
            },
            h4: {
              color: '#000000'
            }
          }
        }
      },
      colors: {
        wine: {
          primary: '#a73933',
          'primary-hover': '#4d001a'
        },
        'light-black': '#7B7B7B',
        'light-blue': '#E6E8F2',
        'dark-blue': '#223a7b'
      },
      fontFamily: {
        'header': ['"Source Serif Pro"', ...defaultTheme.fontFamily.serif],
        'text': ['"Source Serif Pro"', ...defaultTheme.fontFamily.serif]
      },
      height: {
        'fill-available': 'calc(var(--vh, 1vh) * 100)'
      },
      borderWidth: {
        '10': '10px',
        '3': '3px'
      },
      maxWidth: {
        '9xl': '96.5rem'
      },
      boxShadow: {
        'tile': '0 0 10px 0 rgba(0, 0, 0, 0.10)',
        'tilearg': '0 0 32px 0 rgba(33, 57, 123, 0.1)'
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
      '3xl': {'max': '1919px'},
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
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
}
