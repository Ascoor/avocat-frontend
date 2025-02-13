import plugin from 'tailwindcss/plugin';
import forms from '@tailwindcss/forms';
import cssVariablesPlugin from 'postcss-css-variables';
import rtl from 'tailwindcss-rtl';
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';

export default {
  mode: 'jit',
  content: [
    './src/**/*.{js,jsx,ts,tsx,vue}',
    './public/index.html',
    './node_modules/flowbite/**/*.js',
    './node_modules/@headlessui/react/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        amiri: ['Amiri', 'serif'],
        tharwat: ['Tharwat', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
      },
      colors: {
        'icon-color': {
          fb: '#355cff',
          link: '#2561c2',
          insta: '#ff1c8d',
          twitter: '#3297f0',
          tube: '#ff1a30',
        },
        'avocat-blue': {
          light: '#396dcc',
          DEFAULT: '#0c3066',
          dark: '#1b2b5a',
          darker: '#031023',
        },
        'avocat-orange': {
          DEFAULT: '#fb9221',
          dark: '#e06f1a',
          darker: '#b95412',
          light: '#ffb74d',
        },
        'avocat-indigo': {
          DEFAULT: '#3f51b5',
          dark: '#303f9f',
          darker: '#1a237e',
          light: '#7986cb',
        },
        'avocat-yellow': {
          DEFAULT: '#ffeb3b',
          dark: '#fdd835',
          darker: '#fbc02d',
          light: '#fff59d',
        },
        lightBg: '#F3F4F6',
        darkBg: '#1F2937',

        'avocat-dot-1': '#1a1d91', 
        'avocat-dot-2': '#1c239a', 
        'avocat-dot-3': '#1e29a3', 
        'avocat-dot-4': '#202fac', 
        'avocat-dot-5': '#2235b5', 
        'avocat-dot-6': '#b52335', 
        'avocat-dot-7': '#bf2d40', 
        'avocat-dot-8': '#c8374a', 
        'avocat-dot-9': '#d14155', 
        'avocat-dot-10': '#db4b60', 
        'avocat-dot-11': '#e5566b', 
        'avocat-dot-12': '#f06076', 
        'avocat-dot-13': '#271977', 
        'avocat-dot-14': '#070a69', 
        'avocat-dot-1': '#c8374a', 

        'avocat-dark-dot-1': '#FF1744', 
        'avocat-dark-dot-2': '#FF6B81', 
        'avocat-dark-dot-3': '#FF4569', 
        'avocat-dark-dot-4': '#FF8C94', 
        'avocat-dark-dot-5': '#FFADB5', 

        'avocat-dark-dot-6': '#FF6D00', 
        'avocat-dark-dot-7': '#FFA726', 
        'avocat-dark-dot-8': '#FFB74D', 
        'avocat-dark-dot-9': '#FFD180', 
        'avocat-dark-dot-10': '#FFE5B4', 

        'avocat-dark-dot-11': '#FF1744', 
        'avocat-dark-dot-12': '#FF6B81', 
        'avocat-dark-dot-13': '#FF4569', 
        'avocat-dark-dot-14': '#FF8C94', 
        'avocat-dark-dot-5': '#FFADB5', 
      },

      backgroundImage: {
        'gradient-red-button': 'linear-gradient(to right, #ec4899, #db2777,#be185d)',
        'gradient-red-dark-button': 'linear-gradient(to right, #f43f5e, #ec4899,#db2777)',
        'gradient-green-button': 'linear-gradient(to right, #22c55e, #16a34a,#15803d)',
        'gradient-green-dark-button': 'linear-gradient(to right, #34d399, #22c55e,#16a34a)',
        'gradient-yellow-button': 'linear-gradient(to right, #fbbf24, #f59e0b,#d97706)',
        'gradient-yellow-dark-button': 'linear-gradient(to right, #fde68a, #fbbf24,#f59e0b)',
        'gradient-blue-button': 'linear-gradient(to right, #60a5fa, #3b82f6,#2563eb)',
        'gradient-day': 'linear-gradient(to top, #396dcc, #0c3066)',
        'gradient-night': 'linear-gradient(135deg, #031023, #1b2b5a)',
        'gradient-orange-dark': 'linear-gradient(to bottom, #ffa726, #fb7921)',
        'gradient-blue-dark': 'linear-gradient(to bottom, #1b2b5a, #031023)',
        'gradient-orange-light': 'linear-gradient(to bottom, #ffcc80, #ffb74d)',
        'gradient-blue-light': 'linear-gradient(to bottom, #bbdefb, #64b5f6)',
      },
      border: {
        light: '#e2e8f0',
        dark: '#1a202c',
      },
      text: {
        light: '#1a1a1a',
        dark: '#f7faff',
      },
      borderWidth: {
        DEFAULT: '1px',
        thin: '0.5px',
        thick: '2px',
        extrathick: '4px',
      },
      borderRadius: {
        card: '10px',
        header: '30px',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
      boxShadow: {
        base: '0 1px 3px rgba(0, 0, 0, 0.1)',
        hover: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        focus: '0 0 0 4px rgba(60, 60, 220, 0.4)',
      },
      scale: {
        98: '0.98',
        102: '1.02',
      },
      slideInUp: {
        '0%': { opacity: 0, transform: 'translateY(20px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
      wiggle: {
        '0%, 100%': { transform: 'rotate(-3deg)' },
        '50%': { transform: 'rotate(3deg)' },
      },
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      slideIn: {
        from: { transform: 'translateX(-100%)' },
        to: { transform: 'translateX(0)' },
      },
      keyframes: {
        'fade-in-out': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '10%': { opacity: '1', transform: 'translateY(0)' },
          '90%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(-20px)' },
        },
      },
      animation: {
        'fade-in-out': 'fade-in-out 5s ease-in-out',
        slideInUp: 'slideInUp 0.5s ease-out',
        wiggle: 'wiggle 1s ease-in-out infinite',
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideIn: 'slideIn 0.3s ease-out',
      },
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
      },
    },
  },
  plugins: [
    forms,
    rtl,
    plugin(({ addBase }) => {
      addBase({
        '@font-face': {
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '400',
          fontDisplay: 'swap',
          src: `url('./assets/fonts/Inter/Inter-Regular.ttf') format('truetype')`,
        },
      });
    }),
    typography,
    aspectRatio,
    cssVariablesPlugin,
  ],
};