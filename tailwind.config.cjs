/** @type {import('tailwindcss').Config} */
module.exports = {
  // mode: 'jit',
  content: ['./components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './content/**/*.{md,js,ts}', './nuxt.config.{js,ts}', './app.vue'],
  theme: {
    extend: {
      colors: {
        'overlay-light': 'rgba(229, 23, 187, 0.25)', 
        'overlay-dark': 'rgba(229, 23, 187, 0.25)',  // Same for dark mode
        'gradient-light-1': 'rgba(52, 220, 173, 0.15)', // Light mode gradient
        'gradient-dark-1': 'rgba(52, 220, 173, 0.15)', // Dark mode gradient
        'sxvx-dark': 'rgba(43, 48, 53, 1)', 
        'sxvx-light': 'rgba(242, 238, 230, 1)', 
        'sxvx-dark-bg': 'rgba(33, 37, 41, 1)',
        'sxvx-light-bg': 'rgba(250,249,247, 1)',
        'muddy-waters': {
        '50': '#f9f5f1',
        '100': '#ece3d9',
        '200': '#d8c6af',
        '300': '#c4a585',
        '400': '#b2865f',
        '500': '#aa7656',
        '600': '#965f49',
        '700': '#7e4a3f',
        '800': '#683e38',
        '900': '#573430',
        '950': '#301a18',
         },
      },
      backgroundImage: {
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
      fontFamily: {
        inter: ['Inter var', 'sans-serif'], 
        tenor: ['Tenor Sans', 'sans-serif'],
        UNSCII: ['UNSCII', 'sans-serif'],
        rock: ['RocknRoll One', 'sans-serif'],
        metal: ['Metal Mania', 'sans-serif']
      },
      screens: {
        '3xl': '2000px',
      },
      maxWidth: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5715' }],
        base: ['1rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '1.415', letterSpacing: '-0.01em' }],
        '3xl': ['1.875rem', { lineHeight: '1.333', letterSpacing: '-0.01em' }],
        '4xl': ['2.25rem', { lineHeight: '1.277', letterSpacing: '-0.01em' }],
        '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.01em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.01em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.01em' }],
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        wide: '0.01em',
        wider: '0.02em',
        widest: '0.4em',
      },
      boxShadow: {
        // 'np': '1px 1px 20px  rgba(100,100,100,0.4)',
        // 'np-dark': '1px 1px 20px  rgba(100,100,100,0.15)',
        'np': '0px 0px 0px 0.5px hsla(0,0%,39%,.3)',
        'np-dark': '0px 0px 0px 0.5px hsla(0,0%,39%,.3)',
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  darkMode: 'class',
  plugins: [
    // eslint-disable-next-line global-require
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
