// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-blur-circle-3': 'radial-gradient(circle, rgba(255, 0, 150, 0.5), transparent 60%)',
        'gradient-blur-circle-2': 'radial-gradient(circle, rgba(0, 150, 255, 0.5), transparent 60%)',
        'gradient-blur-circle-1': 'radial-gradient(circle, rgba(150, 0, 255, 0.5), transparent 60%)',
      },
      boxShadow: {
        'orange-md': '0 4px 6px -1px rgba(249, 115, 22, 0.5), 0 2px 4px -2px rgba(249, 115, 22, 0.5)',
        'orange-lg': '0 10px 15px -3px rgba(249, 115, 22, 0.5), 0 4px 6px -4px rgba(249, 115, 22, 0.5)',
      },
      colors: {
        customBackground1: 'rgb(20, 22, 26)',
        customBackground2: 'rgb(41, 45, 54)',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};
