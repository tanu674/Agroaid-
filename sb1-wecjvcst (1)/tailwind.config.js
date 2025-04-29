/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f1',
          100: '#dcf1de',
          200: '#bae3bf',
          300: '#8ece96',
          400: '#5cb268',
          500: '#3c9447',
          600: '#2d7737',
          700: '#265e2e',
          800: '#214b27',
          900: '#1d3f23',
          950: '#0e2212',
        },
        secondary: {
          50: '#f5f8e8',
          100: '#ebf0d0',
          200: '#d9e3a6',
          300: '#c3d073',
          400: '#adb94a',
          500: '#8d9a36',
          600: '#6e7a2a',
          700: '#525b23',
          800: '#464b21',
          900: '#353a1d',
          950: '#1c200e',
        },
        accent: {
          50: '#f0f8ff',
          100: '#e0f1fe',
          200: '#bae2fd',
          300: '#7dcefb',
          400: '#38b5f7',
          500: '#0e9bed',
          600: '#027cca',
          700: '#0363a4',
          800: '#075487',
          900: '#0a476f',
          950: '#082c47',
        },
        success: {
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          500: '#ef4444',
          600: '#dc2626',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};