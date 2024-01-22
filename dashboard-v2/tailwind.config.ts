import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  safelist: [
    'w-64',
    'w-1/2',
    'rounded-l-lg',
    'rounded-r-lg',
    'bg-gray-200',
    'grid-cols-4',
    'grid-cols-7',
    'h-6',
    'leading-6',
    'h-9',
    'leading-9',
    'shadow-lg',
    'bg-opacity-50',
    'dark:bg-opacity-80',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#eff6ff',
          '100': '#dbeafe',
          '200': '#bfdbfe',
          '300': '#93c5fd',
          '400': '#60a5fa',
          '500': '#3b82f6',
          '600': '#2563eb',
          '700': '#1d4ed8',
          '800': '#1e40af',
          '900': '#1e3a8a',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
        body: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      transitionProperty: {
        width: 'width',
      },
      textDecoration: ['active'],
      minWidth: {
        kanban: '28rem',
      },
      keyframes: {
        userMenuOpen: {
          '0%': {
            transform: 'translateY(-50px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacitty: '1',
          },
        },
        userMenuClose: {
          '0%': {
            transform: 'translateY(0)',
            opacitty: '1',
          },
          '100%': {
            transform: 'translateY(-50px)',
            opacity: '0',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        fadeOut: {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
        sidebarOpen: {
          '0%': {
            opacity: '0',
            left: '-100%',
          },
          '100%': {
            opacity: '1',
            left: '0',
          },
        },
        sidebarClose: {
          '0%': {
            opacity: '1',
            left: '0',
          },
          '100%': {
            opacity: '0',
            left: '-100%',
          },
        },
        popupOpen: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-100%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        popupClose: {
          '0%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(100%)',
          },
        },
        drawerOpen: {
          '0%': {
            opacity: '0',
            right: '-100%',
          },
          '100%': {
            opacity: '1',
            right: '0px',
          },
        },
        drawerClose: {
          '0%': {
            opacity: '1',
            right: '0px',
          },
          '100%': {
            opacity: '0',
            right: '-100%',
          },
        },
        collapseOpen: {
          '0%': { 'grid-template-rows': '0fr' },
          '100%': { 'grid-template-rows': '1fr' },
        },
        collapseClose: {
          '0%': { 'grid-template-rows': '1fr' },
          '100%': { 'grid-template-rows': '0fr' },
        },
      },
      animation: {
        userMenuOpen: 'userMenuOpen .3s ease forwards',
        userMenuClose: 'userMenuClose .3s ease forwards',
        fadeIn: 'fadeIn .3s ease forwards',
        fadeOut: 'fadeOut .3s ease forwards',
        sidebarOpen: 'sidebarOpen .3s ease forwards',
        sidebarClose: 'sidebarClose .3s ease forwards',
        popupOpen: 'popupOpen .3s ease forwards',
        popupClose: 'popupClose .3s ease forwards',
        drawerOpen: 'drawerOpen .3s ease forwards',
        drawerClose: 'drawerClose .3s ease forwards',
        collapseOpen: 'collapseOpen .2s ease forwards',
        collapseClose: 'collapseClose .2s ease forwards',
      },
    },
  },
  plugins: [],
};
export default config;
