
const withMT = require("@material-tailwind/react/utils/withMT");


module.exports = withMT({
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add custom colors here if needed
      },
    },
  },
  plugins: [],
});
