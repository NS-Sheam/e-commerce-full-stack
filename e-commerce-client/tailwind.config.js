/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1b6392",
        orange: "fa8232",
        warning: "#ebc80c",
        gray: "#5f6c72",
      },
    },
  },
  plugins: [],
};