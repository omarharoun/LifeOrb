/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        'display': ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        'body': ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fef7f0',
          100: '#fdeee0',
          200: '#fbd5b8',
          300: '#f9bc8f',
          400: '#f7a366',
          500: '#f58a3d',
          600: '#e67e22',
          700: '#d35400',
          800: '#a04000',
          900: '#6d2b00',
        },
        orb: {
          50: '#fef6f7',
          100: '#fdedef',
          200: '#fad2d7',
          300: '#f7b6bf',
          400: '#f49aa7',
          500: '#f17e8f',
          600: '#ee5a6f',
          700: '#e6344f',
          800: '#c82641',
          900: '#9e1d33',
        },
        sage: {
          50: '#f6f9f6',
          100: '#edf3ed',
          200: '#d1e7d1',
          300: '#b5dab5',
          400: '#99ce99',
          500: '#7dc27d',
          600: '#61b661',
          700: '#4a8f4a',
          800: '#396639',
          900: '#283d28',
        },
        warm: {
          50: '#fffcf9',
          100: '#fef9f3',
          200: '#fdf0e1',
          300: '#fce7cf',
          400: '#fbdebd',
          500: '#fad5ab',
          600: '#f9cc99',
          700: '#f8c387',
          800: '#f7ba75',
          900: '#f6b163',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'glow': 'glow 4s ease-in-out infinite',
        'breathe': 'breathe 5s ease-in-out infinite',
        'drift': 'drift 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 30px rgba(245, 138, 61, 0.3), 0 0 60px rgba(241, 126, 143, 0.2)' 
          },
          '50%': { 
            boxShadow: '0 0 50px rgba(245, 138, 61, 0.5), 0 0 100px rgba(241, 126, 143, 0.4)' 
          },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateX(0px) translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateX(10px) translateY(-5px) rotate(1deg)' },
          '50%': { transform: 'translateX(-5px) translateY(-10px) rotate(-1deg)' },
          '75%': { transform: 'translateX(-10px) translateY(5px) rotate(1deg)' },
        }
      },
    },
  },
  plugins: [],
}
