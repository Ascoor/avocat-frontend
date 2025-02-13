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
 
        'avocat-dot-1': '#1a1d91', // أزرق داكن جدًا
        'avocat-dot-2': '#1c239a', // أزرق داكن
        'avocat-dot-3': '#1e29a3', // أزرق
        'avocat-dot-4': '#202fac', // أزرق فاتح
        'avocat-dot-5': '#2235b5', // أزرق مشرق
        'avocat-dot-6': '#b52335', // أحمر داكن
        'avocat-dot-7': '#bf2d40', // أحمر
        'avocat-dot-8': '#c8374a', // أحمر مشرق
        'avocat-dot-9': '#d14155', // أحمر فاتح
        'avocat-dot-10': '#db4b60', // أحمر نابض بالحياة
        'avocat-dot-11': '#e5566b', // أحمر فاتح جدًا
        'avocat-dot-12': '#f06076', // أحمر لامع
        'avocat-dot-13': '#271977', // أزرق أحمر
        'avocat-dot-14': '#070a69', // أزرق داكن جدًا (ليلي)
        'avocat-dot-1': '#c8374a', // أزرق داكن جدًا (ليلي)
      
        
        'avocat-dark-dot-1': '#FF1744', // أحمر فاقع
        'avocat-dark-dot-2': '#FF6B81', // أحمر فاتح لامع
        'avocat-dark-dot-3': '#FF4569', // أحمر زهري زاهي
        'avocat-dark-dot-4': '#FF8C94', // وردي مائل للأحمر
        'avocat-dark-dot-5': '#FFADB5', // وردي فاتح جدًا
        // البرتقالي اللامع
        'avocat-dark-dot-6': '#FF6D00', // برتقالي مشرق جدًا
        'avocat-dark-dot-7': '#FFA726', // برتقالي لامع
        'avocat-dark-dot-8': '#FFB74D', // برتقالي زهري فاتح
        'avocat-dark-dot-9': '#FFD180', // برتقالي خوخي فاتح
        'avocat-dark-dot-10': '#FFE5B4', // برتقالي باهت

        'avocat-dark-dot-11': '#FF1744', // أحمر فاقع
        'avocat-dark-dot-12': '#FF6B81', // أحمر فاتح لامع
        'avocat-dark-dot-13': '#FF4569', // أحمر زهري زاهي
        'avocat-dark-dot-14': '#FF8C94', // وردي مائل للأحمر
        'avocat-dark-dot-5': '#FFADB5', // وردي فاتح جدًا
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
    plugin(function ({ addBase }) {
      addBase({
        '@font-face': [
          // Cairo Font - Arabic Unicode Range
          {
            fontFamily: 'Cairo',
            fontStyle: 'normal',
            fontWeight: '400',
            fontDisplay: 'swap',
            src: `url(https://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hOA-a1biLD-H.woff2) format('woff2')`,
            unicodeRange:
              'U+0600-06FF, U+0750-077F, U+0870-088E, U+0890-0891, U+0897-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC, U+102E0-102FB, U+10E60-10E7E, U+10EC2-10EC4, U+10EFC-10EFF, U+1EE00-1EE03, U+1EE05-1EE1F, U+1EE21-1EE22, U+1EE24, U+1EE27, U+1EE29-1EE32, U+1EE34-1EE37, U+1EE39, U+1EE3B, U+1EE42, U+1EE47, U+1EE49, U+1EE4B, U+1EE4D-1EE4F, U+1EE51-1EE52, U+1EE54, U+1EE57, U+1EE59, U+1EE5B, U+1EE5D, U+1EE5F, U+1EE61-1EE62, U+1EE64, U+1EE67-1EE6A, U+1EE6C-1EE72, U+1EE74-1EE77, U+1EE79-1EE7C, U+1EE7E, U+1EE80-1EE89, U+1EE8B-1EE9B, U+1EEA1-1EEA3, U+1EEA5-1EEA9, U+1EEAB-1EEBB, U+1EEF0-1EEF1',
          },
          // Cairo Font - Extended Unicode Range
          {
            fontFamily: 'Cairo',
            fontStyle: 'normal',
            fontWeight: '400',
            fontDisplay: 'swap',
            src: `url(https://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hOA-a13iLD-H.woff2) format('woff2')`,
            unicodeRange:
              'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF',
          },
          // Cairo Font - Basic Latin Unicode Range
          {
            fontFamily: 'Cairo',
            fontStyle: 'normal',
            fontWeight: '400',
            fontDisplay: 'swap',
            src: `url(https://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hOA-a1PiLA.woff2) format('woff2')`,
            unicodeRange:
              'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
          },
          // Tharwat Font
          {
            fontFamily: 'Tharwat',
            fontStyle: 'normal',
            fontWeight: '400',
            src: `url('./assets/fonts/TharwatOmaraa.ttf') format('truetype')`,
          },
          // Amiri Fonts
          {
            fontFamily: 'Amiri',
            fontStyle: 'normal',
            fontWeight: '400',
            src: `url('./assets/fonts/Amiri/Amiri-Regular.ttf') format('truetype')`,
          },
          {
            fontFamily: 'Amiri',
            fontStyle: 'normal',
            fontWeight: '700',
            src: `url('./assets/fonts/Amiri/Amiri-Bold.ttf') format('truetype')`,
          },
          {
            fontFamily: 'Amiri',
            fontStyle: 'italic',
            fontWeight: '400',
            src: `url('./assets/fonts/Amiri/Amiri-Italic.ttf') format('truetype')`,
          },
          {
            fontFamily: 'Amiri',
            fontStyle: 'italic',
            fontWeight: '700',
            src: `url('./assets/fonts/Amiri/Amiri-BoldItalic.ttf') format('truetype')`,
          },
          {
            fontFamily: 'Tajawal',
            fontStyle: 'normal',
            fontWeight: '400',
            src: `url('./assets/fonts/Tajawal/Tajawal-Regular.ttf') format('truetype')`,
          },
          {
            fontFamily: 'Tajawal',
            fontStyle: 'normal',
            fontWeight: '700',
            src: `url('./assets/fonts/Tajawal/Tajawal-Bold.ttf') format('truetype')`,
          },
          {
            fontFamily: 'Tajawal',
            fontStyle: 'normal',
            fontWeight: '300',
            src: `url('./assets/fonts/Tajawal/Tajawal-Light.ttf') format('truetype')`,
          },
          {
            fontFamily: 'Tajawal',
            fontStyle: 'normal',
            fontWeight: '500',
            src: `url('./assets/fonts/Tajawal/Tajawal-Medium.ttf') format('truetype')`,
          },
          {
            fontFamily: 'Tajawal',
            fontStyle: 'normal',
            fontWeight: '800',
            src: `url('./assets/fonts/Tajawal/Tajawal-ExtraBold.ttf') format('truetype')`,
          },
          {
            fontFamily: 'Tajawal',
            fontStyle: 'normal',
            fontWeight: '200',
            src: `url('./assets/fonts/Tajawal/Tajawal-ExtraLight.ttf') format('truetype')`,
          },
          {
            fontFamily: 'Tajawal',
            fontStyle: 'normal',
            fontWeight: '900',
            src: `url('./assets/fonts/Tajawal/Tajawal-Black.ttf') format('truetype')`,
          },
        ],
      });
    }),
    typography,
    aspectRatio,
    cssVariablesPlugin,
  ],
}; 