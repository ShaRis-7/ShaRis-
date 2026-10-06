import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F2',
        brown: { DEFAULT: '#3C2A21', dark: '#2C1C13', light: '#5C4033' },
        accent: { DEFAULT: '#E2D2BF', dark: '#C9B89E', light: '#F0E8DB' },
      },
      fontFamily: {
        serif: ['"Noto Serif TC"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'slide-up': { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
      },
      boxShadow: {
        soft: '0 2px 16px rgba(60,42,33,0.06)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
