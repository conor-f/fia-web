/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      "sans": ["Poppins",],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
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
}
