/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", 
    "./pages/**/*.{js,ts,jsx,tsx}", 
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0d3b66",
        secondary: "#faf0ca",
        surface: "#f5f5f5",
        border: "#d1d5db",
        text: "#1f2937",
        muted: "#6b7280",
      },
    },
  },
  plugins: [],
};