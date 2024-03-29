/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    colors: {
      primary: "#121829",
      secondary: "#767E94",
      white: "#ebeef5",
    },
  },
  plugins: [require("flowbite/plugin")],
};
