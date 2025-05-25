import type { Config } from "tailwindcss";
import colors from 'tailwindcss/colors'

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'primary': '#11758A',
      'secondary': '#edd70c',
      'secondary-dark': '#ecb737',
      'third': '#f2f4fb',
      'text': '#141324',
      'sub': '#737195',

      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'description': '#697E95',
      transparent: 'transparent',
      current: 'currentColor',
      red: colors.red,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
    },
    screens: {
      'xs': '475px',

      'sm': '576px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '992px',
      // => @media (min-width: 992px) { ... }

      'xl': '1200px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1400px',
      // '3xl': '1600px',

    },
    fontFamily: {

      IBM: ['IBM Plex Sans', 'sans-serif'],
      switzer: ['Switzer', 'sans-serif'],
      din: ['Din', 'sans-serif'],


    },
    minHeight: {
      '3/4': '75%',
    },
    maxWidth: {
      '3/4': '75%',
    },
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        // sm: '1rem',
        // lg: '1rem',
        // xl: '1rem',
        // '2xl': '4rem',
      },
      screens: {
        xs: "100%",

        // => @media (min-width: 768px) { ... }

        lg: "992px",
        // => @media (min-width: 992px) { ... }

        xl: "1200px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1400px",
        // '3xl': '1600px',
      },
    },
  },
  plugins: [],
} satisfies Config;
