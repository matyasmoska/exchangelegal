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
          primary: '#110756',
          'primary-hover': '#2A1C86'
        },
        'light-black': '#7B7B7B',
        'light-grey': '#F8F8F8',
        'warm-grey': '#868686',
        'dark-grey': '#F1F2F4',
        'light-blue': '#D6F4F1',
        'dark-blue': '#110756',
        'light-green': '#34C759',
        'mint': '#78E1DC',
        'mint-dark': '#4FCFC8',
        'slate-blue': '#487A9C',
        'ok': '#12796A',
        'ok-bg': '#D6F4F0',
        'no': '#C2453F',
        'no-bg': '#FAE7E5'
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
        'xxs': '13rem',
        '8xl': '85rem',
        '9xl': '96.5rem'
      },
      minHeight: {
        'carousel': 'calc(100vh - 100px)',
        'header': '100px',
        'header-mobile': '72px',
        'question': '50px',
        'argument': '250px'
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
