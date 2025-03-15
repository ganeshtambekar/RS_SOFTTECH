/** @type {import('tailwindcss').Config} */
module.exports = {

  theme: {
    extend: {
      animation: {
        'fade-out': 'fadeOut 1s ease-in-out forwards',
        'pulse': 'pulse 1.5s infinite',
      },
      keyframes: {
        fadeOut: {
          '0%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        }
      }
    },
  },

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

