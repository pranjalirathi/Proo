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
      zIndex: {
        '50': '50',
        '0': '0',
      },
      transitionProperty: {
        'width-zindex': 'width, z-index',
      },
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
        customBackground1: 'rgb(28, 30, 36)',
        customBackground2: 'rgb(50, 55, 66)',
        logoColour1: 'rgb(3, 130, 225)',
        logoColour2: 'rgb(62, 165, 218)',
        logoColour3: 'rgb(4, 139, 230)'
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};
