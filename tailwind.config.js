import plugin from 'tailwindcss/plugin';
import forms from '@tailwindcss/forms';
import cssVariablesPlugin from 'postcss-css-variables';
import rtl from 'tailwindcss-rtl';
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';
import lineClamp from '@tailwindcss/line-clamp';

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
      /*** 🎨 ألوان الهوية ***/
      colors: {
        // ألوان الأيقونات
        'icon-color': {
          fb: '#355cff',
          link: '#2561c2',
          insta: '#ff1c8d',
          twitter: '#3297f0',
          tube: '#ff1a30',
        },

        // درجات الأزرق لمكتب المحاماة
        'avocat-blue': {
          light: '#396dcc',
          DEFAULT: '#0c3066',
          dark: '#1b2b5a',
          darker: '#031023',
        },

        // درجات البرتقالي
        'avocat-orange': {
          DEFAULT: '#fb9221',
          dark: '#fb7921',
          light: '#ffa726',
        },

        // درجات التركواز
        'avocat-terq': {
          DEFAULT: '#3BAEA6',
          light: '#A3DDCF',
          dark: '#1A736A',
        },

        // ألوان الخلفية
        lightBg: '#F3F4F6',   // خلفية فاتحة
        darkBg: '#1F2937',    // خلفية داكنة
      },

      /*** 🌄 التدرجات اللونية ***/
      backgroundImage: {
        'gradient-day': 'linear-gradient(135deg, #396dcc, #0c3066)', // تدرج نهاري
        'gradient-night': 'linear-gradient(135deg, #031023, #1b2b5a)', // تدرج ليلي
      },
        border: {
          light: '#e2e8f0', // لون الحدود في الوضع المضئ
          dark: '#1a202c',  // لون الحدود في الوضع الداكن
        },
        text: {
          light: '#1a1a1a',
          dark: '#f7faff',
        },
      
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
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
      keyframes: {
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
      },
      animation: {
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
    cssVariablesPlugin(),
    forms,
    rtl,
    typography,
    aspectRatio,
    lineClamp,
    plugin(({ addVariant, e }) => {
      addVariant('sidebar-expanded', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => `.sidebar-expanded .${e(`sidebar-expanded${separator}${className}`)}`);
      });
    }),
  ],
};
