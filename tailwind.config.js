/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#dc2626",
          light: "#fca5a5",
          dark: "#b91c1c",
        },
      },
    },
  },
  plugins: [],
}