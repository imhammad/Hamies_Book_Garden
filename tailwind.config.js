/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px #f472b6, 0 0 10px #f472b6' },
          '50%': { boxShadow: '0 0 20px #f472b6, 0 0 40px #f472b6' },
        }
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite',
      }
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}