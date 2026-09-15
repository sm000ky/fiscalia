/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive'],
        'retro': ['VT323', 'monospace']
      },
      colors: {
        neon: {
          purple: '#B24BF3',
          cyan: '#4BFFF3',
          yellow: '#F3FF4B',
          pink: '#FF4BF3'
        }
      },
      boxShadow: {
        'pixel': '4px 4px 0px 0px rgba(0,0,0,0.8)',
        'pixel-sm': '2px 2px 0px 0px rgba(0,0,0,0.8)',
        'neon': '0 0 10px currentColor, 0 0 20px currentColor'
      }
    },
  },
  plugins: [],
}
