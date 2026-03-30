/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#0a0a0a',
        navy: {
          DEFAULT: '#0b1e3d',
          light: '#112952',
          dark: '#060f1e',
        },
        brass: {
          DEFAULT: '#c9a66b',
          light: '#e0c28a',
          dark: '#a07840',
          shine: '#f0d898',
        },
        teal: {
          nautical: '#0a5c5c',
          light: '#0d7474',
        },
        wood: '#4a2e1a',
        rope: '#8b6914',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E\")",
        'brass-gradient': 'linear-gradient(135deg, #c9a66b 0%, #f0d898 50%, #a07840 100%)',
        'navy-gradient': 'linear-gradient(180deg, #0a0a0a 0%, #0b1e3d 50%, #0a0a0a 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'wave': 'wave 8s ease-in-out infinite',
        'rope-sway': 'ropeSway 4s ease-in-out infinite',
        'compass-spin': 'compassSpin 15s linear infinite',
        'pulse-brass': 'pulseBrass 2s ease-in-out infinite',
        'drift': 'drift 12s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleX(1) translateY(0)' },
          '50%': { transform: 'scaleX(1.05) translateY(-5px)' },
        },
        ropeSway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        compassSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseBrass: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(201,166,107,0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(201,166,107,0.7)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '33%': { transform: 'translateX(10px) translateY(-5px)' },
          '66%': { transform: 'translateX(-5px) translateY(8px)' },
        },
      },
      boxShadow: {
        'brass': '0 0 20px rgba(201,166,107,0.4), inset 0 1px 0 rgba(240,216,152,0.3)',
        'brass-lg': '0 0 40px rgba(201,166,107,0.5), 0 0 80px rgba(201,166,107,0.2)',
        'navy': '0 20px 60px rgba(11,30,61,0.8)',
        'inner-brass': 'inset 0 2px 4px rgba(201,166,107,0.2)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
