/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontSize: {
        sm: '0.750rem',
        base: '1rem',
        xl: '1.333rem',
        '2xl': '1.777rem',
        '3xl': '2.369rem',
        '4xl': '3.158rem',
        '5xl': '4.210rem',
      },
      fontFamily: {
        sans: ["Poppins",],
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      },
      colors: {
        'text': {
          50: '#fef7e7',
          100: '#fcefcf',
          200: '#fae09e',
          300: '#f7d06e',
          400: '#f5c13d',
          500: '#f2b10d',
          600: '#c28e0a',
          700: '#916a08',
          800: '#614705',
          900: '#302303',
          950: '#181201',
        },
        'background': {
          50: '#fff9e5',
          100: '#fff2cc',
          200: '#ffe699',
          300: '#ffd966',
          400: '#ffcc33',
          500: '#ffbf00',
          600: '#cc9900',
          700: '#997300',
          800: '#664d00',
          900: '#332600',
          950: '#1a1300',
        },
        'primary': {
          50: '#fbecea',
          100: '#f6d9d5',
          200: '#eeb3aa',
          300: '#e58d80',
          400: '#dc6856',
          500: '#d4422b',
          600: '#a93523',
          700: '#7f271a',
          800: '#551a11',
          900: '#2a0d09',
          950: '#150704',
        },
        'secondary': {
          50: '#f8f5ec',
          100: '#f2ebd9',
          200: '#e5d7b3',
          300: '#d8c38d',
          400: '#cbaf67',
          500: '#be9b41',
          600: '#987c34',
          700: '#725d27',
          800: '#4c3e1a',
          900: '#261f0d',
          950: '#130f07',
        },
        'accent': {
          50: '#fbece9',
          100: '#f8d8d3',
          200: '#f1b1a7',
          300: '#ea8a7b',
          400: '#e26350',
          500: '#db3c24',
          600: '#af301d',
          700: '#842415',
          800: '#58180e',
          900: '#2c0c07',
          950: '#160604',
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  daisyui: {}
  /*
  // https://daisyui.com/docs/config/
  daisyui: {
    themes: [
      "cupcake",
      "light",
      "pastel",
      {
        // TODO: This is just from the docs: https://daisyui.com/docs/colors/
        fia: {
          "primary": "#a991f7",
          "secondary": "#f6d860",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",

          "--animation-input": "0.2s", // For example with CSS variables.
        },
      },
    ],
    logs: false
  }
  */
}
