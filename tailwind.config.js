/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      fontSize: {
        'xs-mobile': ['0.75rem', { lineHeight: '1.5' }],
        'sm-mobile': ['0.875rem', { lineHeight: '1.5' }],
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
      colors: {
        beige: {
          50: '#faf8f5',
          100: '#f5f1eb',
          200: '#e8dfd3',
          300: '#d4c4b0',
          400: '#b8a085',
          500: '#9d8266',
          600: '#7d6851',
          700: '#5d4d3d',
          800: '#3d3329',
          900: '#1f1a15',
        },
        accent: {
          50: '#fef9e7',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        primary: {
          50: '#faf8f5',
          100: '#f5f1eb',
          200: '#e8dfd3',
          300: '#d4c4b0',
          400: '#b8a085',
          500: '#9d8266',
          600: '#7d6851',
          700: '#5d4d3d',
          800: '#3d3329',
          900: '#1f1a15',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
