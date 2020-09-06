const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  // purge: [],
  theme: {
    fontFamily: {
      display: ["Sora", "sans-serif"],
      body: ["Oxygen", "sans-serif"],
    },
    extend: {
      colors: {
        hpgreen: {
          100: "#42de9f",
        },
        hpblue: {
          100: "#42D1E4",
          800: "#1e2b37",
          900: "#0c151d",
        },
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
