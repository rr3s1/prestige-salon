/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f5f3f0',
        primary: '#c9a96e',
        'primary-hover': '#b8956a',
        secondary: '#6b7280',
        dark: '#0d0d0d',
        'gray-900': '#111111',
        'gray-800': '#1a1a1a',
        'gray-700': '#2d2d2d',
        amber: {
          600: '#c9a96e',
          700: '#b8956a',
        }
      },
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
      },
      spacing: {
        'section': '5rem',
        'container': '1.5rem',
      },
      borderRadius: {
        'container': '0.75rem',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-left': 'fadeInLeft 0.8s ease-out',
        'fade-in-right': 'fadeInRight 0.8s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'gradient-shift': 'gradient-shift 8s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        fadeInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          }
        },
        'gradient-shift': {
          '0%, 100%': {
            transform: 'rotate(0deg) scale(1)',
            opacity: '0.8'
          },
          '33%': {
            transform: 'rotate(120deg) scale(1.1)',
            opacity: '0.6'
          },
          '66%': {
            transform: 'rotate(240deg) scale(0.9)',
            opacity: '0.7'
          }
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'luxury': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        'glow': '0 0 20px rgba(201, 169, 110, 0.3)',
      },
    },
  },
  plugins: [],
}
