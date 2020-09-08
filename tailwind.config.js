const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  // purge: [],
  // important: true,
  theme: {
    fontFamily: {
      display: ["Sora", "sans-serif"],
      body: ["Oxygen", "sans-serif"],
    },
    extend: {
      animation: {
        up: "0.3s ease-in",
      },
      borderRadius: {
        xl: "1rem",
      },
      fontSize: {
        "25xl": "14rem",
      },
      colors: {
        hpgreen: {
          100: "#42de9f",
        },
        hpblue: {
          100: "#42D1E4",
          200: "#42de9f",
          600: "#334a60",
          700: "#2b3a47",
          800: "#1e2b37",
          900: "#0c151d",
          1000: "#070e15",
        },
      },
    },
  },
  variants: {
    // backgroundColor: ["responsive", "hover", "focus", "active"],
    // outline: ["responsive", "hover", "focus", "active"],
    animation: ["responsive", "hover"],
  },
  // plugins: [require("@tailwindcss/typography")],
};
