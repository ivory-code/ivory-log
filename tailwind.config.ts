import plugin from 'tailwindcss/plugin'

import type {Config} from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/templates/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        '2xl': {max: '1419px'},
        xl: {max: '1179px'},
        lg: {max: '1023px'},
        md: {max: '767px'},
        sm: {max: '480px'},
      },
      colors: {
        pastelPink: '#f7d3dc',
        pastelBlue: '#d3e5f7',
        pastelYellow: '#f7ecd3',
        pastelPurple: '#e5d3f7',
        darkGray: '#2f2f2f',
        lightGray: '#ededed',
        retroCream: '#faf9f6',
        background: '#141718',
        black: '#000000',
        white: '#ffffff',
        primary: {
          1: '#0084FF',
          2: '#3FDD78',
        },
        accent: {
          1: '#D84C10',
          2: '#3E90F0',
          3: '#8E55EA',
          4: '#8C6584',
          5: '#DDA73F',
          6: '#F7DF1E',
          7: '#61DAFB',
          8: '#E10098',
          9: '#E37400',
          10: '#DD2C00',
          11: '#F24E1E',
        },
        n: {
          1: '#FEFEFE',
          2: '#F3F5F7',
          3: '#E8ECEF',
          4: '#6C7275',
          5: '#343839',
          6: '#232627',
          7: '#141718',
        },
      },
      boxShadow: {
        retro: '4px 4px 0px 0px rgba(0, 0, 0, 0.25)', // 레트로 느낌의 그림자 효과
      },
      spacing: {
        0.25: '0.0625rem',
        0.75: '0.1875rem',
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.75rem',
        13: '3.25rem',
        15: '3.75rem',
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        34: '8.5rem',
        38: '9.5rem',
        58: '14.5rem',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'linear',
      },
      fontFamily: {
        sans: ['Nunito', 'Nanum Square', 'sans-serif'],
      },
      fontSize: {
        0: ['0px', '0px'],
        xl: ['1.125rem', '2rem'],
        '2xl': ['1.5rem', '2.5rem'],
        '3xl': ['1.75rem', '2.5rem'],
        '4xl': ['2.5rem', '3rem'],
        '5xl': ['3rem', '3.5rem'],
        '6xl': ['4rem', '4.5rem'],
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
      },
      borderWidth: {
        3: '0.1875rem',
        6: '0.375rem',
      },
      opacity: {
        15: '.15',
      },
      keyframes: {
        loaderDots: {
          '0%': {opacity: '1'},
          '50%,100%': {opacity: '0.15'},
        },
      },
    },
  },
  plugins: [
    plugin(function ({addBase, addComponents, addUtilities}) {
      addBase({
        html: {
          '@apply text-[1rem]': {},
        },
        body: {
          '@apply bg-n-7 text-[1rem] leading-6 -tracking-[.01em] text-n-7 antialiased md:bg-n-1 dark:text-n-1 dark:md:bg-n-6':
            {},
        },
      })
      addComponents({
        '.h1': {
          '@apply font-sans text-6xl font-bold -tracking-[.025em]': {},
        },
        '.h2': {
          '@apply font-sans text-5xl font-bold -tracking-[.025em]': {},
        },
        '.h3': {
          '@apply font-sans text-4xl font-bold -tracking-[.045em]': {},
        },
        '.h4': {
          '@apply font-sans text-3xl font-bold -tracking-[.02em]': {},
        },
        '.h5': {
          '@apply font-sans text-2xl font-semibold -tracking-[.03em]': {},
        },
        '.h6': {
          '@apply font-sans text-xl font-semibold -tracking-[.03em]': {},
        },
        '.body1': {
          '@apply text-[1.5rem] leading-9 -tracking-[.03em]': {},
        },
        '.body1S': {
          '@apply text-[1.375rem] leading-7 -tracking-[.02em]': {},
        },
        '.body2': {
          '@apply text-[1.0625rem] leading-6 -tracking-[.01em]': {},
        },
        '.base1': {
          '@apply font-sans text-[1rem] leading-6 font-medium -tracking-[.03em]':
            {},
        },
        '.base2': {
          '@apply font-sans text-[0.875rem] leading-6 font-medium -tracking-[.02em]':
            {},
        },
        '.caption1': {
          '@apply font-sans text-[0.75rem] leading-5 font-medium -tracking-[.03em]':
            {},
        },
        '.caption2': {
          '@apply font-sans text-[0.6875rem] leading-4 font-medium -tracking-[.01em]':
            {},
        },
        '.btn': {
          '@apply inline-flex items-center justify-center h-12 px-5.5 border-2 rounded-xl base2 font-semibold transition-colors disabled:opacity-20 disabled:pointer-events-none':
            {},
        },
        '.btn-dark': {
          '@apply btn bg-n-7 border-n-7 text-n-1 fill-n-1 hover:bg-n-5 hover:border-n-5 dark:bg-n-1 dark:border-n-1 dark:text-n-7 dark:fill-n-7 dark:hover:border-transparent dark:hover:text-n-1 dark:hover:fill-primary-1':
            {},
        },
        '.btn-white': {
          '@apply btn bg-n-1 border-transparent shadow-[0_0.125rem_0.25rem_rgba(0,0,0,0.15)] text-n-7 fill-n-7 hover:bg-n-2 dark:bg-n-6 dark:border-n-1/10 dark:text-n-1 dark:fill-n-1 dark:hover:bg-n-1/10':
            {},
        },
        '.btn-large': {
          '@apply h-13': {},
        },
        '.btn-medium': {
          '@apply h-10': {},
        },
        '.btn-small': {
          '@apply h-9 px-4 border rounded-md': {},
        },
      })
      addUtilities({})
    }),
  ],
}
export default config
