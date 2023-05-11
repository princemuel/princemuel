const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    borderRadius: {
      ...defaultTheme.borderRadius,
      pill: '100vmax',
    },

    fontFamily: {
      serif: ['Ibarra Real Nova', ...defaultTheme.fontFamily.serif],
      sans: ['Public Sans', ...defaultTheme.fontFamily.sans],
    },

    fontSize: {
      100: '0.8rem',
      200: '1rem',
      300: '1.2rem',
      400: '1.5rem',
      500: '1.6rem',
      600: '2.4rem',
      700: '3.2rem', //
      800: '4rem',
      900: '5rem',
    },

    letterSpacing: {
      ...defaultTheme.letterSpacing,
      tightest: '-0.45px',
      tighter: ' -0.36px',
      tight: ' -0.29px',
      widest: '2px',
    },

    lineHeight: {
      100: '1.175rem',
      200: '1.41rem',
      300: '1.8rem',
      400: '1.9rem',
      500: '3rem',
      600: '3.6rem',
      700: '4.2rem',
      800: '5rem',
    },

    // screens: {
    //   s: "20em", // => @media (min-width: 320px) { ... }
    //   xs: "30em", // => @media (min-width: 480px) { ... }
    //   sm: "36em", // => @media (min-width: 576px) { ... }
    //   sx: "40em", // => @media (min-width: 640px) { ... }
    //   md: "45em", // => @media (min-width: 720px) { ... }
    //   lg: "64em", // => @media (min-width: 1024px) { ... }
    //   xl: "80em", // => @media (min-width: 1280px) { ... }
    //   xxl: "96em", // => @media (min-width: 1280px) { ... }
    //   xxxl: "112.5em", // => @media (min-width: 1800px) { ... }
    // },

    screens: {
      xs: '30em', // => @media (min-width: 480px) { ... }
      ...defaultTheme.screens,
    },

    extend: {
      cursor: {
        pointer:
          'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAUCAYAAABvVQZ0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAI6SURBVHgBnZRBaxNBGIYnu9uNSW1NlkgMVAl4Cyg5CAUPJlYFTyaX3CohePKUn5BcBA9CfkAvAf+B4sVLBC8eChv05ClKVaQIiUKjabOO77s7E8bUBpsXnrwzu9lvvvm+2bXFccWADRw1XlpWJpNZg+8ACV4kEomNVqtliSW0Am2mUik5HA5luVxmwEe5XC4pltBZ27a38/m8pHq9HoP54KI47ZbT6fQ52H1mRjE7jnFtK5vNrjJzhSuiui5cYA2Z3YN/HwwGYcBischgH8En8BLsKZ5w8VqtdiwoJ5bneeuO49zGeBdFD4OVSqVwu77vh1nS9VgF3SoUCq4ZiJObzAgcgK8sPtVsNqWWvka1221d011wgckI9cPJ5263K7k9NkDXbZH4Xzz3DRRVLcPDycmYBTe6KPV8kUR0Hm+AM0JFvA4+6DpRnU5nNq5UKn85A5jBUOdb8ITO7CrY4dZ0F+dX/5cbmd0Fq6zXb7CPI/F6NBq9bTQa4n/V7/dpI2QmZxfZWugKhm3eNLdI6S5q1/VkozB+BjZB3Dwe6+COZVlP4Ufs7CLV63UGeg8egksieiNmspPJZA6+DZ6DX/MZVqvVMDt1JA6w8GP4NV38ebnxePwy/IEK+FMVWHMIhmr8BnWuwj2hDqwzF+xwMpnsIeCr6XQ6DoJgIKIvhhuLxaZIjm/IEZgAH/ffwX+IqIknvvU8e+fBBlb38JALDxBwrLKTWGwf/gWMzcKfJP3pXjGuBcqlyjAwH/gDZjDKatJ5fJYAAAAASUVORK5CYII="), pointer;',
      },
      screens: {
        sm: '40em', // => @media (min-width: 640px) { ... }
        md: '48em', // => @media (min-width: 768px) { ... }
        lg: '64em', // => @media (min-width: 1024px) { ... }
        xl: '80em', // => @media (min-width: 1280px) { ... }
        '2xl': '96em', // => @media (min-width: 1536px) { ... }

        '-xs': { max: '30em' },
        '-sm': { max: '40em' }, // => @media (max-width: 640px) { ... }
        '-md': { max: '48em' }, // => @media (max-width: 768px) { ... }
        '-lg': { max: '64em' }, // => @media (max-width: 1024px) { ... }
        '-xl': { max: '80em' }, // => @media (max-width: 1280px) { ... }
        '-2xl': { max: '96em' }, // => @media (max-width: 1536px) { ... }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
