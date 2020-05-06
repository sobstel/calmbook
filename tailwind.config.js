/* eslint-disable */
module.exports = {
  purge: [
    './components/**/*.tsx',
    './pages/**/*.tsx',
  ],
  theme: {
    extend: {
      borderRadius: {
        '16': '32px',
      },
      transitionDelay: {
        "0": "0ms",
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "900": "900ms",
      },
    },
    fontFamily: {
      layout:
        "Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Avenir,PingFang SC,Helvetica Neue,Helvetica",
    },
    spinner: (theme) => ({
      default: {
        color: "#666",
        size: "1em",
        border: "2px",
        speed: "500ms",
      },
    }),
  },
  variants: {
    spinner: ['responsive'],
  },
  plugins: [require("tailwindcss-spinner")()],
};
