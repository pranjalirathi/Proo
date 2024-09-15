/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
// import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        color: {
          1: "#AC6AFF",
          2: "#FFC876",
          3: "#FF776F",
          4: "#7ADB78",
          5: "#858DFF",
          6: "#FF98E2",
        },
        stroke: {
          1: "#26242C",
        },
        n: {
          1: "#FFFFFF",
          2: "#CAC6DD",
          3: "#ADA8C3",
          4: "#757185",
          5: "#3F3A52",
          6: "#252134",
          7: "#15131D",
          8: "#0E0C15",
          9: "#474060",
          10: "#43435C",
          11: "#1B1B2E",
          12: "#2E2A41",
          13: "#6C7275",
        },
      },
      fontFamily: {
        sans: ["var(--font-sora)", ...fontFamily.sans],
        code: "var(--font-code)",
        grotesk: "var(--font-grotesk)",
      },
      letterSpacing: {
        tagline: ".15em",
      },
      spacing: {
        0.25: "0.0625rem",
        7.5: "1.875rem",
        15: "3.75rem",
      },
      opacity: {
        15: ".15",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      transitionTimingFunction: {
        DEFAULT: "linear",
      },
      borderWidth: {
        DEFAULT: "0.0625rem",
      },
      blur: {
        lg: "30px",
      },
      screens: {
        'xs': '767px', 
      },
      zIndex: {
        '50': '50',
        '0': '0',
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5"
      },
      transitionProperty: {
        'width-zindex': 'width, z-index',
      },
      backgroundImage: {
        'gradient-blur-circle-3': 'radial-gradient(circle, rgba(255, 0, 150, 0.5), transparent 60%)',
        'gradient-blur-circle-2': 'radial-gradient(circle, rgba(0, 150, 255, 0.5), transparent 60%)',
        'gradient-blur-circle-1': 'radial-gradient(circle, rgba(150, 0, 255, 0.5), transparent 60%)',
        'border-gradient': 'linear-gradient(to right, #3b82f6, #8b5cf6, #5b21b6, #e0e7ff)',
        "radial-gradient": "radial-gradient(var(--tw-gradient-stops))",
        "conic-gradient":
        "conic-gradient(from 225deg, #FFC876, #79FFF7, #9F53FF, #FF98E2, #FFC876)"
      },
      boxShadow: {
        'orange-md': '0 4px 6px -1px rgba(249, 115, 22, 0.5), 0 2px 4px -2px rgba(249, 115, 22, 0.5)',
        'orange-lg': '0 10px 15px -3px rgba(249, 115, 22, 0.5), 0 4px 6px -4px rgba(249, 115, 22, 0.5)',
        'gradient-pink-purple-blue': '0 4px 6px -1px rgba(255, 99, 132, 0.4), 0 2px 4px -1px rgba(54, 162, 235, 0.4), 0 10px 20px -2px rgba(153, 102, 255, 0.5)'
      },
      colors: {
        customBackground1: 'rgb(28, 30, 36)',
        customBackground2: 'rgb(50, 55, 66)',
        logoColour1: 'rgb(3, 130, 225)',
        logoColour2: 'rgb(62, 165, 218)',
        logoColour3: 'rgb(4, 139, 230)',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};
